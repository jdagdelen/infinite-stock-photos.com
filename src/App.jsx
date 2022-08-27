import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/UI/Header/Header';
import Feed from './Pages/Feed';
import Search from './Pages/Search';
import SignIn from './Pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <div style={{ overflowX: 'hidden' }}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
