import React, { useState } from 'react';
import { Grid, Box, Typography, Stack, IconButton } from '@mui/material';
import { FavoriteBorder, Send, StarBorder } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import PlaceHolderImage from '../../../assets/product-image-placeholder.svg';

const ImageComponent = ({ image, description }) => {
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
      item
      sx={{ position: 'relative' }}
      onMouseOver={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <img src={image ?? PlaceHolderImage} alt='Place Holder' />
      <AnimatePresence>
        {showInfo && (
          <motion.div
            key={image}
            variants={info}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            <Box
              sx={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                padding: '0.4em',
                position: 'absolute',
                top: 'auto',
                bottom: '8px',
                width: '100%',
                color: 'white',
              }}
            >
              {description && <Typography>{description}</Typography>}

              <Stack direction='row' justifyContent='space-between'>
                <Stack direction='row'>
                  <IconButton>
                    <Send htmlColor='white' />
                  </IconButton>
                  <IconButton>
                    <FavoriteBorder htmlColor='white' />
                  </IconButton>
                </Stack>
                <IconButton>
                  <StarBorder htmlColor='white' />
                </IconButton>
              </Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Grid>
  );
};

export default ImageComponent;
