import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import { IUser } from '../interfaces/interfaces';
import useAuth from './useAuth';

const useGetAllUsersData = () => {
  const [data, setData] = useState<IUser[]>([]);
  const authCtx = useAuth();

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${authCtx.token}` },
    };

    const getUsersData = async () => {
      try {
        const { data: response } = await axios.get('users', config);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    getUsersData();
  }, []);
  return {
    data,
  };
};
export default useGetAllUsersData;
