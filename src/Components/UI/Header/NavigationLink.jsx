import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({ children, path }) => {
  return (
    <NavLink
      to={path}
      style={({ isActive }) => ({
        borderBottom: isActive ? '1px solid white' : 'none',
        color: '#fff',
        fontSize: '1rem',
        textDecoration: 'none',
        padding: '0.5em 1em',
      })}
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
