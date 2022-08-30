import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import NavigationLink from './NavigationLink';
import MobileNavigationLink from './MobileNavigationLink';
import useAuth from '../../../hooks/useAuth';
import Modal from '../Modal/Modal';

const drawerWidth = 240;

const Header = (props) => {
  const { isLoggedIn, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const links = isLoggedIn
    ? [
        { title: 'Feed', path: '/' },
        { title: 'Search', path: '/search' },
        { title: 'Generate Images', path: '/generate' },
      ]
    : [
        { title: 'Feed', path: '/' },
        { title: 'Search', path: '/search' },
        { title: 'Generate Images', path: '/generate' },
        { title: 'Membership', path: '/manage-account' },
        { title: 'Sign In', path: '/sign-in' },
        { title: <b>Get Started</b>, path: '/register' },
      ];
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
        {links.map(({ title, path }, i) => (
          <MobileNavigationLink key={i} path={path} title={title} />
        ))}
        {isLoggedIn && (
          <>
            <Button color='secondary' sx={{ color: 'white' }} onClick={logout}>
              Logout
            </Button>
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
        </Box>
        {isLoggedIn && (
          <span>
            <Button
              color='secondary'
              sx={{ color: '#fff', fontSize: '1rem', textDecoration: 'none' }}
              onClick={logout}
            >
              Logout
            </Button>
            <IconButton onClick={() => setShowModal(!showModal)}>
              <Avatar sx={{ backgroundColor: 'transparent' }} />
            </IconButton>
            <AnimatePresence>
              {showModal && (
                <Modal key='modal' onClose={() => setShowModal(!showModal)}>
                  <Typography>Current Membership: Free</Typography>
                  <Button
                    fullWidth
                    color='secondary'
                    variant='contained'
                    onClick={() => navigate('/manage-account')}
                  >
                    Manage Account
                  </Button>
                </Modal>
              )}
            </AnimatePresence>
          </span>
        )}
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
