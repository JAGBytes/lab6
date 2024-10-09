import React from 'react'
import NavBar from '../NavBar/NavBar'; 
import Tasks from '../Tasks/Tasks';
import Insight from '../Insights/';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

type Props = {
    idUser : string;
}

function User(props : Props) {
  const {idUser} = props;
  return (
    <BrowserRouter>
    <NavBar/>
        <Routes>
            <Route path="/tasks" element={<Tasks idUser={idUser}/>} />
            <Route path="/insights" element={<Insight idUser={idUser}/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default User