import styles from './Ingresar.module.css'
import { NavLink } from "react-router-dom"


function IniciarSesion (){
  const handleForm = (e) => {
    e.preventDefault()
  }
  
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
          <form onSubmit={handleForm} className={styles.form} >
            <input type="email" placeholder="Correo electronico" className={styles.standar} />
            <input type="password" placeholder="Contraseña" className={styles.standar} />
            <button type="submit" className={styles.btn}>Ingresar</button>
          </form>
          <NavLink to="/Registro">Olvidé mi contraseña</NavLink>
        </div>
{/* 
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
          <form onSubmit={handleForm} className={styles.form} >
            <input type="email" placeholder="Correo electronico" className={styles.standar} />
            <input type="password" placeholder="Contraseña" className={styles.standar} />
            <button type="submit" className={styles.btn}>Ingresar</button>
            <button type="submit" className={styles.standar}>Olvide mi contraseña</button>
          </form>
          <NavLink to="/Registro">Olvidé mi contraseña</NavLink>
        </div> */}
        
        <div className={styles.content_img}>
          <img src="img-register.png" alt="equipo desarrollando" className={styles.img} />
        </div>

      </div>
    </div>
  )
}

export default IniciarSesion