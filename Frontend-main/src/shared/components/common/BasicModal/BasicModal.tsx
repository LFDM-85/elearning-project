import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { modalStyles } from './styles';
import { Button } from '@mui/material';

const BasicModal = ({
  open,
  onClose,
  title,
  subTitle,
  content,
  onSubmit,
}: any) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyles.wrapper}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{subTitle}</Typography>
        {content}
        <Box sx={modalStyles.buttons}>
          <Button style={{ margin: 10 }} variant="contained" onClick={onSubmit}>
            Submit
          </Button>
          <Button
            style={{ margin: 10 }}
            variant="outlined"
            color="error"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BasicModal;
