import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/UI/Header/Header';
import { AuthProvider } from './contexts/AuthContext';
import Feed from './Pages/Feed';
import GenerateImages from './Pages/GenerateImages';
import ManageAccount from './Pages/ManageAccount';
import Register from './Pages/Register';
import Search from './Pages/Search';
import SignIn from './Pages/SignIn';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme(
  {
  palette: {
    type: 'light',
    primary: {
      main: '#f1f1f1',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#ffffff',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
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
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
