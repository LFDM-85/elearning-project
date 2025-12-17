import axios from '../../interceptors/axios';
import { IUser } from '../interfaces/interfaces';
import useAuth from './useAuth';

interface Props {
  token: undefined;
  isSignedIn: boolean;
  user: IUser;
  signin: (token: string, user: IUser) => void;
  signout: () => void;
}

const useRefreshToken = () => {
  const { setUser }: any = useAuth();

  const refresh = async () => {
    const response = await axios.put('/auth/refresh', {
      withCredentials: true,
    });
    setUser((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.tokens.accessToken);
      return { ...prev, accessToken: response.data.tokens.accessToken };
    });
    return response.data.tokens.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
