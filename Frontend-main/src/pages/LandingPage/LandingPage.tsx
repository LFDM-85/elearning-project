import Header from '../../shared/components/UI/Header';
import Hero from './Sections/Hero';
import AboutUs from './Sections/AboutUs';
import Courses from './Sections/Courses';
import Contact from './Sections/Contact';
import Footer from './Sections/Footer';
import CssBaseline from '@mui/material/CssBaseline';

export const LandingPage = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Hero />
      <AboutUs />
      <Courses />
      <Contact />
      <Footer />
    </>
  );
};
