import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout,
  Settings,
  ListAlt,
  Search,
  DesignServices,
  Login,
  ExitToApp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import NavigationLink from './NavigationLink';
import MobileNavigationLink from './MobileNavigationLink';
import useAuth from '../../../hooks/useAuth';

const drawerWidth = 240;

const Header = (props) => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const links = isLoggedIn
    ? [
        { title: 'Feed', path: '/', icon: <ListAlt /> },
        { title: 'Search', path: '/search', icon: <Search /> },
        { title: 'Generate', path: '/generate', icon: <DesignServices /> },
      ]
    : [
        { title: 'Feed', path: '/', icon: <ListAlt /> },
        { title: 'Search', path: '/search', icon: <Search /> },
        { title: 'Generate', path: '/generate', icon: <DesignServices /> },
        { title: 'Sign In', path: '/sign-in', icon: <Login /> },
        { title: <b>Get Started</b>, path: '/register', icon: <ExitToApp /> },
      ];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2, fontWeight: 700 }}>
        InfiniteStockPhotos.com
      </Typography>
      <Divider />
      <Stack direction='column' alignItems='center' sx={{ padding: '1em 0' }}>
        <Avatar
          src={user.photoURL}
          referrerPolicy='no-referrer'
          sx={{ width: 75, height: 75 }}
        />
      </Stack>
      <List>
        {links.map(({ title, path, icon }, i) => (
          <MobileNavigationLink key={i} icon={icon} path={path} title={title} />
        ))}
        {isLoggedIn && (
          <>
            <MobileNavigationLink
              path='/manage-account'
              title='Settings'
              icon={<Settings />}
            />
            <ListItem disablePadding>
              <ListItemButton
                onClick={logout}
                sx={{
                  color: 'black',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  padding: '0.2em 1em 0.2em 2em',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      component='nav'
      color='secondary'
      sx={{ position: 'relative', boxShadow: 'none', zIndex: 500 }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'block' },
            fontWeight: 700,
          }}
        >
          InfiniteStockPhotos.com
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {links.map(({ title, path }, i) => (
            <NavigationLink key={i} path={path} title={title} />
          ))}
          {isLoggedIn && (
            <>
              <IconButton onClick={handleClick}>
                <Avatar
                  sx={{ backgroundColor: 'transparent' }}
                  src={user.photoURL}
                  referrerPolicy='no-referrer'
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                hideBackdrop
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 20,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Stack direction='column' alignItems='center' padding='1em'>
                  <Avatar
                    src={user.photoURL}
                    alt={user.name}
                    referrerPolicy='no-referrer'
                    sx={{ width: 75, height: 75 }}
                  />
                  <Typography marginY='0.5em'>
                    {user.name ?? user.email}
                  </Typography>
                  <Typography marginY='0.5em'>
                    {user.role === 'pro'
                      ? 'Credits: 400'
                      : 'Credits: Unlimited'}
                  </Typography>
                </Stack>
                <MenuItem onClick={() => navigate('/manage-account')}>
                  <ListItemIcon>
                    <Settings fontSize='small' />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize='small' />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
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
          display: { xs: 'block', md: 'none' },
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
