import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import LoginForm from '../Components/Auth/LoginForm';
import AuthGuard from '../utils/AuthGuard';

const SignIn = () => {
  useEffect(() => {
    document.title = 'Sign In';
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <AuthGuard>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          minHeight='80vh'
          width='90vw'
          margin='0 auto'
        >
          <LoginForm />
        </Grid>
      </AuthGuard>
    </Box>
  );
};

export default SignIn;
