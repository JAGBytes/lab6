import NavBar from './components/NavBar/NavBar'; 
import './App.css';
import Tasks from './components/Tasks/Tasks';
import Insight from './components/Insights/';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
      <NavBar  />
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/insights" element={<Insight />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;