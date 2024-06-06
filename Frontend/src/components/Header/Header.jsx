import styles from './Header.module.css'
import { Link, NavLink } from "react-router-dom"

const Header = () => {

  return (
    <div className={styles.container}>

      <div className={styles.container_menu}>
        <Link to="/">
          <img className={styles.logo} src="/Logotipo.png" alt="logo" />
        </Link>
        <ul className={styles.container_ul}>
          <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles['navlink-active']}` : styles.navlink} to="/">
            Inicio
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles['navlink-active']}` : styles.navlink} to="Servicios">
            Servicios
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles['navlink-active']}` : styles.navlink} to="Galeria">
            Galería
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles['navlink-active']}` : styles.navlink} to="Contacto">
            Contacto
          </NavLink>
        </ul>

        <Link to="Ingresar">
          <button className={styles.btn}>Iniciar sesión</button>
        </Link>
        
      </div>
    </div>
  )
}

export default Header