//------ Path ------ //
//------  /manage-account   ------ //
//------------------ //

import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import { AnimatePresence } from 'framer-motion';

import Modal from '../Components/UI/Modal/Modal';
import userFeatures from '../utils/user-features';
import capitalizeFirstLetter from '../utils/capitalize-first-letter';
import useAuth from '../hooks/useAuth';
import AuthGuard from '../utils/AuthGuard';
import useStripe from '../hooks/useStripe';

const ManageAccount = () => {
  useEffect(() => {
    document.title = 'Manage';
  }, []);

  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, resetPassword } = useAuth();
  const { features, upgradeText } = userFeatures(
    user.role ? user.role : 'basic'
  );
  const {purchase, subscribe} = useStripe();

  const planModal = (
    <Modal
      key='planModal'
      onClose={() => setShowChangePlanModal(!showChangePlanModal)}
      maxWidth='lg'
    >
      <Typography color='GrayText'>
        Current Membership Level:{' '}
        <b>{user.role ? capitalizeFirstLetter(user.role) : 'Basic'}</b>
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Grid container direction='column' height='100%'>
            <Grid item flexGrow={1}>
              <Typography>Basic (Free):</Typography>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                disabled={!user.role}
              >
                {!user.role ? 'Current Plan' : 'Select Plan'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction='column' height='100%'>
            <Grid item flexGrow={1}>
              <Typography>Buy 400 Credits ($4.99):</Typography>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                disabled={user.role === 'premium'}
                onClick={async () => {
                  setShowLoadingModal(true);
                  try {
                    await purchase();
                  } catch (error) {
                    setShowLoadingModal(false);
                  }
                }
                  }
              >
                {user.role === 'premium' ? 'Unlimited' : 'Purchase Credits'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction='column' height='100%'>
            <Grid item flexGrow={1}>
              <Typography>Unlimited ($14.99/month):</Typography>
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                disabled={user.role === 'premium'}
                onClick={async () => {
                  setShowLoadingModal(true);
                  try {
                    await subscribe();
                  } catch (error) {
                    setShowLoadingModal(false);
                  }
                }
                  }
              >
                {user.role === 'premium' ? 'Current Plan' : 'Select Plan'}
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

  const loadingModal = (
    <Modal key='loadingModal' onClose={() => {}}>
      <LinearProgress />
    </Modal>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      {isLoading && <LinearProgress color='secondary' />}
      <AuthGuard>
        <Container maxWidth='xl' sx={{ padding: '1em', textAlign: 'center' }}>
          <Stack direciton='column' alignItems='center'>
            <Avatar
              alt={user.name}
              src={user.photoURL}
              referrerPolicy='no-referrer'
              sx={{ width: 120, height: 120, marginBottom: '1em' }}
            />
            <Typography color='GrayText' variant='subtitle2'>
              {user.name}
            </Typography>
            <Typography color='GrayText' variant='subtitle2'>
              {user.email}
            </Typography>
            <Typography color='BlackText'>
              Membership Level:{' '}
              <b>{user.role ? capitalizeFirstLetter(user.role) : 'Basic'}</b>
            </Typography>
            <Typography color='GrayText' variant='subtitle2'>
              {features}
            </Typography>
            <Typography color='secondary' variant='subtitle2' gutterBottom>
              {upgradeText}
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setShowChangePlanModal(!showChangePlanModal)}
            >
              Buy Credits or Manage Subscription
            </Button>
            <Typography color='GrayText' marginTop='1em'>
              Security and Password
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              onClick={async () => {
                setIsLoading(true);
                try {
                  await resetPassword(user.email);
                  setShowChangePasswordModal(!showChangePasswordModal);
                  setIsLoading(false);
                } catch (error) {
                  setIsLoading(false);
                }
              }}
            >
              Change Password
            </Button>
          </Stack>
          <AnimatePresence>{showChangePlanModal && planModal}</AnimatePresence>
          <AnimatePresence>
            {showChangePasswordModal && passwordModal}
          </AnimatePresence>
          <AnimatePresence>
            {showLoadingModal && loadingModal}
          </AnimatePresence>
          <Typography color='GrayText' marginTop='1em'>
              Contact <b>help@infinitestockphotos.com</b> for any other questions.
          </Typography>
        </Container>
      </AuthGuard>
    </Box>
  );
};

export default ManageAccount;
