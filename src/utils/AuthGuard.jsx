import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from '../hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //
const AuthGuard = ({ children, path = '/sign-in' }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoading(true);
      navigate(path, { replace: true });
    } else if (isLoggedIn) {
      const currentPath = window.location.pathname;
      if (currentPath === '/sign-in') navigate('/', { replace: true });

      setIsLoading(true);
    } else {
      navigate('/sign-in', { replace: true });
      setIsLoading(true);
    }
  }, [isLoggedIn, navigate, path]);

  return isLoading ? (
    children
  ) : (
    <LinearProgress
      color='secondary'
      sx={{ width: '100%', position: 'absolute', top: 0, left: 0 }}
    />
  );
};

export default AuthGuard;
