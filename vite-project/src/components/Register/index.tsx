import React from 'react'
import styles from './Register.module.css'
import  register from '../../assets/Register.png'
import { Link } from 'react-router-dom';
import  {useNavigate}  from 'react-router-dom';

function Register() {
    const history = useNavigate();

    const handleClick = () => {
      history('/');  // Cambia '/' por la ruta a la que quieras navegar
    };
  return (
    <div className={styles['main-container']}>
        <div className={styles['form-login']}>
            <h1 className="title-login">Register</h1>
            <form className={styles['form-container']}>
                <div className={styles['form-group']}>
                    <label htmlFor="name" className="label-name">Name</label>
                    <input id="name" type="text" className="input" />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="email" className="label-email">Email</label>
                    <input type="email" id="email" className="input" />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="password" className="label-password">Password</label>
                    <input id="password" type="password" className="input-password" />
                </div>
            </form>
                <button className={styles['button']} onClick={handleClick}>
                Let's Gooo!
                    </button>
        </div>
        <div className={styles['picture-login']}>
            <img className={styles['img']} src={register}/>
            <h2 className={styles["title-image"]}>Task Manager</h2>
            <p className={styles["paragraph-title"]}>Start to manage your tasks!</p>
        </div>
    </div>
  )
}

export default Register