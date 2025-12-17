import { Typography, Grid, Container } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import CourseItem from './CourseItem';
import { ICourse } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetCoursesCurrUserEmailData from '../hooks/useGetCoursesByCurrUserEmailData';
import React from 'react';

const CoursesSection = memo(() => {
  const { courseData } = useGetCoursesCurrUserEmailData();
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    if (courseData) {
      setCourses(courseData);
    }
  }, [courseData]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          My Courses
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access all your enrolled courses and materials.
        </Typography>
      </Box>

      {courses && courses.length > 0 ? (
        <Grid container spacing={4}>
          {courses.map((course: ICourse) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
              <CourseItem 
                name={course.nameCourse} 
                image={`https://picsum.photos/seed/${course._id}/400/250`} // Better quality image
                description={`Explore the fundamentals and advanced topics of ${course.nameCourse}.`} 
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No courses found.
          </Typography>
        </Box>
      )}
    </Container>
  );
});

CoursesSection.displayName = 'CoursesSection';

export default CoursesSection;
