import React, { useEffect,useState } from 'react'
import NavBar  from '../NavBar/NavBar'; 
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getUser } from '../Services/Service'; 
import { User } from '../Services/UserObj';


function UserRouter ()  {

  const [user, setUser] = useState<User>();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const { idUser } = useParams();

  useEffect(() => {
    if (idUser) {
      getUserTask();
    }
  }, [idUser]);

  const getUserTask = async () => {
    try {
      if(idUser) {
        const answer = await getUser(idUser); // Asumiendo que getUser es una llamada API que devuelve los datos del usuario
        if (answer && answer.data) {
          setUser(answer.data); // Actualizamos el estado de user
          setUserName(answer.data.username || '');
          setEmail(answer.data.email || '');
        }
      }   
    } catch (error: any) {
      if (error.response) {
          console.error("Error en el servidor: ", error.response.data);
          alert(error.response.data);
      } else if (error.request) {
          console.error("No se recibió respuesta del servidor", error.request);
          alert( error.request);
      } else {
          console.error("Error desconocido: ", error.message);
          alert( error.message);
      }
  }
  };
  

  return (
    <>
    <NavBar username={userName} idUser={ idUser }/>
    <Outlet context={{ idUser }} />
    </>
  )
}

export default UserRouter