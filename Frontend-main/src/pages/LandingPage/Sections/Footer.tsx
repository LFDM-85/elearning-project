import { Container, Grid, Box, Link, Typography, IconButton, useTheme, Stack } from '@mui/material';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  const theme = useTheme();

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: theme.palette.grey[900], 
        color: 'white', 
        py: 8,
        borderTop: `1px solid ${theme.palette.grey[800]}`
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand & Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom fontWeight={800} color="primary.light">
              E-le@rn
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.grey[400], maxWidth: 300, lineHeight: 1.6 }}>
              Empowering learners worldwide with accessible, high-quality education. Join our community and start your journey today.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              {[
                { icon: <FaLinkedin size={20} />, url: 'https://www.linkedin.com/in/luisfdmelo/' },
                { icon: <FaGithub size={20} />, url: 'https://github.com/LFDM-85' },
                { icon: <FaTwitter size={20} />, url: '#' },
                { icon: <FaInstagram size={20} />, url: '#' }
              ].map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    color: theme.palette.grey[400], 
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '&:hover': { 
                      color: 'white', 
                      bgcolor: 'primary.main',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Links Sections */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'white' }}>
              Platform
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.5}>
              {['Home', 'Courses', 'Pricing', 'About Us'].map((item) => (
                <Link key={item} href="#" color="inherit" underline="none" sx={{ color: theme.palette.grey[400], '&:hover': { color: 'primary.light' } }}>
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'white' }}>
              Support
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.5}>
              {['Help Center', 'Terms of Service', 'Legal', 'Privacy Policy'].map((item) => (
                <Link key={item} href="#" color="inherit" underline="none" sx={{ color: theme.palette.grey[400], '&:hover': { color: 'primary.light' } }}>
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ color: 'white' }}>
              Contact Us
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.5}>
              <Typography variant="body2" sx={{ color: theme.palette.grey[400] }}>
                Email: support@elearn.com
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.grey[400] }}>
                Phone: +1 (555) 123-4567
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.grey[400] }}>
                Address: 123 Education Lane, Tech City
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8, pt: 3, borderTop: `1px solid ${theme.palette.grey[800]}`, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
            © {new Date().getFullYear()} Luís Melo. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;