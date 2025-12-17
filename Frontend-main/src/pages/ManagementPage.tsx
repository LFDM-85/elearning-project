import { Box, Button } from '@mui/material';
import { useState } from 'react';
import CourseManagement from '../shared/components/CourseManagement';
import PeopleManagement from '../shared/components/PeopleManagement';
export const ManagementPage = () => {
  const [isClassM, setIsClassM] = useState(true);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center the buttons
          alignItems: 'center',
          mb: 3, // Add some bottom margin
        }}
      >
        <Button
          variant={isClassM ? 'contained' : 'outlined'} // Highlight active button
          size="large"
          onClick={() => setIsClassM(true)}
          sx={{ mx: 1 }} // Add horizontal margin
        >
          Class Management
        </Button>
        <Button
          variant={!isClassM ? 'contained' : 'outlined'} // Highlight active button
          size="large"
          onClick={() => setIsClassM(false)}
          sx={{ mx: 1 }} // Add horizontal margin
        >
          People Management
        </Button>
      </Box>

      {isClassM && <CourseManagement />}
      {!isClassM && <PeopleManagement />}
    </>
  );
};
