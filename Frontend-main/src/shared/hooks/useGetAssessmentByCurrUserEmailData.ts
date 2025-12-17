import { useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import useAuth from './useAuth';
import useGetClassesByCurrEmailData from './useGetCoursesByCurrUserEmailData';

const useGetAssessmentsCurrUserEmailData = () => {
  // const [assessmentData, setAssessmentData] = useState([]);
  // const { data } = useGetClassesByCurrEmailData();
  // useEffect(() => {
  //   const getAssessmentsCurrUserEmailData = async () => {
  //     try {
  //       const { data: response } = await axios.get(
  //         `auth/${authCtx.user.email}/assessments`
  //       );
  //       setData(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getAssessmentsCurrUserEmailData();
  // }, []);
  // return {
  //   data,
  // };
};
export default useGetAssessmentsCurrUserEmailData;
