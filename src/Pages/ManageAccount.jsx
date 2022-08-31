import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import Modal from '../Components/UI/Modal/Modal';
import userFeatures from '../utils/user-features';
import useAuth from '../hooks/useAuth';
import AuthGuard from '../utils/AuthGuard';

const ManageAccount = () => {
  useEffect(() => {
    document.title = 'Get Started';
  }, []);

  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const { features, upgradeText } = userFeatures('Basic');
  const { user } = useAuth();

  const planModal = (
    <Modal
      key='planModal'
      onClose={() => setShowChangePlanModal(!showChangePlanModal)}
      maxWidth='lg'
    >
      <Typography color='GrayText'>
        Current Membership Level: <b>Basic</b>
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Grid container direction='column' height='100%'>
            <Grid item flexGrow={1}>
              <Typography>Basic (Free):</Typography>
              <Typography>- Add favorites from library</Typography>
              <Typography>- No generation credits</Typography>
            </Grid>
            <Grid item>
              <Button variant='contained' color='secondary' disabled>
                Current Plan
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction='column' height='100%'>
            <Grid item flexGrow={1}>
              <Typography>Basic (Free):</Typography>
              <Typography>- 400 generations/month</Typography>
            </Grid>
            <Grid item>
              <Button variant='contained' color='secondary'>
                Select Plan
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction='column' height='100%'>
            <Grid item flexGrow={1}>
              <Typography>Basic (Free):</Typography>
              <Typography>- Unlimited generations/month</Typography>
            </Grid>
            <Grid item>
              <Button variant='contained' color='secondary'>
                Select Plan
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );

  const passwordModal = (
    <Modal
      key='passwordModal'
      onClose={() => setShowChangePasswordModal(!showChangePasswordModal)}
    >
      <Typography align='center' color='green' fontWeight={700}>
        SUCCESS
      </Typography>
      <Typography align='center'>
        Check your email for a link to change your password.
      </Typography>
    </Modal>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <AuthGuard>
        <Container maxWidth='xl' sx={{ padding: '1em', textAlign: 'center' }}>
          <Stack direciton='column' alignItems='center'>
            <Avatar
              alt='Profile'
              src={user.photoURL}
              referrerPolicy='no-referrer'
              sx={{ width: 120, height: 120 }}
            />
            <Button color='secondary'>Change Profile Picture</Button>
            <Typography color='GrayText'>
              Membership Level: <b>Basic</b>
            </Typography>
            <Typography color='GrayText' variant='subtitle2'>
              {features}
            </Typography>
            <Typography color='primary' variant='subtitle2' gutterBottom>
              {upgradeText}
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setShowChangePlanModal(!showChangePlanModal)}
            >
              Change Plan
            </Button>
            <Typography color='GrayText' marginTop='1em'>
              Security and Password
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              onClick={() =>
                setShowChangePasswordModal(!showChangePasswordModal)
              }
            >
              Change Password
            </Button>
          </Stack>
          <AnimatePresence>{showChangePlanModal && planModal}</AnimatePresence>
          <AnimatePresence>
            {showChangePasswordModal && passwordModal}
          </AnimatePresence>
        </Container>
      </AuthGuard>
    </Box>
  );
};

export default ManageAccount;
