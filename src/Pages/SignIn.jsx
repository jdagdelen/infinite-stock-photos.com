import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import LoginForm from '../Components/Auth/LoginForm';

const SignIn = () => {
  useEffect(() => {
    document.title = 'Sign In';
  }, []);

  return (
    <>
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
    </>
  );
};

export default SignIn;
