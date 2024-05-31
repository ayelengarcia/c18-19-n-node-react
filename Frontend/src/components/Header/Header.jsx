
import { Buscador } from './Buscador'
import styles from './Header.module.css'
import { Link, NavLink } from "react-router-dom"

const Header = () => {

  return (
    <div className={styles.container}>

      <div className={styles.container_menu}>
        <Link to="/">
          <img className={styles.logo} src="/logo_ofiflex.png" alt="logo" />
        </Link>
        <Buscador />
        <ul className={styles.container_ul}>
          <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles['navlink-active']}` : styles.navlink} to="/">
            Inicio
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles['navlink-active']}` : styles.navlink} to="Servicios">
            Servicios
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles['navlink-active']}` : styles.navlink} to="Contacto">
            Contacto
          </NavLink>
        </ul>

        <Link to="Iniciar-sesion">
          <button className={styles.btn}>Ingresar</button>
        </Link>
        
      </div>
    </div>
  )
}

export default Header