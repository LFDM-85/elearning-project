import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'; // Added Card components
// Removed makeStyles import
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import { memo } from 'react';

type Props = {
  summary: string;
  description: string;
  // assessment: IAssessment; // Keep if needed for future enhancements
};

// Removed useStyles definition

const LectureItem = memo(({ summary, description }: Props) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 1, boxShadow: 3 }}> {/* Added Card with styling */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {summary}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description || 'No description available for this lecture.'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <DeveloperBoardIcon sx={{ mr: 1 }} /> View Materials
        </Button>
      </CardActions>
    </Card>
  );
});

LectureItem.displayName = 'LectureItem';

export default LectureItem;
