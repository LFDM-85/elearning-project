import { Card, CardContent, Typography, Button, Link, Box } from '@mui/material'; // Added Card components and Box
// Removed makeStyles import
import { Work } from '@mui/icons-material';
import React, { memo } from 'react';

type Props = {
  filename: string;
  filepath: string;
  owner: string;
};

// Removed useStyles definition

const WorkItem = memo((work: Props) => {
  return (
    <Card sx={{ maxWidth: 300, margin: 1, boxShadow: 1 }}> {/* Card for work item */}
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Work sx={{ mr: 1 }} />
          <Typography variant="subtitle1" component="div">
            {work.filename}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          By: {work.owner}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          sx={{ mt: 2 }}
          component={Link}
          href={work.filepath}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </Button>
      </CardContent>
    </Card>
  );
});

WorkItem.displayName = 'WorkItem';

export default WorkItem;
