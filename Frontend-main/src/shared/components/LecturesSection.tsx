import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Chip,
  Divider,
  Stack,
  Box
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import { ICourse, ILectures, IWorks } from '../interfaces/interfaces';
import useAuth from '../hooks/useAuth';
import LectureItem from './LectureItem';
import { PlusOne, ExpandMore, CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import NewLectureModal from './Modals/NewLectureModal';
import WorkItem from './WorkItem';
import JustificationItem from './JustificationItem';
import useGetAllUsersData from '../hooks/useGetAllUsersData';
import React from 'react';
import useGetCoursesCurrUserEmailData from '../hooks/useGetCoursesByCurrUserEmailData';

const LecturesSection = memo(() => {
  const authCtx = useAuth();
  const [open, setOpen] = useState(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isProfessor, setIsProfessor] = useState<boolean>();
  const { data: allUsers } = useGetAllUsersData();

  const { courseData } = useGetCoursesCurrUserEmailData();

  const [courses, setCourses] = useState<ICourse[]>(() => []);
  const [courseId, setCourseId] = useState<string>();

  const addHandler = (id: string) => {
    setOpen(true);
    setCourseId(id);
  };

  const getAllCourses = useCallback(() => {
    setCourses(courseData);
  }, [courseData]);

  const onchangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, lectureId: string) => { // Updated to accept lectureId
      
      axios
        .patch(`lectures/${lectureId}`, { finished: true })
        .then((res) => {
             setIsFinished(true); // This local state logic might need improvement for individual lectures
             // Ideally refetch or update local state specifically for that lecture
        })
        .catch((error) => console.log('Error', error));
    },
    []
  );

  const checkLectureFinished = useCallback(() => {
    let lectureIsFinished = false;
    courses.forEach((course: ICourse) => {
      const findLectureFinished = course.lecture.find((lecture: ILectures) => lecture.finished === true);
      if (findLectureFinished) {
        lectureIsFinished = true;
      }
    });
    setIsFinished(lectureIsFinished);
  }, [courses]);

  const checkIsProfessorLogged = useCallback(() => {
    if (allUsers && authCtx.user) {
      const loggedUser = allUsers.find(user => user._id === authCtx.user._id);
      if (loggedUser && loggedUser.roles.includes('professor')) {
        setIsProfessor(true);
      } else {
        setIsProfessor(false);
      }
    }
  }, [allUsers, authCtx.user]);


  useEffect(() => {
    getAllCourses();
  }, [getAllCourses]);

  useEffect(() => {
    checkLectureFinished();
  }, [checkLectureFinished]);

  useEffect(() => {
    checkIsProfessorLogged();
  }, [checkIsProfessorLogged]);


  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Lectures
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and view lectures for your courses.
        </Typography>
      </Box>

      {courses && courses.length > 0 ? (
        <Stack spacing={3}>
          {courses.map((course: ICourse) => (
            <Paper key={course._id} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: 3, bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <Typography variant="h6" fontWeight={700}>
                    {course.nameCourse}
                 </Typography>
                 {authCtx.user.roles.includes('professor') && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<PlusOne />}
                      onClick={() => addHandler(course._id)}
                    >
                      New Lecture
                    </Button>
                  )}
              </Box>

              <Box sx={{ p: 2 }}>
                {course.lecture && course.lecture.length > 0 ? (
                    course.lecture.map((lecture: ILectures) => (
                      <Accordion key={lecture._id} elevation={0} sx={{ '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider', borderRadius: '8px !important', mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                             <Typography variant="subtitle1" fontWeight={600}>
                                {lecture.summary}
                             </Typography>
                             {lecture.finished ? (
                                <Chip icon={<CheckCircle />} label="Finished" color="success" size="small" variant="outlined" />
                             ) : (
                                <Chip icon={<RadioButtonUnchecked />} label="Ongoing" color="default" size="small" variant="outlined" />
                             )}
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={4}>
                             <Grid item xs={12} md={6}>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                  {lecture.description}
                                </Typography>
                                
                                {authCtx.user.roles.includes('professor') && (
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name={lecture.summary}
                                          id={lecture._id}
                                          onChange={(e) => onchangeHandler(e, lecture._id)}
                                          checked={lecture.finished} // Use lecture specific state if available, or fallback
                                        />
                                      }
                                      label="Mark as Finished"
                                      sx={{ mt: 1 }}
                                    />
                                )}
                             </Grid>
                             
                             {/* Professor Only: View Submissions */}
                             {authCtx.user.roles.includes('professor') && (
                                <Grid item xs={12} md={6}>
                                   <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                                      <Typography variant="subtitle2" fontWeight={700} gutterBottom color="primary">
                                         Student Submissions
                                      </Typography>
                                      
                                      {lecture.work && lecture.work.length > 0 ? (
                                         <Stack spacing={1}>
                                            {lecture.work.map((work: IWorks) => (
                                                work.owner.includes('student') && (
                                                    <WorkItem
                                                        key={work._id}
                                                        filename={work.filename}
                                                        filepath={work.filepath}
                                                        owner={work.owner}
                                                    />
                                                )
                                            ))}
                                         </Stack>
                                      ) : (
                                         <Typography variant="caption" color="text.secondary">No works submitted.</Typography>
                                      )}

                                      <Divider sx={{ my: 2 }} />

                                      <Typography variant="subtitle2" fontWeight={700} gutterBottom color="error">
                                         Justifications
                                      </Typography>
                                      {lecture.attendance ? (
                                          <JustificationItem
                                            key={lecture.attendance._id}
                                            attendance={lecture.attendance}
                                          />
                                      ) : (
                                          <Typography variant="caption" color="text.secondary">No justifications.</Typography>
                                      )}

                                   </Paper>
                                </Grid>
                             )}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    ))
                ) : (
                  <Typography variant="body2" sx={{ fontStyle: 'italic', p: 2 }}>
                    No lectures available for this course yet.
                  </Typography>
                )}
              </Box>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h6" color="text.secondary">
            You are not enrolled in any courses.
          </Typography>
        </Box>
      )}

      <NewLectureModal
        courseId={courseId}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </Container>
  );
});

LecturesSection.displayName = 'LectureSection';

export default LecturesSection;
