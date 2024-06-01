// import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';

import { useState } from 'react';

import {
  BrowserRouter as Router,

  Routes,
  Route,
  BrowserRouter,

} from "react-router-dom";
import Signup from './components/Signup';
import Shabdarth from './components/Shabdarth';

import PoetryState from './Context/poetry/poetryState';
// import ShabdKosh from './ShabdKosh';
import ShabdKosh from './components/ShabdKosh';
import MoreDetails from './components/MoreDetails';
import Cart from './components/Cart';
import DPS from './components/DPS';


function App() {


  const [mode, setmode] = useState('dark');

  const toggle = () => {

    if (mode === 'dark') {
      setmode('light');
      document.body.style.backgroundColor = '#28282B';
    }

    else {

      setmode('dark');
      document.body.style.backgroundColor = '#EADDCA';
    }

  }
  return (
    <>

      <PoetryState>

        <BrowserRouter>



          <Routes>


            <Route path='/' element={<Homepage toggle={toggle} mode={mode} />} />

            <Route path='/Login' element={<Login />} />

            <Route path='/Homepage' element={<Homepage toggle={toggle} mode={mode} />} />

            <Route path='/Signup' element={<Signup />} />

            <Route path='/Shabdarth' element={<Shabdarth />} />

            <Route path='/Shabdkosh' element={<ShabdKosh />} />



            <Route path='/Moredetails' element={<MoreDetails />} />

            <Route path='/Cart' element={<Cart />} />



          </Routes>

        </BrowserRouter>

      </PoetryState>
    </>
  );
}

export default App;
