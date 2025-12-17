import { Box, TextField } from '@mui/material';
import BasicModal from '../common/BasicModal/BasicModal';
import { useForm } from 'react-hook-form';
import axios from '../../../interceptors/axios';

interface IProps {
  open: boolean;
  onClose: () => void;

  courseId: string | undefined;
}

const NewLectureModal = ({ open, onClose, courseId }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { summary: '', description: '' },
  });

  const modalStyles = {
    inputFields: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
      marginBottom: '15px',
      '.MuiInput-root': {
        marginBottom: '20px',
      },
    },
  };
  const addLecture = (inputs: { summary: string; description: string }) => {
    axios
      .post('lectures/create', { ...inputs, finished: false })
      .then((res) => {
        console.log(res.data._id);
        // setData(res.data._id);
        if (res.status === 201) {
          console.log('Lecture was created');
          axios
            .patch(`/course/${res.data._id}/add-lecture/${courseId}`)
            .then((res) => {
              if (res.status === 201)
                console.log('Lecture added to the course');
            })
            .catch(function (error) {
              alert('Lecture already added!');
              console.log(error.message);
              return;
            });
          return;
        }
      })
      .catch(function (error) {
        alert('Lectures already exists!');
        console.log(error.message);
        return;
      });
  };

  const submitHandler = async ({
    summary,
    description,
  }: {
    summary: string;
    description: string;
  }) => {
    const inputs = {
      summary,
      description,
    };

    addLecture(inputs);
  };

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="summary"
        label="Summary"
        {...register('summary', {
          required: 'Summary is required!',
          minLength: {
            value: 3,
            message: 'Invalid summary, must have between 3 to 25 characters',
          },
          maxLength: {
            value: 55,
            message: 'Invalid summary, must have less then 55 characters',
          },
        })}
        autoComplete="summary"
        autoFocus
        error={!!errors?.summary}
        helperText={errors?.summary ? errors.summary.message : null}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        {...register('description', {
          required: 'Description is required!',
          minLength: {
            value: 3,
            message:
              'Invalid description, must have between 3 to 25 characters',
          },
          maxLength: {
            value: 55,
            message: 'Invalid description, must have less then 55 characters',
          },
        })}
        autoComplete="description"
        autoFocus
        error={!!errors?.description}
        helperText={errors?.description ? errors.description.message : null}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="New Lecture"
      subTitle="Add new lecture"
      content={getContent()}
      onSubmit={handleSubmit(submitHandler)}
    ></BasicModal>
  );
};

export default NewLectureModal;
