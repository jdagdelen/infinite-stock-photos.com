import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

const MobileNavigationLink = ({ children, path }) => {
  return (
    <ListItem disablePadding>
      <NavLink
        to={path}
        style={({ isActive }) => ({
          borderLeft: isActive ? '5px solid black' : 'none',
          color: 'black',
          fontSize: '1rem',
          textDecoration: 'none',
          padding: '0.5em 1em',
        })}
      >
        <ListItemButton sx={{ textAlign: 'center' }}>
          <ListItemText primary={children} />
        </ListItemButton>
      </NavLink>
    </ListItem>
  );
};

export default MobileNavigationLink;
