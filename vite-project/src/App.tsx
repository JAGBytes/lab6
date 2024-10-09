import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './components/Register/index'
import Login from './components/Login/index'
import User from './components/User/index';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
      </Routes>
  </BrowserRouter>
 
  );
};

export default App;