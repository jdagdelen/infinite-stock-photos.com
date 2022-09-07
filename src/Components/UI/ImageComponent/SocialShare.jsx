import {
  Close,
  Facebook,
  Instagram,
  Share,
  Twitter,
} from '@mui/icons-material';
import { Grow, IconButton, Paper, Popper, Stack } from '@mui/material';
import React from 'react';

const SocialShare = ({
  anchorEl,
  setAnchorEl,
  open,
  setOpen,
  placement,
  setPlacement,
}) => {
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: '0 50%' }}
            timeout={350}
          >
            <Paper sx={{ borderRadius: 15 }}>
              <Stack direction='row'>
                <IconButton color='info'>
                  <Twitter />
                </IconButton>
                <IconButton color='info'>
                  <Facebook />
                </IconButton>
                <IconButton color='secondary'>
                  <Instagram />
                </IconButton>
              </Stack>
            </Paper>
          </Grow>
        )}
      </Popper>
      <IconButton onClick={handleClick('right')} color='warning'>
        {open ? <Close /> : <Share />}
      </IconButton>
    </>
  );
};

export default SocialShare;
