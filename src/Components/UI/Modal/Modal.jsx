import React from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Card,
  CardContent,
  Container,
  LinearProgress,
} from '@mui/material';

const Modal = ({ children, onClose, maxWidth = 'sm', showLoader = false }) => {
  const backdrop = {
    initial: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
    animate: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    exit: {
      backgroundColor: 'rgba(0,0,0,0)',
    },
  };
  const modal = {
    initial: {
      x: '100vw',
    },
    animate: {
      x: 0,
    },
    exit: {
      x: '-100vw',
    },
  };
  return (
    <Box
      component={motion.div}
      variants={backdrop}
      initial='initial'
      animate='animate'
      exit='exit'
      key='backdrop'
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <Container
        key='modal'
        component={motion.div}
        variants={modal}
        initial='initial'
        animate='animate'
        exit='exit'
        sx={{ padding: '0 1em' }}
        maxWidth={maxWidth}
        onClick={(e) => e.stopPropagation()}
      >
        <Card sx={{ position: 'relative' }}>
          {showLoader && (
            <LinearProgress
              color='secondary'
              sx={{ position: 'absolute', top: 0, width: '100%' }}
            />
          )}
          <CardContent>{children}</CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Modal;
