import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const btn = {
    initial: {
      opacity: 0,
      y: '20vh',
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: '20vh',
    },
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          variants={btn}
          key='ScrollToTop'
          id='ScrollToTop'
          initial='initial'
          animate='animate'
          exit='exit'
          sx={{
            position: 'fixed',
            top: 'auto',
            right: 30,
            left: 'auto',
            bottom: 30,
          }}
        >
          <Fab color='secondary' size='small' onClick={scrollToTop}>
            <KeyboardArrowUp />
          </Fab>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
