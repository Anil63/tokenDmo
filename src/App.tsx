import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Header from './Components/Common/Header';
import Login from './Components/Common/logins/Login';
import Register from './Components/Common/logins/Register';
import PrivateComponent from './Components/PrivateComponent';
import Addproduct from './Components/view/Addproduct';
import Product from './Components/view/Product';
import Updateproduct from './Components/view/Updateproduct';

function App() {
  return (
    <div className="App">
    
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<Product/>} />
        <Route path='/add' element={<Addproduct/>} />
        <Route path='/update/:id' element={<Updateproduct/>} />
        <Route path='/profile' element={<h1>profile Components</h1>} />
        <Route path='/logout' element={<h1>Logout Components</h1>} />
       
        </Route>
        <Route path='/signup' element={<Register/>} />
        <Route path='/login' element={<Login/>} /> 
      </Routes>

     </BrowserRouter>
    </div>
  );
}

export default App;
