import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import { ICourse } from '../interfaces/interfaces';
import useAuth from './useAuth';

const useGetAllCoursesData = () => {
  const [courseData, setCourseData] = useState<ICourse[]>([]);
  const authCtx = useAuth();

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${authCtx.token}` } };
    const getUsersData = async () => {
      try {
        const { data: response } = await axios.get('course/all', config);
        setCourseData(response);
      } catch (error) {
        console.error(error);
      }
    };

    getUsersData();
  }, []);
  return { courseData };
};
export default useGetAllCoursesData;
