import { Box, Tabs, Tab, Typography, Snackbar, Alert, Button } from '@mui/material';
import React, { memo, useState, useCallback, useRef } from 'react';
import DataTableUsers from './DataTable/DataTableUsers';
import NewUserModal from './Modals/NewUserModal';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const PeopleManagement = memo(() => {
  const [value, setValue] = useState(0);
  const [openNewUserModal, setOpenNewUserModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // State to trigger DataTableUsers refresh

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = useCallback((message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenNewUserModal = () => {
    setOpenNewUserModal(true);
  };

  const handleCloseNewUserModal = () => {
    setOpenNewUserModal(false);
  };

  const handleUserAdded = useCallback(() => {
    setRefreshTrigger(prev => prev + 1); // Increment to trigger refresh in DataTableUsers
    handleCloseNewUserModal();
  }, []);


  return (
    <Box sx={{ width: '100%', typography: 'body1', p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 4 }}>
        User Management
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="user management tabs">
          <Tab label="All Users" />
          <Tab label="Add New User" />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <DataTableUsers refreshTrigger={refreshTrigger} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Button variant="contained" onClick={handleOpenNewUserModal}>
          Add New User
        </Button>
        <NewUserModal
          open={openNewUserModal}
          onClose={handleCloseNewUserModal}
          onUserAdded={handleUserAdded}
          showSnackbar={showSnackbar}
          handleSnackbarClose={handleSnackbarClose}
        />
      </CustomTabPanel>

      {/* Snackbar for messages */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
});

PeopleManagement.displayName = 'PeopleManagement';

export default React.memo(PeopleManagement);
