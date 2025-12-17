import CheckIcon from '@mui/icons-material/Check';
import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { memo } from 'react';
import { useCallback, useEffect, useState } from 'react';
import axios from '../../interceptors/axios';

type Props = {
  id: string;
  name: string;
  key: string;
  isValidated: boolean;
};

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#4BB7EA',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});
const ProfessorItem = memo(({ name, id, isValidated }: Props) => {
  const classesStyles = useStyles();
  const [validate, setValidate] = useState(isValidated);

  const setValidationHandler = useCallback(() => {
    setValidate((prevState) => !prevState);
  }, []);

  useEffect(() => {
    axios
      .patch(`/users/${id}`, { isValidated: validate })
      .catch((error) => console.log('Error', error));
  }, [setValidationHandler]);

  return (
    <ListItem className={classesStyles.item} onClick={setValidationHandler}>
      <ListItemText key={id}>{name}</ListItemText>
      {validate && <CheckIcon />}
    </ListItem>
  );
});

ProfessorItem.displayName = 'ProfessorItem';

export default ProfessorItem;
