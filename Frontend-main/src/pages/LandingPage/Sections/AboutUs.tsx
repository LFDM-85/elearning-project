import { Box, Grid, Typography, Container } from '@mui/material';
import Everywhere from '../../../assets/learn.jpg';

function AboutUs() {
  return (
    <Box component="section" id="about" sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={Everywhere}
              alt="Work everywhere"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 4,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
              Learn Quickly, Anywhere
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
              We aim to show a different way of teaching and learning. You can
              study anywhere as if you were in the classroom. Study at your own
              pace and you will always have support from teachers and
              classmates.
            </Typography>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              Anytime, anywhere!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutUs;