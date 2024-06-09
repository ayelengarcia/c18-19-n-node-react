import React, { useState } from 'react';
import styles from "./Header.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { NavLink } from 'react-router-dom';

const User = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dropdownAbierto, setDropdownAbierto] = useState(false);

  const toggleDropdown = () => {
    setDropdownAbierto(!dropdownAbierto);
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setDropdownAbierto(!dropdownAbierto);
  };

  return (
    <div className={styles.dropdown}>
      <button className={`${styles.btn} ${styles.center}`} onClick={toggleDropdown}>
        Perfil {dropdownAbierto 
        ? 
        <IoIosArrowUp size={18} style={{ marginLeft: '.2rem' }}/> 
        : 
        <IoIosArrowDown size={18} style={{ marginLeft: '.2rem' }}/>}
      </button>
      {isOpen && (
        <ul className={styles.dropdown_menu}>
          <li >
            <NavLink
              to={'/panel'}
              className={styles.link}
              onClick={closeDropdown}
            >
              Ir a mi perfil
            </NavLink>
          </li>
          <li
            onClick={handleLogout}
            className={styles.link}
          >
            Cerrar sesión
          </li>
        </ul>
      )}
    </div>
  );
};

export default User;
