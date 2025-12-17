import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'; // Added Card components
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
// Removed makeStyles import
import React, { memo } from 'react';

interface Props {
  name: string;
  image?: string; // Added image prop
  description?: string; // Added description prop
  toggle?: () => void;
}

// Removed useStyles definition

const CourseItem: React.FC<Props> = memo(({ name, image, description, toggle }: Props) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 1, boxShadow: 3 }}> {/* Added Card with styling */}
      <CardMedia
        component="img"
        height="140"
        image={image || 'https://via.placeholder.com/150'} // Use provided image or a placeholder
        alt={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description || 'No description available for this course.'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={toggle}>
          <CastForEducationIcon sx={{ mr: 1 }} /> View Details
        </Button>
      </CardActions>
    </Card>
  );
});

CourseItem.displayName = 'CourseItem';

export default CourseItem;
