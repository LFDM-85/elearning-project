import { useEffect, useState, useCallback } from 'react';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
  GridRowId,
  GridRowModel,
  GridRowParams,
} from '@mui/x-data-grid';
import axios from '../../../interceptors/axios';
import { IUser } from '../../interfaces/interfaces';
import { Avatar, Box, Snackbar, Alert, Chip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

interface DataTableUsersProps {
    refreshTrigger?: number; // Optional prop to trigger data refresh
}

const DataTableUsers = ({ refreshTrigger }: DataTableUsersProps) => { // Updated component signature
  const [data, setData] = useState<IUser[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const usersData = useCallback(async () => {
    try {
      const res = await axios.get('/users');
      setData(res.data);
    } catch (error: any) {
      console.error(`Error fetching users: ${error.message}`);
      showSnackbar(`Error fetching users: ${error.message}`, 'error');
    }
  }, []);

  useEffect(() => {
    usersData();
  }, [usersData, refreshTrigger]); // Add refreshTrigger to dependency array

  const handleDeleteClick = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`/users/${id}`);
        setData((prevData) => prevData.filter((row) => row._id !== id));
        showSnackbar('User deleted successfully!', 'success');
      } catch (error: any) {
        console.error(`Error deleting user: ${error.message}`);
        showSnackbar(`Error deleting user: ${error.message}`, 'error');
      }
    },
    []
  );

  const handleEditClick = useCallback((id: GridRowId) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
  }, []);

  const handleSaveClick = useCallback((id: GridRowId) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
  }, []);

  const handleCancelClick = useCallback((id: GridRowId) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const editedRow = data.find((row) => row._id === id);
    if (editedRow && (editedRow as any).isNew) {
      setData((prevData) => prevData.filter((row) => row._id !== id));
    }
  }, [data]);

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel, oldRow: GridRowModel) => {
      const updatedRow = { ...newRow };
      try {
        await axios.patch(`/users/${updatedRow.id}`, {
          name: updatedRow.name,
          email: updatedRow.email,
          roles: updatedRow.roles,
          isValidated: updatedRow.isValidated,
        });
        showSnackbar('User updated successfully!', 'success');
        setData((prevData) =>
          prevData.map((row) => (row._id === updatedRow.id ? (updatedRow as IUser) : row))
        );
        return updatedRow;
      } catch (error: any) {
        console.error(`Error updating user: ${error.message}`);
        showSnackbar(`Error updating user: ${error.message}`, 'error');
        return oldRow;
      }
    },
    []
  );

  const handleRowModesModelChange = useCallback((newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Avatar',
      width: 70,
      sortable: false,
      renderCell: (params: any) => <Avatar src={params.value} alt={params.row.name} />,
      filterable: false,
    },
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'name', headerName: 'Name', width: 200, editable: true },
    { field: 'email', headerName: 'Contact (Email)', width: 250, editable: true },
    {
      field: 'coursesCount',
      headerName: 'Courses',
      width: 100,
      editable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: any) => (
        <Chip label={params.value} size="small" variant="outlined" />
      ),
    },
    {
      field: 'roles',
      headerName: 'Roles',
      width: 200,
      editable: true,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {params.value.map((role: string) => (
            <Chip
                key={role}
                label={role}
                size="small"
                color={role === 'admin' ? 'secondary' : role === 'professor' ? 'primary' : 'default'}
            />
          ))}
        </Box>
      ),
    },
    {
      field: 'isValidated',
      headerName: 'Active',
      type: 'boolean',
      editable: true,
      width: 80,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params: GridRowParams) => {
        const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(params.id)}
              color="primary"
            />,
            <GridActionsCellItem
              key="cancel"
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(params.id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(params.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.id as string)}
            color="inherit"
          />,
        ];
      },
    } as GridColDef,
  ];

  const rows = data.map((row) => ({
    image: row.image,
    id: row._id,
    name: row.name,
    email: row.email,
    roles: row.roles,
    isValidated: row.isValidated,
    coursesCount: row.courses ? row.courses.length : 0,
  }));

  return (
    <Box sx={{ height: 700, width: '100%', p: 0 }}> {/* Removed padding for full width within tab */}
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onProcessRowUpdateError={(error) => showSnackbar(`Error updating row: ${error.message}`, 'error')}
        processRowUpdate={processRowUpdate}
        rowsPerPageOptions={[10, 25, 50]}
        pageSize={10}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
        }}
      />
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DataTableUsers;