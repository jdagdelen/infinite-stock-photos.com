import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  TextField,
  Button,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';

import useAuth from '../../hooks/useAuth';
import Modal from '../UI/Modal/Modal';

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    errorMessage,
    showSuccessModal,
    setShowSuccessModal,
    firebaseGoogleSignIn,
    isLoading,
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      <AnimatePresence>
        {showSuccessModal && (
          <Modal
            key='passwordModal'
            onClose={() => setShowSuccessModal(!showSuccessModal)}
          >
            <Typography align='center' color='green' fontWeight={700}>
              SUCCESS
            </Typography>
            <Typography align='center'>
              We have sent you a verification email
            </Typography>
          </Modal>
        )}
      </AnimatePresence>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register(email, password);
          navigate('/');
        }}
      >
        <Card sx={{ position: 'relative' }}>
          {isLoading && (
            <LinearProgress
              color='secondary'
              sx={{ position: 'absolute', top: 0, width: '100%' }}
            />
          )}
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
                  backgroundColor: '#f50057',
                }}
              />
              <TextField
                variant='outlined'
                color='secondary'
                label='Email'
                type='email'
                required
                pattern='^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$'
                fullWidth
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                error={errorMessage !== ''}
              />
              <TextField
                variant='outlined'
                color='secondary'
                label='Password'
                type='password'
                fullWidth
                required
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                error={errorMessage !== ''}
              />
              <Typography color='GrayText' gutterBottom>
                Already have an Account?{' '}
                <b
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/sign-in')}
                >
                  Sign In.
                </b>
              </Typography>
              {errorMessage !== '' && (
                <Typography color='red'>{errorMessage}</Typography>
              )}
            </Stack>
          </CardContent>
          <Button
            variant='contained'
            color='error'
            fullWidth
            sx={{ borderRadius: 0 }}
            startIcon={<Google />}
            disableElevation
            type='button'
            onClick={() => firebaseGoogleSignIn('register')}
          >
            Use Google Account
          </Button>
          <Button
            variant='contained'
            color='secondary'
            fullWidth
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            disableElevation
            type='submit'
          >
            Sign Up
          </Button>
        </Card>
      </form>
    </Grid>
  );
};

export default RegisterForm;
