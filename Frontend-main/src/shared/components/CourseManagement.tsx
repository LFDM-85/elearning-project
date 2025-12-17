import { Box } from '@mui/material';
import CourseSectionManagement from './CourseSectionManagement';
import { memo } from 'react';
import DataTableCourses from './DataTable/DataTableCourses';

const CourseManagement = memo(() => {
  return (
    <>
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <DataTableCourses />
        <CourseSectionManagement />
      </Box>
    </>
  );
});

CourseManagement.displayName = 'CourseManagement';

export default CourseManagement;
