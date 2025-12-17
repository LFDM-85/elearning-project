import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material'; // Added Card components and Grid
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
// Removed makeStyles import
import useGetAllUsersData from '../hooks/useGetAllUsersData';
import axios from '../../interceptors/axios';
import { ICourse, IUser } from '../interfaces/interfaces';
import PeopleItem from './PeopleItem';
import { memo, useCallback } from 'react';
import React from 'react';

type Props = {
  name: string;
  id: string;
};

// Removed useStyles definition

const EditCourseItem = memo(({ name, id }: Props) => {
  const { data } = useGetAllUsersData();
  // Removed classesStyles = useStyles();

  const toggleHandler = useCallback(async (people: IUser) => {
    // Refresh data after update, or use optimistic update
    // For now, simply log and rely on re-fetch from parent or other mechanisms
    try {
      const isUserInCourse = people.courses.some((aclass) => aclass._id === id);
      if (isUserInCourse) {
        await axios.patch(`users/${people._id}/remove-course/${id}`);
        console.log(`Removed ${people.name} from course ${name}`);
      } else {
        await axios.patch(`users/${people._id}/add-course/${id}`);
        console.log(`Added ${people.name} to course ${name}`);
      }
      // You might want to trigger a re-fetch of allUsersData here if it's not handled globally
    } catch (error) {
      console.error('Error toggling course for user:', error);
    }
  }, [id, name]); // Added id and name to dependencies

  const renderPeople = data ? (
    <Grid container spacing={1} sx={{ mt: 2 }}> {/* Grid for people items */}
      {data.map((people) => {
        if (
          people.roles.includes('student') ||
          people.roles.includes('professor')
        ) {
          return (
            <Grid item xs={12} sm={6} md={4} key={people._id}>
              <PeopleItem
                id={people._id}
                name={people.name}
                role={people.roles}
                icontoggle={people.courses.find(
                  (item) => item._id === id // Changed from nameCourse to _id for accurate comparison
                )}
                courseToggle={() => toggleHandler(people)}
              />
            </Grid>
          );
        }
        return null;
      })}
    </Grid>
  ) : (
    <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2 }}>No data found</Typography> // Replaced h3
  );

  return (
    <Card sx={{ minWidth: 275, mb: 2, boxShadow: 3 }}> {/* Card for the course item */}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CastForEducationIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Course ID: {id}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Associated People:
        </Typography>
        {renderPeople}
      </CardContent>
    </Card>
  );
});

EditCourseItem.displayName = 'EditCourseItem';
export default EditCourseItem;
