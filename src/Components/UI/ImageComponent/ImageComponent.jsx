import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Stack,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { FavoriteBorder, StarBorder } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

import PlaceHolderImage from '../../../assets/product-image-placeholder.svg';
import SocialShare from './SocialShare';
import ZoomedImage from './ZoomedImage';

const ImageComponent = ({
  image,
  description,
  forwardedRef,
  isLoading,
  square,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showZoomed, setShowZoomed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
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
        flex: square
          ? { xs: '100%', md: '50%', lg: '25%', xl: '20%' }
          : { xs: '100%', md: '1 0 20%' },
        maxWidth: square
          ? { sm: '100%', md: '50%', lg: '25%', xl: '20%' }
          : { xs: '100%', md: '25vw' },
        maxHeight: square
          ? height === 0
            ? { sm: '100%', md: '50%', lg: '25%', xl: '20%' }
            : height
          : { xs: '100%' },
      }}
      onMouseOver={() => setShowInfo(true)}
      onMouseLeave={() => {
        setShowInfo(false);
        setOpen(false);
      }}
    >
      <AnimatePresence>
        {showInfo && image && isLoaded && (
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
              bottom: 0,
              width: '100%',
              color: 'white',
            }}
          >
            <Box>
              {description && <Typography>{description}</Typography>}

              <Stack direction='row' justifyContent='space-between'>
                <SocialShare
                  anchorEl={anchorEl}
                  setAnchorEl={setAnchorEl}
                  open={open}
                  setOpen={setOpen}
                  placement={placement}
                  setPlacement={setPlacement}
                  handleClick={handleClick}
                />
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
      {((!image && isLoading) || (!image && !isLoaded)) && (
        <LinearProgress
          color='secondary'
          sx={{
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
          }}
        />
      )}
      <img
        src={image && isLoaded ? image : PlaceHolderImage}
        alt=''
        onClick={() => isLoaded && setShowZoomed(!showZoomed)}
        onLoad={({ target }) => {
          setHeight(target.height);
          setIsLoaded(true);
        }}
        width='100%'
      />
      <AnimatePresence>
        {showZoomed && image && (
          <ZoomedImage
            image={image}
            onClose={() => setShowZoomed(!showZoomed)}
          />
        )}
      </AnimatePresence>
    </Grid>
  );
};

export default ImageComponent;
