import { Box, TextField } from '@mui/material';
import BasicModal from '../common/BasicModal/BasicModal';
import { useForm } from 'react-hook-form';
import axios from '../../../interceptors/axios';
import useGetAllUsersData from '../../hooks/useGetAllUsersData';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const NewCourseModal = ({ open, onClose }: IProps) => {
  const { data } = useGetAllUsersData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { nameCourse: '', open: true },
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

  const submitHandler = async ({
    nameCourse,
    open,
  }: {
    nameCourse: string;
    open: boolean;
  }) => {
    const inputs = {
      nameCourse,
      open,
    };

    axios
      .post('course/create', { ...inputs, open: true })
      .then((res) => {
        if (res.status === 201) {
          alert('Course was created');
          return;
        }
      })
      .catch(function (error) {
        alert('Course already exists!');
        console.log(error.message);
        return;
      });
  };

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="nameCourse"
        label="Class Name"
        {...register('nameCourse', {
          required: 'Course Name is required!',
          minLength: {
            value: 3,
            message: 'Invalid name, must have between 3 to 25 characters',
          },
          maxLength: {
            value: 25,
            message: 'Invalid name, must have less then 25 characters',
          },
        })}
        autoComplete="nameCourse"
        autoFocus
        error={!!errors?.nameCourse}
        helperText={errors?.nameCourse ? errors.nameCourse.message : null}
        inputProps={{ maxLength: 25 }}
      />
    </Box>
  );
  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="New Course"
      subTitle="Add new course to school"
      content={getContent()}
      onSubmit={handleSubmit(submitHandler)}
    ></BasicModal>
  );
};
