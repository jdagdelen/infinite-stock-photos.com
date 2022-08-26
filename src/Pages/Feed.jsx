import React from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import FeedGrid from '../Components/UI/FeedGrid/FeedGrid';

const Feed = () => {
  return (
    <>
      <Container maxWidth='xl' sx={{ padding: '1em 1em' }}>
        <Grid container direction='row' alignItems='center'>
          <Grid item flexGrow={1}>
            <TextField
              placeholder='Search'
              variant='outlined'
              color='secondary'
              fullWidth
              size='small'
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='secondary'
              sx={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                padding: '8.1px 14px',
              }}
              disableElevation
            >
              <Search />
            </Button>
          </Grid>
        </Grid>
      </Container>

      <FeedGrid />
    </>
  );
};

export default Feed;
