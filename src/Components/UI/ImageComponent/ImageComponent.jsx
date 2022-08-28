import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Stack,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { FavoriteBorder, StarBorder } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import PlaceHolderImage from '../../../assets/product-image-placeholder.svg';
import SocialShare from './SocialShare';

const ImageComponent = ({
  image,
  description,
  forwardedRef,
  isLoading,
  index,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const info = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const images = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <Grid
      ref={forwardedRef}
      item
      sx={{
        position: 'relative',
        flex: { xs: '100%', md: '50%', lg: '25%', xl: '20%' },
        maxWidth: { sm: '100%', md: '50%', lg: '25%', xl: '20%' },
        maxHeight: { sm: '100%', md: '50%', lg: '25%', xl: '20%' },
      }}
      variants={images}
      initail='initial'
      animate='animate'
      exit='hidden'
      component={motion.div}
      onMouseOver={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <AnimatePresence>
        {showInfo && image && (
          <motion.div
            key={image}
            variants={info}
            initial='initial'
            animate='animate'
            exit='exit'
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              padding: '0.4em',
              position: 'absolute',
              top: 'auto',
              bottom: 7,
              width: '100%',
              color: 'white',
            }}
          >
            <Box>
              {description && <Typography>{description}</Typography>}

              <Stack direction='row' justifyContent='space-between'>
                <SocialShare />
                <Stack direction='row'>
                  <IconButton>
                    <FavoriteBorder htmlColor='white' />
                  </IconButton>
                  <IconButton>
                    <StarBorder htmlColor='white' />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      {isLoading && (
        <CircularProgress
          color='secondary'
          sx={{
            position: 'absolute',
            top: '44%',
            left: '44%',
          }}
        />
      )}
      <img src={image ?? PlaceHolderImage} alt={image} width='100%' />
    </Grid>
  );
};

export default ImageComponent;
