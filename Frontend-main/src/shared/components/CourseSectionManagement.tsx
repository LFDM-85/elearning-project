import { Button, Typography, Grid } from '@mui/material'; // Added Grid import
import { memo, useEffect, useState, useCallback } from 'react'; // Added useCallback
import { ICourse } from '../interfaces/interfaces';
import { Box } from '@mui/system';
import useGetAllCoursesData from '../hooks/useGetAllCoursesData';
import { NewCourseModal } from './Modals/NewCourseModal';
import { Add } from '@mui/icons-material';
import EditCourseItem from './EditCourseItem';
// Removed makeStyles import
// import { makeStyles } from '@mui/styles'; // Removed this line

// Removed useStyles definition

const CourseSectionManagement = memo(() => {
  const { courseData } = useGetAllCoursesData();
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  // Removed classesStyles = useStyles();

  const getCoursesList = useCallback(() => {
    setCourses(courseData);
  }, [courseData]); // Dependency on courseData

  const addHandler = () => {
    setOpen(true);
  };

  const renderCourses = courses && courses.length > 0 ? (
    <Grid container spacing={2}> {/* Grid container for courses */}
      {courses.map((course: ICourse) => (
        <Grid item xs={12} sm={6} md={4} key={course._id}> {/* Grid item for each course */}
          <EditCourseItem name={course.nameCourse} id={course._id} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>No data found</Typography> // Replaced h3
  );

  useEffect(() => {
    getCoursesList();
  }, [getCoursesList]); // Dependency on the memoized getCoursesList

  return (
    <>
      <Typography component="h5" variant="h5" sx={{ mb: 2 }}>
        My Courses
      </Typography>
      <Box 
        sx={{
          mb: 2,
          padding: 2, // Adjusted padding
          margin: 1, // Adjusted margin
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={addHandler}
          sx={{ mb: 2, alignSelf: 'flex-start' }} // Styled button with sx prop
        >
          ADD COURSE
        </Button>

        {renderCourses}
        <NewCourseModal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </Box>
    </>
  );
});

CourseSectionManagement.displayName = 'CourseSectionManagement';

export default CourseSectionManagement;
