import { Box, IconButton, InputAdornment, TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import BasicModal from '../common/BasicModal/BasicModal';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import axios from '../../../interceptors/axios';
import { IUser } from '../../interfaces/interfaces'; // Assuming IUser has 'roles'

interface IProps {
  open: boolean;
  onClose: () => void;
  onUserAdded: () => void; // Callback to refresh user list
  showSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
  handleSnackbarClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

const NewUserModal = ({ open, onClose, onUserAdded, showSnackbar, handleSnackbarClose }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset from useForm
  } = useForm({
    defaultValues: { name: '', email: '', password: '', role: 'student' }, // Add default role
  });

  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('student'); // State for selected role

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const handleRoleChange = (event: any) => { // Use 'any' for now, or proper type from MUI SelectChangeEvent
    setSelectedRole(event.target.value);
  };

  const submitHandler = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const inputs = {
      name,
      email,
      password,
      roles: [selectedRole], // Use selected role
      isValidated: true, // Default to validated for new users
    };

    console.log('Attempting to create user:', inputs);

    try {
      const res = await axios.post('auth/signup', inputs);
      if (res.status === 201) {
        showSnackbar(`${selectedRole} "${name}" was created successfully!`, 'success');
        onUserAdded(); // Trigger refresh
        onClose(); // Close modal
        reset(); // Reset form fields
        setSelectedRole('student'); // Reset role selection
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      const errMsg = error.response?.data?.message
        ? (Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message)
        : error.message || 'Failed to create user!';
      showSnackbar(errMsg, 'error');
    }
  };

  const getContent = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        {...register('name', {
          required: 'Name is required!',
          minLength: {
            value: 3,
            message: 'Invalid name, must have between 3 to 25 characters',
          },
          maxLength: {
            value: 25,
            message: 'Invalid name, must have less then 25 characters',
          },
        })}
        autoComplete="name"
        autoFocus
        error={!!errors?.name}
        helperText={errors?.name ? errors.name.message : null}
        inputProps={{ maxLength: 25 }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        {...register('email', {
          required: 'Email is required!',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        autoComplete="email"
        error={!!errors?.email}
        helperText={errors?.email ? errors.email.message : null}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        {...register('password', {
          required: 'Password is required!',
          minLength: {
            value: 8,
            message: 'Invalid password, must have between 8 to 25 characters',
          },
          maxLength: {
            value: 25,
            message: 'Invalid password, must have less then 25 characters',
          },
        })}
        label="Password"
        type={showPassword ? 'text' : 'password'}
        id="password"
        autoComplete="new-password"
        error={!!errors?.password}
        helperText={errors?.password ? errors.password.message : null}
        inputProps={{ maxLength: 25 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={showPasswordHandler}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectedRole}
          label="Role"
          onChange={handleRoleChange}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="professor">Professor</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <>
      <BasicModal
        open={open}
        onClose={onClose}
        title="Create New User"
        subTitle="Add a new student, professor, or admin to the system."
        content={getContent()}
        onSubmit={handleSubmit(submitHandler)}
      />
      {/* Snackbar is now handled by parent PeopleManagement component */}
    </>
  );
};

export default NewUserModal;
