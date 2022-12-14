import React, { useState } from 'react';
import {
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

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { login, errorMessage, firebaseGoogleSignIn, isLoading } = useAuth();

  const forgotPasswordModal = (
    <Modal onClose={() => setShowModal(!showModal)}>
      <Typography variant='h4' align='center'>
        Forgot Password!
      </Typography>
    </Modal>
  );

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await login(email, password, () => navigate('/', { replace: true }));
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
            {errorMessage !== '' && (
              <Typography color='red'>{errorMessage}</Typography>
            )}
            <Typography color='GrayText'>
              No Account?{' '}
              <b
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/register')}
              >
                Sign up here.
              </b>
            </Typography>
            <Button color='secondary' onClick={() => setShowModal(!showModal)}>
              Forgot Password?
            </Button>
          </Stack>
        </CardContent>
        <Button
          variant='contained'
          color='secondary'
          fullWidth
          sx={{ borderRadius: 0 }}
          disableElevation
          type='submit'
        >
          Sign In
        </Button>
        <Button
          variant='contained'
          color='error'
          fullWidth
          sx={{ borderRadius: 0 }}
          startIcon={<Google />}
          disableElevation
          type='button'
          onClick={async () => {
            await firebaseGoogleSignIn('login', () =>
              navigate('/', { replace: true })
            );
          }}
        >
          Sign In With Google
        </Button>
      </Card>
      <AnimatePresence>{showModal && forgotPasswordModal}</AnimatePresence>
    </form>
  );
};

export default LoginForm;
