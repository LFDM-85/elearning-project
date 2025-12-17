import { useNavigate } from 'react-router-dom';
import unauthorized from '../assets/goback.svg';
import { Button, Grid, Typography, Box } from '@mui/material'; // Added Typography and Box
import React from 'react';

const Unauthorized = () => {
  const navigate = useNavigate();

  const goPreviousPage = () => navigate(-1);

  return (
    <Grid container component="main" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        sx={{
          backgroundImage: `url(${unauthorized})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain', // Ensure the image fits within the container
          height: '60%', // Adjust height to leave space for text and button
          width: '100%',
          mb: 2, // Add bottom margin
        }}
      >
        {/* The image itself is the main content here, no children needed */}
      </Grid>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          You are not authorized to view this page.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please log in with appropriate permissions or go back.
        </Typography>
      </Box>
      <Grid container justifyContent="center" alignItems="center">
        <Grid>
          <Button
            onClick={goPreviousPage}
            size="large"
            variant="contained"
            color="primary" // Changed to primary for better visibility
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Unauthorized;
