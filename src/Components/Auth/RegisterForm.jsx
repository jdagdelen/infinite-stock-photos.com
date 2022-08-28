import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      minHeight='80vh'
      sx={{
        justifyContent: { xs: null, md: 'center' },
      }}
    >
      <Card>
        <CardContent>
          <Stack direction='column' alignItems='center' gap='1em'>
            <Typography variant='h5' color='GrayText'>
              Get Started
            </Typography>
            <Typography color='GrayText' align='center'>
              Free stock photos from the multiverse, generated with AI
            </Typography>
            <Divider
              variant='middle'
              sx={{
                height: 3,
                width: 150,
                borderRadius: 10,
                backgroundColor: '#9B27B0BA',
              }}
            />
            <TextField
              variant='outlined'
              color='secondary'
              label='Email'
              fullWidth
            />
            <TextField
              variant='outlined'
              color='secondary'
              label='Password'
              fullWidth
            />
            <Typography color='GrayText'>
              Already have an Account?{' '}
              <b
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/sign-in')}
              >
                Sign In.
              </b>
            </Typography>
          </Stack>
        </CardContent>
        <Button
          variant='contained'
          color='secondary'
          fullWidth
          sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          disableElevation
        >
          Sign In
        </Button>
      </Card>
    </Grid>
  );
};

export default RegisterForm;
