
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Mainpage from './mainproject/Mainpage';
import Login from './mainproject/Login';
import Signup from './mainproject/Signup';


import Adminlogin from './mainproject/Adminlogin';

import Registeredusers from './mainproject/Registeredusers';

import Update2 from './mainproject/Update2';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/admin/registered" element={<Registeredusers/>}/>
        <Route path="/adminlogin" element={<Adminlogin/>}/>
   
        <Route path="/updateyourself" element={<Update2/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
