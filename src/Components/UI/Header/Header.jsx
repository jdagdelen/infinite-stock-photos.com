import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavigationLink from './NavigationLink';
import MobileNavigationLink from './MobileNavigationLink';

const drawerWidth = 240;

const Header = (props) => {
  const links = [
    { title: 'Feed', path: '/' },
    { title: 'Sign Up', path: '/sign-up' },
    { title: 'Search', path: '/search' },
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
          {links.map(({ title, path }, i) => (
            <NavigationLink key={i} path={path} title={title} />
          ))}
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
