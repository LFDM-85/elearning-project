import { Box, Button, Grid, Typography, Container, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import myteam from '../../../assets/hero.jpg';

function Hero() {
  const navigate = useNavigate();
  const theme = useTheme();

  const clickHandler = () => {
    navigate('/sign');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '90vh', // Almost full viewport height
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #E0E7FF 100%)`, // Subtle gradient
        pt: 10, // Padding top to account for header
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  mb: 2,
                  color: 'text.primary',
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                E-le@rn
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Unlock your potential with the best e-learning tools.
                <br />
                Learn <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>Anytime, Anywhere.</Box>
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={clickHandler}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: '50px', // Pill shape for CTA
                }}
              >
                Get Started
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={myteam}
              alt="E-learning Team"
              sx={{
                width: '100%',
                maxWidth: '600px',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                borderRadius: 4,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transform: 'perspective(1000px) rotateY(-5deg)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'perspective(1000px) rotateY(0deg) scale(1.02)',
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Hero;