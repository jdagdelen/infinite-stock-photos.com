import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const MobileNavigationLink = ({ path, title, icon }) => {
  return (
    <ListItem disablePadding>
      <NavLink
        to={path}
        style={({ isActive }) => ({
          backgroundColor: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)',
          color: 'black',
          fontSize: '1rem',
          textDecoration: 'none',
          padding: '0.2em 1em',
          textAlign: 'left',
          width: '100%',
        })}
      >
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
};

export default MobileNavigationLink;
