import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Button,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useTheme,
  Stack,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';

interface ElevationScrollProps {
  children: React.ReactElement;
}

function ElevationScroll(props: ElevationScrollProps) {
  const { children } = props;
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      backgroundColor: trigger ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
      backdropFilter: trigger ? 'blur(20px)' : 'none',
      borderBottom: trigger ? `1px solid ${theme.palette.divider}` : 'none',
      transition: 'all 0.3s ease-in-out',
      color: trigger ? theme.palette.text.primary : theme.palette.text.primary,
    },
  });
}

const links = [
  { id: 1, route: 'Home', url: '#' },
  { id: 2, route: 'Courses', url: '#courses' },
  { id: 3, route: 'About', url: '#about' },
  { id: 4, route: 'Contact', url: '#contact' },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSignClick = () => {
    navigate('/sign');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ py: 3, backgroundColor: theme.palette.primary.main, color: 'white' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 1 }}>
          E-le@rn
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1, pt: 4 }}>
        {links.map((link) => (
          <ListItem key={link.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', py: 2 }} component="a" href={link.url}>
              <ListItemText 
                primary={link.route} 
                primaryTypographyProps={{ variant: 'h6', fontWeight: 500 }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          size="large"
          onClick={handleSignClick} 
          sx={{ borderRadius: 8, textTransform: 'none', fontSize: '1.1rem' }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll>
        <AppBar position="fixed" color="transparent" sx={{ py: 1 }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              {/* Logo */}
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      fontWeight: 800,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-1px',
                    }}
                  >
                    E-le@rn
                  </Typography>
                </Link>
              </Box>

              {/* Desktop Menu */}
              {isMobile ? (
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  size="large"
                >
                  <MenuIcon fontSize="inherit" />
                </IconButton>
              ) : (
                <Stack direction="row" spacing={4} alignItems="center">
                  {links.map((link) => (
                    <Link 
                      key={link.id} 
                      to={link.url}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 600,
                          position: 'relative',
                          '&:hover': {
                            color: 'primary.main',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '0%',
                            height: '2px',
                            bottom: -4,
                            left: 0,
                            backgroundColor: 'primary.main',
                            transition: 'width 0.3s',
                          },
                          '&:hover::after': {
                            width: '100%',
                          },
                        }}
                      >
                        {link.route}
                      </Typography>
                    </Link>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSignClick}
                    sx={{ 
                      borderRadius: '50px', 
                      px: 4, 
                      py: 1,
                      fontWeight: 700,
                      boxShadow: '0 4px 14px 0 rgba(79, 70, 229, 0.39)'
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      
      {/* Drawer for Mobile */}
      <Box component="nav">
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;