import { Card, CardContent, Typography, Button, Link, Box } from '@mui/material'; // Added Card components and Box
// Removed makeStyles import
import { Download } from '@mui/icons-material';
import { memo } from 'react';

// Removed useStyles definition

interface Props {
  attendance: {
    filename: string;
    owner: string;
    filepath: string;
  };
}
const JustificationItem = memo(({ attendance }: Props) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 1, boxShadow: 1 }}> {/* Card for justification item */}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Download sx={{ mr: 1 }} />
          <Typography variant="subtitle1" component="div">
            {attendance.filename}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          By: {attendance.owner}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          sx={{ mt: 2 }}
          component={Link}
          href={attendance.filepath}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Justification
        </Button>
      </CardContent>
    </Card>
  );
});

JustificationItem.displayName = 'JustificationItem';

export default JustificationItem;
