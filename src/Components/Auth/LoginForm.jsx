import React from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent>
        <Stack direction='column' alignItems='center' gap='1em'>
          <Typography variant='h6' color='GrayText'>
            Sign In
          </Typography>
          <Typography color='GrayText' align='center'>
            Free stock photos from the multiverse, generated with AI
          </Typography>
          <Divider
            variant='middle'
            sx={{
              height: 3,
              width: 100,
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
            No Account?{' '}
            <b
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/register')}
            >
              Sign up here.
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
  );
};

export default LoginForm;
