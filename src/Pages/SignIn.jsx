import { Container, Grid, Paper } from '@mui/material';
import React from 'react';

const SignIn = () => {
  return (
    <Container maxWidth='xl' sx={{ padding: '0 1em' }}>
      <Paper>
        <Grid
          direction='column'
          justifyContent='center'
          alignItems='center'
        ></Grid>
      </Paper>
    </Container>
  );
};

export default SignIn;
