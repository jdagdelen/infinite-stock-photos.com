import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';

import AboutSection from '../Components/UI/AboutSection/AboutSection';
import RegisterForm from '../Components/Auth/RegisterForm';

const Register = () => {
  useEffect(() => {
    document.title = 'Get Started';
  }, []);

  return (
    <Container maxWidth='xl' sx={{ padding: '0 1em' }}>
      <Grid container direction='row'>
        <Grid item xs={12} md={6}>
          <AboutSection />
        </Grid>
        <Grid item xs={12} md={6}>
          <RegisterForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
