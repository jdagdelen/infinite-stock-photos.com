import React from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ onChange, value, onClick }) => {
  return (
    <form onSubmit={onClick}>
      <Container maxWidth='xl' sx={{ padding: '1em 1em' }}>
        <Grid container direction='row' wrap='nowrap' alignItems='center'>
          <Grid item flexGrow={1}>
            <TextField
              value={value}
              onChange={onChange}
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
              onClick={onClick}
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
    </form>
  );
};

export default SearchBar;
