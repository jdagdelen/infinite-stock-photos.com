import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container } from '@mui/material';

const ZoomedImage = ({ image, onClose }) => {
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
        zIndex: 900,
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
        sx={{
          padding: '0 1em',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={image}
          alt={image}
          width='90%'
          style={{
            zIndex: 1000,
            display: 'block',
            maxHeight: '90%',
            maxWidth: '90%',
          }}
        />
      </Container>
    </Box>
  );
};

export default ZoomedImage;
