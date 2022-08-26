import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/UI/Header';
import Feed from './Pages/Feed';
import SignIn from './Pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
