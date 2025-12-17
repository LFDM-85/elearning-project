import { Grid, Typography, Container, Box } from '@mui/material';
import CourseCard from '../../../shared/components/UI/CourseCard';

const courses = [
  {
    id: 1,
    title: 'Mathematics I',
    image:
      'https://images.unsplash.com/photo-1632571401005-458e9d244591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    description: 'Master the basics of Mathematics with our comprehensive level 1 course.',
  },
  {
    id: 2,
    title: 'History',
    image:
      'https://images.unsplash.com/photo-1491841651911-c44c30c34548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Explore the rich History of Portugal in this introductory module.',
  },
  {
    id: 3,
    title: 'Chemistry I',
    image:
      'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=717&q=80',
    description: 'Dive into the world of Organic Chemistry.',
  },
];

function Courses() {
  return (
    <Box component="section" id="courses" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold" color="text.primary">
            Popular Courses
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Explore our highest-rated courses designed for your success.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <CourseCard
                image={course.image}
                title={course.title}
                description={course.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Courses;