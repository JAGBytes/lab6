import React, { useState } from 'react';
import styles from "./NavBar.module.css"
import logo from '../../assets/logo.png'; 
import { Link } from 'react-router-dom';


function NavBar() {
    
    return (
    
    <header className={styles['header']}>
        <div className={styles['header-task']}>
            <img src={logo} alt="Logo" className={styles['logo']} />
            <h1 className={styles['header-title']}>TaskManager</h1>
        </div>
    
        <nav>
            <ul className={styles['nav-list']}>
                <li>
                    <Link to="/" className={styles['nav-link']}>Tasks</Link>
                </li>
                <li>
                    <Link to="/insights" className={styles['nav-link']} >Insights</Link>
                </li>
            </ul>        
        </nav>
        <div className={styles['user']}>
            <h4>Welcome, user123</h4>
            <button className={styles['button']}>Log Out</button>
        </div>
    </header>

    );
}

export default NavBar;