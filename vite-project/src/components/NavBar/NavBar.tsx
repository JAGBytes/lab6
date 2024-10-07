import React, { useState } from 'react';
import styles from "./NavBar.module.css"
import logo from '../../assets/logo.png'; 

interface Props {
    onSelect: (page: string) => void;
};

function NavBar({onSelect}: Props ) {
    const [page, setPage] = useState("Home");

    const handlePageChange = (newPage: string) => {
    setPage(newPage);
    onSelect(newPage);
    };

    return (
    
    <header className={styles['header']}>
        <div className={styles['header-task']}>
            <img src={logo} alt="Logo" className={styles['logo']} />
            <h1 className={styles['header-title']}>TaskManager</h1>
        </div>
    
        <nav>
            <ul className={styles['nav-list']}>
                <li>
                    <a className={styles['nav-link']} onClick={() => handlePageChange("Tasks")}>Tasks</a>
                </li>
                <li>
                    <a className={styles['nav-link']} onClick={() => handlePageChange("Insights")}>Insights</a>
                </li>
            </ul>
            <p>Página Actual: {page}</p>            
        </nav>
    </header>

    );
}

export default NavBar;