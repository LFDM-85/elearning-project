import { Groups, Home, LocalLibrary, Work } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Stack,
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { signout } from '../features/SignServices';
import React from 'react';

type IProps = {
  children: React.ReactNode;
};

const SideBar = ({ children }: IProps) => {
  const authCtx = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const path = location.pathname;

  const signOutHandler = async () => {
    signout();
    authCtx.isSignedIn = false;
    navigate('/', { replace: true });
  };

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/my', roles: ['student', 'professor'] },
    { text: 'Courses', icon: <Groups />, path: '/my/courses', roles: ['student', 'professor'] },
    { text: 'Lectures', icon: <LocalLibrary />, path: '/my/lecture', roles: ['student', 'professor'] },
    { text: 'Works', icon: <Work />, path: '/my/work', roles: ['student', 'professor'] },
    { text: 'Assessments', icon: <SchoolIcon />, path: '/my/assessment', roles: ['student'] },
    { text: 'Class Management', icon: <ManageAccountsIcon />, path: '/my/management', subPath: '/my/management/course', roles: ['admin'] },
    // Note: Staff Management logic in original was a bit tricky with same path but different selection logic.
    // Simplifying for now based on original code structure which seemed to link to same page.
    // Original had two links to '/my/management'.
  ];

  const adminItems = [
     { text: 'Class Management', icon: <ManageAccountsIcon />, path: '/my/management', selectionMatch: '/my/management/course', roles: ['admin'] },
     { text: 'Staff Management', icon: <ManageAccountsIcon />, path: '/my/management', selectionMatch: '/my/management/staff', roles: ['admin'] },
  ];


  const renderListItem = (item: any) => {
    // Check role access
    const hasRole = item.roles.some((role: string) => authCtx.user.roles.includes(role));
    if (!hasRole) return null;

    const isSelected = item.selectionMatch ? path === item.selectionMatch : path === item.path;

    return (
      <ListItemButton
        key={item.text}
        component={Link}
        to={item.path}
        selected={isSelected}
        sx={{
          m: 1,
          borderRadius: 2,
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '& .MuiListItemIcon-root': {
              color: 'primary.contrastText',
            },
          },
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'inherit' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isSelected ? 600 : 400 }} />
      </ListItemButton>
    );
  };

  return (
    <>
      <Drawer
        open={true}
        variant={smDown ? 'temporary' : 'permanent'}
        PaperProps={{
            sx: {
                width: 280,
                borderRight: 'none',
                boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
                backgroundColor: 'background.paper',
            }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* User Profile Section */}
          <Box
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar
              src={`${authCtx.user.image}`}
              sx={{ 
                height: 96, 
                width: 96,
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                border: `4px solid ${theme.palette.background.paper}`
              }}
            />
            <Box textAlign="center">
              <Typography variant="h6" fontWeight={700}>
                {authCtx.user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {authCtx.user.roles[0]}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mx: 2, mb: 2 }} />

          {/* Navigation Items */}
          <Box flex={1} px={1}>
            <List component="nav">
                {/* Standard Items */}
                {menuItems.filter(i => !i.roles.includes('admin')).map(renderListItem)}
                
                {/* Admin Items (Handled explicitly due to the specific logic in original) */}
                {authCtx.user.roles.includes('admin') && (
                    <>
                    {renderListItem({ text: 'Class Management', icon: <ManageAccountsIcon />, path: '/my/management', selectionMatch: '/my/management/course', roles: ['admin'] })}
                    {renderListItem({ text: 'Staff Management', icon: <ManageAccountsIcon />, path: '/my/management', selectionMatch: '/my/management/staff', roles: ['admin'] })}
                    </>
                )}
            </List>
          </Box>

          {/* Logout Section */}
          <Box p={2}>
            <ListItemButton 
                onClick={signOutHandler}
                sx={{
                    borderRadius: 2,
                    color: 'error.main',
                    '&:hover': {
                        backgroundColor: 'rgba(211, 47, 47, 0.04)'
                    }
                }}
            >
              <ListItemIcon sx={{ color: 'error.main' }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
      <Box 
        component="main"
        sx={{ 
            height: '100vh',
            marginLeft: smDown ? 0 : '280px',
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: 'background.default',
            overflow: 'auto'
        }}
      >
        {children}
      </Box>
    </>
  );
};
export default React.memo(SideBar);
