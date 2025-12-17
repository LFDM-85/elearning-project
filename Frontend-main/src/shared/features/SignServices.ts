import axios from '../../interceptors/axios';
import useAuth from '../hooks/useAuth';
interface IInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signin = (route: string, inputs: IInputs) => {
  const authCtx = useAuth();
  axios
    .post(route, inputs, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authCtx.token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data);
      console.log('User logged In');
      return res.data;
    })
    .catch(function (error) {
      alert('User not found!');
      console.log(error.message);
    });
};
export const signup = (route: string, inputs: IInputs) => {
  axios
    .post(route, inputs)
    .then((res) => {
      if (res.status === 201) {
        alert('User was created! Please Sign In');
        console.log('User created');
        return;
      }
    })
    .catch(function (error) {
      alert('Email already exists!');
      console.log(error.message);
      return;
    });
};
// export const signToken = () => {};
export const signout = () => {
  axios.post('/auth/signout').then((_res) => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  });
};
