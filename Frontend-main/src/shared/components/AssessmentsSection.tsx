import { Typography, Grid, Paper, Chip, Container, Stack, Box, Divider } from '@mui/material';
import { ICourse, ILectures } from '../interfaces/interfaces';
import useAuth from '../hooks/useAuth';
import useGetAllUsersData from '../hooks/useGetAllUsersData';
import React, { memo } from 'react';
import { School } from '@mui/icons-material';

const AssessmentsSection = memo(() => {
  const authCtx = useAuth();
  const { data: allUsers } = useGetAllUsersData();
  const signUser = authCtx.user;

  // Filter only the current user's data
  const userData = allUsers?.find(user => user.email === signUser.email);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          My Assessments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View your grades and performance across all courses.
        </Typography>
      </Box>

      {userData && userData.courses.length > 0 ? (
        <Stack spacing={4}>
          {userData.courses.map((course: ICourse) => (
            <Paper key={course._id} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
               <Box sx={{ p: 2, bgcolor: 'background.default', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <School color="primary" />
                  <Typography variant="h6" fontWeight={700}>
                    {course.nameCourse}
                  </Typography>
               </Box>

               <Box sx={{ p: 0 }}>
                 {course.lecture && course.lecture.length > 0 ? (
                    <Stack divider={<Divider />}>
                      {course.lecture.map((lecture: ILectures) => (
                        <Box key={lecture._id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                           <Box>
                             <Typography variant="subtitle1" fontWeight={600}>
                               {lecture.summary}
                             </Typography>
                             <Typography variant="body2" color="text.secondary">
                               {lecture.description ? lecture.description.substring(0, 100) + '...' : ''}
                             </Typography>
                           </Box>

                           <Box>
                              {lecture.assessment && lecture.assessment.length > 0 ? (
                                lecture.assessment.map((assessment) => (
                                  <React.Fragment key={assessment._id}>
                                    {signUser.email === assessment.userEmail && (
                                      <Chip
                                        label={`${assessment.assessmentValue} / 100`}
                                        color={assessment.assessmentValue >= 60 ? 'success' : 'error'}
                                        variant="filled"
                                        sx={{ fontWeight: 'bold' }}
                                      />
                                    )}
                                  </React.Fragment>
                                ))
                              ) : (
                                <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                  Pending Grading
                                </Typography>
                              )}
                           </Box>
                        </Box>
                      ))}
                    </Stack>
                 ) : (
                    <Box sx={{ p: 2 }}>
                       <Typography variant="body2" color="text.secondary">No lectures or assessments recorded.</Typography>
                    </Box>
                 )}
               </Box>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No assessment records found.
          </Typography>
        </Box>
      )}
    </Container>
  );
});

AssessmentsSection.displayName = 'AssessmentsSection';

export default React.memo(AssessmentsSection);
