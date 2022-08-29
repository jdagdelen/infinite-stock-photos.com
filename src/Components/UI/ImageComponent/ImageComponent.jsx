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
  square,
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

  return (
    <Grid
      ref={forwardedRef}
      item
      flexGrow={1}
      sx={{
        position: 'relative',
        flex: square && { xs: '100%', md: '50%', lg: '25%', xl: '20%' },
        maxWidth: square
          ? { sm: '100%', md: '50%', lg: '25%', xl: '20%' }
          : { xs: '100%', md: '60%' },
        maxHeight: square
          ? { sm: '100%', md: '50%', lg: '25%', xl: '20%' }
          : { xs: '100%', md: '60%' },
      }}
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
