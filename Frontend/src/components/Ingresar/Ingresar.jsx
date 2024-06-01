import styles from './Ingresar.module.css'
import { NavLink } from "react-router-dom"
import Iniciar_sesion from "./Iniciar_sesion.jsx"
import Registro from "./Registro.jsx"


function Ingresar (){
  
  return (
    <div className={styles.container} >

      <div className={styles.container_form}>

        <div className={styles.container_inputs}>
          <div className={styles.container_titles}>
            <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles['navlink-active']}` : styles.navlink} to="/Iniciar-sesion">
              <h3>Iniciar sesión</h3>
            </NavLink>
            <NavLink className={({ isActive }) => isActive ? `${styles.navlink} ${styles['navlink-active']}` : styles.navlink} to="/Registro">
              <h3>Crear cuenta</h3>
            </NavLink>
          </div>
          <p>Continuar con google</p>
          
          <Iniciar_sesion />
          {/* <Registro /> */}
          
        </div>
        
        <div className={styles.content_img}>
          <img src="img-register.png" alt="equipo desarrollando" className={styles.img} />
        </div>

      </div>
    </div>
  )
}

export default Ingresar