import React, { useState } from 'react';
import styles from '../../../styles/Navbar.module.css';
import logo from '../../../assets/images/logo.jpg';
import Hamburger from 'hamburger-react';
// import {Link} from 'react-router-dom';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    

     

    return (
        <nav className={styles.navbar}>
           <img src={logo} alt="Logo" className={styles.logo} />
           <div className={styles.hamburger}>
                <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </div>
            <ul className={`${styles.navOptions} ${isOpen ? styles.showMenu : ''}`}>
                <li className={styles.navItem}><a href="#home" className={styles.navLink}>Home</a></li>
                <li className={styles.navItem}><a href="#distinations" className={styles.navLink}>Distinations</a></li>
                <li className={styles.navItem}><a href="#blog" className={styles.navLink}>Blog</a></li>
                <li className={styles.navItem}><a href="#news" className={styles.navLink}>Contact</a></li>
                <li className={styles.navItem}><a href="/login" className={styles.navLink}  >Login</a></li>
            </ul>
        </nav>
    );
};
