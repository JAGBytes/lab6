import React from 'react';
import NavBar from './components/NavBar/NavBar'; 
import './App.css';
import Tasks from './components/Tasks/Tasks';
import Insight from './components/Insights/'

function App() {

  const handleSelect = (page: string) => {
    console.log(`Página seleccionada: ${page}`);
  };

  return (
    <>
      <NavBar onSelect={handleSelect} /> 
      <Tasks/>
    </>
  );
};

export default App;