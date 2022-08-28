import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Components/UI/Header/Header';
import Feed from './Pages/Feed';
import GenerateImages from './Pages/GenerateImages';
import Register from './Pages/Register';
import Search from './Pages/Search';
import SignIn from './Pages/SignIn';

function App() {
  return (
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
