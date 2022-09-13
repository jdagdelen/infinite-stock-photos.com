import { useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ReactGA from 'react-ga4';

import Header from './Components/UI/Header/Header';
import { AuthProvider } from './contexts/AuthContext';
import Feed from './Pages/Feed';
import GenerateImages from './Pages/GenerateImages';
import ManageAccount from './Pages/ManageAccount';
import Register from './Pages/Register';
import Search from './Pages/Search';
import SignIn from './Pages/SignIn';
import { FeedProvider } from './contexts/FeedContext';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#f9c449',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#ffffff',
    },
  },
});

const TRACKING_ID = process.env.REACT_APP_ANALYTICS_ID;
ReactGA.initialize(TRACKING_ID);
ReactGA.send('pageview');

function App() {
  useEffect(() => {
    document.title = 'Infinite Stock Photos';
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <FeedProvider>
          <BrowserRouter>
            <div style={{ overflow: 'hidden' }}>
              <CssBaseline />
              <Header />
              <Routes>
                <Route path='/' element={<Feed />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/register' element={<Register />} />
                <Route path='/search' element={<Search />} />
                <Route path='/generate' element={<GenerateImages />} />
                <Route path='/manage-account' element={<ManageAccount />} />
              </Routes>
            </div>
          </BrowserRouter>
        </FeedProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
