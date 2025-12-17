import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Paper,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Stack,
  IconButton
} from '@mui/material';
import { FilePresent, PlusOne, Send, ExpandMore, UploadFile, Assignment } from '@mui/icons-material';
import { memo, useCallback, useEffect, useState } from 'react';
import axios from '../../interceptors/axios';
import useAuth from '../hooks/useAuth';
import { ICourse, ILectures, IUser, IWorks } from '../interfaces/interfaces';
import NewWorkModal from './Modals/NewWorkModal';
import NewJustificationModal from './Modals/NewJustificationModal';
import WorkItem from './WorkItem';
import JustificationItem from './JustificationItem';
import useGetAllUsersData from '../hooks/useGetAllUsersData';
import AddAssessments from './AddAssessments';
import React from 'react';

// Simple hash function to convert string to a number
const stringToNumberHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const WorkSection = memo(() => {
  const authCtx = useAuth();
  const [courses, setCourses] = useState<ICourse[]>(() => []);
  const [open, setOpen] = useState(false);
  const [lectureId, setLectureId] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const { data: allUsersData } = useGetAllUsersData();
  const [numberInput, setNumberInput] = useState<any>({});
  const [isWorkFile, setIsWorkFile] = useState<boolean>(true);
  const [getInfo, setGetInfo] = useState<any>({});

  const handleNumberInputChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      email: string,
      lecture_Id: string
    ) => {
      setNumberInput((values: any) => {
        return {
          ...values,
          [lecture_Id]: {
            ...values[lecture_Id],
            [email]: event.target.value,
          },
        };
      });
    },
    []
  );

  const addHandler = useCallback((id: string, userEmail: string) => {
    setOpen(true);
    setLectureId(id);
    setUserEmail(userEmail);
  }, []);

  useEffect(() => {
    if (authCtx.user?.email) {
      axios
        .get(`user/${authCtx.user.email}`)
        .then((res: any) => {
          setCourses(res.data.courses);
        })
        .catch((error: any) => console.log(`Error: ${error}`));
    }
  }, [authCtx.user?.email]);

  const addAssessmentsHandler = useCallback(() => {
    for (const key in numberInput) {
      const element = numberInput[key];
      const lectId = key;
      for (const key in element) {
        const userEmailGrade: string = key;
        const grade: number = element[key];

        axios
          .post('/assessments/create', {
            assessmentValue: grade,
            userEmail: userEmailGrade,
          })
          .then((res: any) => {
            const assessmentId: string = res.data._id;
            if (res.status === 200) {
              axios
                .patch(
                  `/users/${userEmailGrade}/add-assessment/${res.data._id}`
                )
                .catch((error: any) => console.log('Error', error));
              axios
                .patch(`/lectures/${assessmentId}/add-assessment/${lectId}`)
                .catch((error: any) => console.log('Error', error));
            }
          })
          .catch((error: any) => console.log(`Error: ${error} `));
      }
    }
  }, [numberInput]);

  const addAttendanceHandle = useCallback(
    (lectureId: string) => {
      axios
        .post('attendance/create', { attendance: true, validation: false })
        .then((res: any) => {
          console.log(res.data);
          const attendanceId: string = res.data._id;
          if (res.status === 200) {
            axios
              .patch(
                `/users/${authCtx.user.email}/add-attendance/${res.data._id}`,
                {
                  attendance: true,
                }
              )
              .catch((error: any) => console.log('Error', error));

            axios
              .patch(`/lectures/${attendanceId}/add-attendance/${lectureId}`, {
                attendance: true,
              })
              .catch((error: any) => console.log('Error', error));
          }
        })
        .catch((error: any) => console.log(`Error: ${error} `));
    },
    [lectureId, authCtx.user?.email]
  );

  const getInformation = useCallback((allUsersData: IUser[]) => {
    const info = allUsersData.map((user) => {
      return {
        name: user.name,
        email: user.email,
        roles: user.roles,
        classes: user.courses.map((course: ICourse) => {
          return {
            nameCourse: course.nameCourse,
            lecture: course.lecture.map((lecture: ILectures) => {
              return {
                summary: lecture.summary,
                description: lecture.description,
                assessment: lecture.assessment,
              };
            }),
          };
        }),
      };
    });
    setGetInfo(info);
  }, []);

  useEffect(() => {
    if (allUsersData) {
      getInformation(allUsersData);
    }
  }, [allUsersData, getInformation]);

  const renderCoursesAndWorks = courses && courses.length > 0 ? (
    courses.map((course: ICourse) => (
      <Paper key={course._id} elevation={0} sx={{ mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2, bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={700}>
                {course.nameCourse}
            </Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          {course.lecture && course.lecture.length > 0 ? (
            course.lecture.map((lecture: ILectures) => (
                <Accordion key={lecture._id} elevation={0} sx={{ '&:before': { display: 'none' }, border: '1px solid', borderColor: 'divider', borderRadius: '8px !important', mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Assignment color="action" />
                            <Typography variant="subtitle1" fontWeight={600}>
                                {lecture.summary}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="overline" color="text.secondary">Actions</Typography>
                                {/* Student Actions */}
                                {authCtx.user.roles.includes('student') && (
                                    <Stack spacing={2} sx={{ mt: 1 }}>
                                        <FormControlLabel
                                            control={
                                            <Checkbox
                                                onChange={() =>
                                                addAttendanceHandle(lecture._id)
                                                }
                                            />
                                            }
                                            label="Mark Attendance"
                                        />
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                variant="outlined"
                                                startIcon={<FilePresent />}
                                                onClick={() => {
                                                setIsWorkFile(false);
                                                addHandler(lecture._id, authCtx.user.email);
                                                }}
                                                fullWidth
                                            >
                                                Justify Absence
                                            </Button>
                                            <Button
                                                variant="contained"
                                                startIcon={<UploadFile />}
                                                onClick={() => {
                                                setIsWorkFile(true);
                                                addHandler(lecture._id, authCtx.user.email);
                                                }}
                                                fullWidth
                                            >
                                                Submit Work
                                            </Button>
                                        </Stack>
                                    </Stack>
                                )}

                                {/* Professor Actions */}
                                {authCtx.user.roles.includes('professor') && (
                                    <Stack spacing={2} sx={{ mt: 1 }}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<PlusOne />}
                                            onClick={() => {
                                            setIsWorkFile(true);
                                            addHandler(lecture._id, authCtx.user.email);
                                            }}
                                        >
                                            Add Reference Work
                                        </Button>
                                        <Button
                                            variant="contained"
                                            startIcon={<Send />}
                                            onClick={addAssessmentsHandler}
                                        >
                                            Submit Assessments
                                        </Button>
                                    </Stack>
                                )}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                {authCtx.user.roles.includes('professor') ? (
                                    <Box>
                                        <Typography variant="overline" color="text.secondary">Student Submissions</Typography>
                                        <Box sx={{ maxHeight: 300, overflowY: 'auto', mt: 1 }}>
                                            {allUsersData && allUsersData.map((user: IUser) => {
                                                if (user.roles.includes('student')) {
                                                const studentLectureInfo = user.courses.find(c => c._id === course._id)?.lecture.find(l => l._id === lecture._id);
                                                if (studentLectureInfo && studentLectureInfo.work && studentLectureInfo.work.length > 0) {
                                                    return (
                                                    <Box key={user._id} sx={{ mb: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                                                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
                                                        {studentLectureInfo.work.map((work: IWorks) => (
                                                        <WorkItem
                                                            key={work._id}
                                                            filename={work.filename}
                                                            filepath={work.filepath}
                                                            owner={work.owner}
                                                        />
                                                        ))}
                                                    </Box>
                                                    );
                                                }
                                                }
                                                return null;
                                            })}
                                        </Box>

                                        <Divider sx={{ my: 2 }} />
                                        
                                        <Typography variant="overline" color="text.secondary">Grading</Typography>
                                        <Box sx={{ mt: 1 }}>
                                            {allUsersData && allUsersData.map((user: IUser) => {
                                                if (user.roles.includes('student')) {
                                                    return (
                                                    <AddAssessments
                                                    key={stringToNumberHash(user._id)}
                                                    handleInput={handleNumberInputChange}
                                                    user={user}
                                                    numberInput={numberInput}
                                                    lecture_Id={lecture._id}
                                                    />
                                                    );
                                                }
                                                return null;
                                            })}
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box>
                                         <Typography variant="overline" color="text.secondary">Info</Typography>
                                         <Typography variant="body2" color="text.secondary">
                                             Upload your assignments here. Your professor will grade them once submitted.
                                         </Typography>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))
          ) : (
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                No lectures found for this course.
            </Typography>
          )}
        </Box>
      </Paper>
    ))
  ) : (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="text.secondary">No courses found.</Typography>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Works & Attendance
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your assignments, justify absences, and track your attendance.
        </Typography>
      </Box>

      {renderCoursesAndWorks}

      {isWorkFile ? (
        <NewWorkModal
          userEmail={userEmail}
          lectureId={lectureId}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      ) : (
        <NewJustificationModal
          userEmail={userEmail}
          lectureId={lectureId}
          open={open}
          onClose={() => {
            setOpen(false);
            setIsWorkFile(true);
          }}
        />
      )}
    </Container>
  );
});

WorkSection.displayName = 'WorkSection';

export default WorkSection;