import emailjs from '@emailjs/browser';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Container,
  Box,
} from '@mui/material';

function Contact() {
  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_volqe5l',
        'template_aontufj',
        e.currentTarget,
        'FHfQDwFtJWcIVPW4C'
      )
      .then(
        (result) => {
          console.log(result.text);
          e.currentTarget.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Box component="section" id="contact" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Have questions? We&apos;d love to hear from you.
          </Typography>
        </Box>
        <Card sx={{ p: 4, borderRadius: 2 }}>
          <CardContent>
            <form onSubmit={sendEmail}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    placeholder="Enter your name"
                    fullWidth
                    variant="outlined"
                    name="user_name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    placeholder="Enter your email"
                    fullWidth
                    variant="outlined"
                    name="user_email"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    placeholder="How can we help?"
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                    name="message"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    type="submit"
                    sx={{ py: 1.5 }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Contact;