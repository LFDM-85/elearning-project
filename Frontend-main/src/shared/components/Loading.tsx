import { Typography } from '@mui/material';
import { RingLoader } from 'react-spinners';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  divItem: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: '#0077b6',
  },
});
export const Loading = () => {
  const classesStyles = useStyles();
  return (
    <div className={classesStyles.divItem}>
      <RingLoader color="#0077b6" size={150} speedMultiplier={1} />
      <Typography ml={6} variant="h1" component="h1">
        Loading . . .
      </Typography>
    </div>
  );
};
