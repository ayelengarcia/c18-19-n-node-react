import styles from './Servicios.module.css'
import { NavLink } from 'react-router-dom'

const Servicios = () => {
  return (
    <div className={styles.container_servicios}>

      <NavLink className={styles.navlink} to="/servicios/oficinas">
        <h2>OFICINAS</h2>
      </NavLink>

      <NavLink className={styles.navlink} to="/servicios/salas">
        <h2>SALAS</h2>
      </NavLink>

      <NavLink className={styles.navlink} to="/servicios/eventos">
        <h2>EVENTOS</h2>
      </NavLink>

    </div>
  )
}

export default Servicios