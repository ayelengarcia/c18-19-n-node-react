import React, { useState } from 'react';
import styles from "./Header.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const User = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <FaRegUserCircle onClick={toggleDropdown} size={41} />
      {isOpen && (
        <ul className={styles.dropdown_menu}>
          <li className={styles.btn}><NavLink
            to={'/panel'}
            className={styles.link}
          >Ir a mi perfil</NavLink></li>
          <li className={styles.btn} onClick={handleLogout}>Cerrar sesión</li>
        </ul>
      )}
    </div>
  );
};

export default User;
