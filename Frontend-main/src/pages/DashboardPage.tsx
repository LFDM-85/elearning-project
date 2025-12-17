import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Avatar,
  Stack,
  Button
} from '@mui/material';
import {
  School,
  Assignment,
  EventAvailable,
  TrendingUp,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useGetCoursesCurrUserEmailData from '../shared/hooks/useGetCoursesByCurrUserEmailData';
import { ICourse, ILectures } from '../shared/interfaces/interfaces';
import useAuth from '../shared/hooks/useAuth';

export const DashboardPage = () => {
  const { courseData } = useGetCoursesCurrUserEmailData();
  const authCtx = useAuth();
  const navigate = useNavigate();

  // Calculate Stats
  const totalCourses = courseData?.length || 0;
  
  let totalLectures = 0;
  let finishedLectures = 0;

  courseData?.forEach((course: ICourse) => {
    if (course.lecture) {
      totalLectures += course.lecture.length;
      finishedLectures += course.lecture.filter((l: ILectures) => l.finished).length;
    }
  });

  const progress = totalLectures > 0 ? (finishedLectures / totalLectures) * 100 : 0;

  const StatCard = ({ icon, title, value, color }: any) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        bgcolor: 'white',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 4,
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
          borderColor: color,
        }
      }}
    >
      <Box>
        <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={800} color="text.primary">
          {value}
        </Typography>
      </Box>
      <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 56, height: 56 }}>
        {icon}
      </Avatar>
    </Paper>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Welcome back, {authCtx.user?.name}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here is what&apos;s happening with your courses today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<School />}
            title="Enrolled Courses"
            value={totalCourses}
            color="#4F46E5" // Indigo
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<EventAvailable />}
            title="Total Lectures"
            value={totalLectures}
            color="#10B981" // Emerald
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Assignment />}
            title="Completed Lectures"
            value={finishedLectures}
            color="#F59E0B" // Amber
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<TrendingUp />}
            title="Overall Progress"
            value={`${Math.round(progress)}%`}
            color="#EC4899" // Pink
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Recent Courses */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              Your Courses
            </Typography>
            <Button endIcon={<ArrowForward />} onClick={() => navigate('/my/courses')}>
              View All
            </Button>
          </Box>
          <Stack spacing={2}>
            {courseData?.slice(0, 3).map((course: ICourse) => (
              <Paper
                key={course._id}
                elevation={0}
                sx={{
                  p: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'background.paper',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }
                }}
              >
                <Avatar
                  src={`https://picsum.photos/seed/${course._id}/100/100`}
                  variant="rounded"
                  sx={{ width: 80, height: 80 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {course.nameCourse}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.random() * 60 + 20} // Mock progress for demo
                      sx={{ width: '60%', height: 6, borderRadius: 3 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {Math.floor(Math.random() * 60 + 20)}% Complete
                    </Typography>
                  </Box>
                </Box>
                <Button variant="outlined" onClick={() => navigate('/my/lecture')}>
                  Continue
                </Button>
              </Paper>
            ))}
            {courseData?.length === 0 && (
               <Paper sx={{ p: 4, textAlign: 'center' }}>
                 <Typography color="text.secondary">You are not enrolled in any courses yet.</Typography>
               </Paper>
            )}
          </Stack>
        </Grid>

        {/* Side Panel: Upcoming / Notifications (Mock for now) */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
            Upcoming Deadlines
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 0,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            {[
              { title: 'Database Design Project', course: 'Database Systems', date: 'Tomorrow', color: 'error.main' },
              { title: 'React Hooks Quiz', course: 'Frontend Masterclass', date: 'In 2 days', color: 'warning.main' },
              { title: 'NestJS Middleware', course: 'Backend Advanced', date: 'Next Week', color: 'success.main' },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  p: 2.5,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  gap: 2,
                  '&:last-child': { borderBottom: 0 }
                }}
              >
                <Box
                  sx={{
                    width: 4,
                    height: 40,
                    bgcolor: item.color,
                    borderRadius: 2
                  }}
                />
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.course} • {item.date}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
