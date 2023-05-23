import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Admin/Dashboard';
import DataUser from './pages/DataUser/DataUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<Dashboard />} />

        <Route path='/dataUser' element={<DataUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
