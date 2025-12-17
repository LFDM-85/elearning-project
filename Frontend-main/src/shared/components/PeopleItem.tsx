import { Add, Delete } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { memo } from 'react';
import { ICourse } from '../interfaces/interfaces';

const useStyles = makeStyles({
  item: {
    height: '35px',
    alignItems: 'center',
    backgroundColor: '#e8c792',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});

interface IProps {
  name: string;
  id: string;
  icontoggle: ICourse | undefined;
  role: string[];
  courseToggle: () => void;
}
const PeopleItem = memo(
  ({ name, id, icontoggle, role, courseToggle }: IProps) => {
    const classesStyles = useStyles();

    return (
      <ListItem className={classesStyles.item} onClick={courseToggle}>
        <ListItemText key={id}>
          {name} - {role}
        </ListItemText>
        {icontoggle && <Delete />}
        {!icontoggle && <Add />}
      </ListItem>
    );
  }
);

PeopleItem.displayName = 'PeopleItem';

export default PeopleItem;
