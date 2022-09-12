import React from 'react';
import { Download } from '@mui/icons-material';
import { Button, Grow, IconButton, Paper, Popper, Stack } from '@mui/material';
import { saveAs } from 'file-saver';

const SocialShare = ({
  anchorEl,
  setAnchorEl,
  open,
  setOpen,
  placement,
  setPlacement,
  handleClick,
  url,
}) => {
  const downloadPNG = () => {
    saveAs(url, 'image.png');
  };

  const downloadJPG = () => {
    saveAs(url, 'image.jpg');
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
                <Button
                  sx={{ borderRadius: '35%' }}
                  color='secondary'
                  onClick={downloadPNG}
                >
                  PNG
                </Button>
                <Button
                  sx={{ borderRadius: '35%' }}
                  color='secondary'
                  onClick={downloadJPG}
                >
                  JPEG
                </Button>
              </Stack>
            </Paper>
          </Grow>
        )}
      </Popper>
      <IconButton onClick={handleClick('right')}>
        <Download htmlColor='white' />
      </IconButton>
    </>
  );
};

export default SocialShare;
