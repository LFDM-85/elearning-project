import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import useAuth from './useAuth';

const useGetCoursesCurrUserEmailData = () => {
  const [courseData, setCourseData] = useState([]);
  const authCtx = useAuth();

  const getCoursesCurrUserEmailData = async () => {
    const config = {
      headers: { Authorization: `Bearer ${authCtx.token}` },
    };
    try {
      const { data: response } = await axios.get(
        `/users/${authCtx.user.email}/courses`,
        config
      );
      setCourseData(response.courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCoursesCurrUserEmailData();
  }, [setCourseData]);

  return {
    courseData,
  };
};
export default useGetCoursesCurrUserEmailData;
