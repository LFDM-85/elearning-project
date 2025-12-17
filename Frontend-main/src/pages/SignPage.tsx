import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from '../interceptors/axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../shared/hooks/useAuth';
import { useForm } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function SignPage(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const [signIn, setSignIn] = useState(true);
  const [showFields, setShowFields] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const [confirmPassword, setConfirmPassword] = useState(false);
  const [confirmPasswordChange, setConfirmPasswordChange] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  const authCtx = useAuth();

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const signUpToggleHandler = () => {
    setSignIn((prevState) => {
      return !prevState;
    });
  };

  const showPasswordHandler = () => {
    setShowFields({
      ...showFields,
      showPassword: !showFields.showPassword,
    });
  };

  const showConfirmPasswordHandler = () => {
    setShowFields({
      ...showFields,
      showConfirmPassword: !showFields.showConfirmPassword,
    });
  };

  const validateConfirmPasswordHandler = () => {
    setConfirmPasswordChange(true);
  };

  useEffect(() => {
    if (confirmPasswordChange) {
      if (confirmPassword) {
        setShowConfirmPasswordError(false);
      } else {
        setShowConfirmPasswordError(true);
      }
    }
  }, [confirmPasswordChange]);

  const signRoute: string = signIn ? 'auth/signin' : 'auth/signup';

  const submitHandler = async ({
    name,
    email,
    password,
    confirmPassword,
  }: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const inputs = {
      name,
      email,
      password,
      confirmPassword,
    };

    const PROFESSOR_ROLE = ['professor']; // default role on signUp

    if (!signIn) {
      if (inputs.password === inputs.confirmPassword) {
        setConfirmPassword(false);
        axios
          .post(signRoute, {
            ...inputs,
            roles: PROFESSOR_ROLE,
            isValidated: false,
          })
          .then((res) => {
            if (res.status === 201) {
              showSnackbar('User was created! Please Sign In', 'success');
              console.log('User created');
              navigate('/sign', { replace: true });
              setSignIn(true);
              return;
            }
          })
          .catch(function (error) {
            showSnackbar('Email already exists!', 'error');
            navigate('/sign', { replace: true });
            console.log(error.message);
            return;
          });
      } else {
        setConfirmPassword(true);
        showSnackbar('The inputed passwords are different! Try again', 'error');
      }
    }

    if (signIn) {
      // Explicitly clear Authorization header for sign-in to avoid invalid token issues
      const config = {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': '' 
        },
      };

      axios
        .post(signRoute, { email: inputs.email, password: inputs.password }, config)
        .then((res) => {
          const accessToken = res.data.tokens.accessToken;
          localStorage.setItem('accessToken', res.data.tokens.accessToken);
          localStorage.setItem('refreshToken', res.data.tokens.refreshToken);

          authCtx.signin(accessToken, res.data.user);
          authCtx.isSignedIn = true;

          console.log('User logged In');
          navigate('/my', { replace: true });
        })
        .catch(function (error) {
          console.error('Login Error:', error);
          const errMsg = error.response?.data?.message 
            ? (Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message)
            : error.message || 'User not found!';
          showSnackbar(errMsg, 'error');
        });
    }
  };

  const adminDemoSignIn = () => {
    const config = {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': '' 
        },
    };

    axios
      .post(
        'auth/signin',
        { email: 'admin@admin.com', password: 'qwertyuiop' },
        config
      )
      .then((res) => {
        const accessToken = res.data.tokens.accessToken;
        // localStorage.setItem('tokens', JSON.stringify(res.data.tokens));
        localStorage.setItem('accessToken', res.data.tokens.accessToken);
        localStorage.setItem('refreshToken', res.data.tokens.refreshToken);

        authCtx.signin(accessToken, res.data.user);
        // authCtx.isSignedIn = true;

        console.log('User logged In');
        navigate('/my', { replace: true });
      })
      .catch(function (error) {
        console.error('Admin Demo Login Error:', error);
        const errMsg = error.response?.data?.message 
            ? (Array.isArray(error.response.data.message) ? error.response.data.message[0] : error.response.data.message)
            : error.message || 'Admin user not found!';
        showSnackbar(errMsg, 'error');
        // authCtx.isSignedIn = false;
      });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Example gradient
          // backgroundImage: 'url(https://source.unsplash.com/random)', // Example image, uncomment to use
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8, // Adjust opacity to make text readable
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          height: 'auto', // Adjust height to content
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1, // Ensure the form is above the background
          margin: 'auto', // Center the grid item
          padding: 4,
          borderRadius: 2, // Slightly rounded corners for the paper
        }}
      >
        <Box
          sx={{
            my: 4, // Adjusted vertical margin
            mx: 2, // Adjusted horizontal margin
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%', // Ensure the box takes full width of its parent Grid item
            maxWidth: 400, // Limit form width for better readability
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}> {/* Added bottom margin */}
            {!signIn ? 'Sign Up - Professors Only' : 'Sign In'}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submitHandler)}
            sx={{ mt: 1, width: '100%' }} // Ensure form takes full width
          >
            {!signIn && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your Name"
                {...register('name', {
                  required: 'Name is required!',
                  minLength: {
                    value: 3,
                    message:
                      'Invalid name, must have between 3 to 25 characters',
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
            )}
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
              autoFocus
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
                  message:
                    'Invalid password, must have between 8 to 25 characters',
                },
                maxLength: {
                  value: 25,
                  message:
                    'Invalid password, must have less then 25 characters',
                },
              })}
              label="Password"
              type={showFields.showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
              inputProps={{ maxLength: 25 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={showPasswordHandler}
                      aria-label="toggle password"
                      edge="end"
                    >
                      {showFields.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {!signIn && (
              <TextField
                margin="normal"
                required
                fullWidth
                {...register('confirmPassword', {
                  required: 'Confirm password is required!',
                  minLength: {
                    value: 8,
                    message:
                      'Invalid password, must have between 8 to 25 characters',
                  },
                  maxLength: {
                    value: 25,
                    message:
                      'Invalid password, must have less then 25 characters',
                  },
                })}
                label="Confirm Password"
                type={showFields.showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="confirm-password"
                error={!!errors?.confirmPassword}
                helperText={
                  !showConfirmPasswordError && confirmPassword
                    ? null
                    : 'Passwords do not match'
                }
                inputProps={{ maxLength: 25 }}
                onChange={validateConfirmPasswordHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={showConfirmPasswordHandler}
                        aria-label="toggle password"
                        edge="end"
                      >
                        {showFields.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {signIn && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary" // Changed to primary
              sx={{ mt: 3, mb: 2 }}
            >
              {!signIn ? 'Sign Up' : 'Sign In'}
            </Button>
            {signIn && (
              <Button
                onClick={() => adminDemoSignIn()}
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 1, mb: 2 }} // Adjusted top margin to separate from primary button
              >
                {'Admin Demonstration Sign IN'}
              </Button>
            )}
            <Grid container>
              <Grid item>
                <Link variant="body2" onClick={signUpToggleHandler}>
                  {signIn
                    ? 'Dont have an account? Sign Up'
                    : 'Have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      {/* Snackbar for messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
