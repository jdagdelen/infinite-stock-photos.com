import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const Header = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2, fontWeight: 700 }}>
        InfiniteStockPhotos.com
      </Typography>
      <Divider />
      <List>
        <NavLink to='/'>
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary='Feed' />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </Box>
  );

  return (
    <AppBar
      component='nav'
      color='secondary'
      sx={{ position: 'relative', boxShadow: 'none' }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          sx={{
            flexGrow: 1,
            display: { xs: 'none', sm: 'block' },
            fontWeight: 700,
          }}
        >
          InfiniteStockPhotos.com
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NavLink
            to='/'
            style={({ isActive }) => ({
              borderBottom: isActive ? '1px solid white' : 'none',
              color: '#fff',
              fontSize: '1rem',
              textDecoration: 'none',
              padding: '0.5em 1em',
            })}
          >
            Feed
          </NavLink>
          <NavLink
            to='/sign-in'
            style={({ isActive }) => ({
              borderBottom: isActive ? '1px solid white' : 'none',
              color: '#fff',
              fontSize: '1rem',
              textDecoration: 'none',
              padding: '0.5em 1em',
            })}
          >
            Sign in
          </NavLink>
        </Box>
      </Toolbar>
      <Drawer
        container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
