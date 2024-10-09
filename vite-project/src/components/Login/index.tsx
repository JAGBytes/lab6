import React, { useState } from 'react'
import styles from './Login.module.css'
import login from '../../assets/Login.png'
import { Link } from 'react-router-dom';
import * as LoginService from '../Services/LoginService';
import {User} from '../Services/UserObj';


type Props = {}

function Login({}: Props) {
    const [emailUser, setImail] = useState('');
    const [password,setPassword] = useState('');

    const handleImailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const startLogin = async () =>{
        const newUser = { 
            email : emailUser,
            passwd : password
        }
        await LoginService.LoginUser(JSON.stringify(newUser));
    }

  return (
    <div className={styles['main-container']}>
        <div className={styles['form-login']}>
            <h1 className="title-login">Welcome!</h1>
            <form className={styles['form-container']}>
                <div className={styles['form-group']}>
                    <label htmlFor="email" className="label-email">Email</label>
                    <input type="email" id="email" className="input"
                    value={emailUser}
                    onChange={handleImailChange}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="password" className="label-password">Password</label>
                    <input id="password" type="password" className="input-password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </div>
            </form>
                <button className={styles['button']}
                onClick={startLogin}
                >Sign In</button>
                <p className={styles['create-count']}>Don't Have Account? 
                    <Link to='/Register' className={styles['a-create-count']}>Create Account</Link></p>
        </div>
        <div className={styles['picture-login']}>
            <img className={styles['img']} src={login}/>
            <h2 className={styles["title-image"]}>Task Manager</h2>
            <p className={styles["paragraph-title"]}>Start to manage your tasks!</p>
        </div>
    </div>
  )
}

export default Login