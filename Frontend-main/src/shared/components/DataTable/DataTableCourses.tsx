import { useEffect, useState, useCallback } from 'react';
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowModesModel,
  GridRowModes,
  GridEventListener,
  GridRowId,
  GridRowsProp,
  GridRowModel,
  GridRowParams, // Import GridRowParams
} from '@mui/x-data-grid';
import axios from '../../../interceptors/axios';
import { ICourse } from '../../interfaces/interfaces';
import { Box, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

const DataTableCourses = () => {
  const [data, setData] = useState<ICourse[]>([]);
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
      const res = await axios.get('course/all');
      setData(res.data);
    } catch (error: any) {
      console.error(`Error fetching courses: ${error.message}`);
      showSnackbar(`Error fetching courses: ${error.message}`, 'error');
    }
  }, []);

  useEffect(() => {
    usersData();
  }, [usersData]);

  const handleDeleteClick = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`course/${id}`);
        setData((prevData) => prevData.filter((row) => row._id !== id));
        showSnackbar('Course deleted successfully!', 'success');
      } catch (error: any) {
        console.error(`Error deleting course: ${error.message}`);
        showSnackbar(`Error deleting course: ${error.message}`, 'error');
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
        await axios.patch(`course/${updatedRow.id}`, {
          nameCourse: updatedRow.nameClass,
          open: updatedRow.open,
        });
        showSnackbar('Course updated successfully!', 'success');
        setData((prevData) =>
          prevData.map((row) => (row._id === updatedRow.id ? (updatedRow as ICourse) : row))
        );
        return updatedRow;
      } catch (error: any) {
        console.error(`Error updating course: ${error.message}`);
        showSnackbar(`Error updating course: ${error.message}`, 'error');
        return oldRow;
      }
    },
    []
  );

  const handleRowModesModelChange = useCallback((newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  }, []);

  const columns: GridColDef[] = [
    { field: 'nameClass', headerName: 'Class Name', width: 250, editable: true },
    {
      field: 'open',
      headerName: 'Open',
      type: 'boolean',
      editable: true,
    },
    { field: 'id', headerName: 'Class Id', width: 250, editable: false },
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
    } as GridColDef, // Type assertion here
  ];

  const rows = data.map((row) => ({
    id: row._id,
    nameClass: row.nameCourse,
    open: row.open,
  }));

  return (
    <Box sx={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onProcessRowUpdateError={(error) => showSnackbar(`Error updating row: ${error.message}`, 'error')}
        processRowUpdate={processRowUpdate}
        rowsPerPageOptions={[5, 10, 20]} // Use rowsPerPageOptions
        pageSize={10} // Set a default page size

        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
      />
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DataTableCourses;