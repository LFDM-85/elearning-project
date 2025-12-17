import { Delete } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { memo } from 'react';

type Props = {
  id: string;
  name: string;
  key: string;
  icontoggle: boolean;
  deleteShow: boolean;
};

const useStyles = makeStyles({
  item: {
    height: '50px',
    alignItems: 'center',
    backgroundColor: '#e8c792',
    border: '1px solid #000',
    borderRadius: '5px',
    margin: '5px 5px',
    padding: '5px',
  },
});
const StudentItem = memo(({ name, id, deleteShow }: Props) => {
  const classesStyles = useStyles();

  return (
    <ListItem className={classesStyles.item}>
      <ListItemText key={id}>{name}</ListItemText>
      {deleteShow && <Delete />}
    </ListItem>
  );
});

StudentItem.displayName = 'StudentItem';
export default StudentItem;
