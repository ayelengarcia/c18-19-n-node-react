import styles from './Ingresar.module.css'
import { NavLink } from "react-router-dom"
function IniciarSesion (){
  const handleForm = (e)=> {e.preventDefault()}
  return (
    <div className={styles.container} >
      <div>
      <h2>INICIAR SESION</h2>
      <p>Continuar con google</p>
      <form onSubmit={handleForm} className={styles.form} >
        <input type="email" placeholder="Correo electronico" className={styles.standar}
        />
        <input type="password" placeholder="Contraseña" className={styles.standar}
        />
        <button type="submit" className={styles.btn}>Ingresar</button>
        <button type="submit" className={styles.standar}>Olvide mi contraseña</button>
      </form>
      <NavLink to="/Registro">¿No tienes una cuenta?. Crear una cuenta</NavLink>
      </div>
      <div className={styles.content_img}>
        <img src="https://rightpeoplegroup.com/wp-content/uploads/2022/11/software-production-team-2021-09-24-04-17-44-utc-min-scaled.jpg" alt="equipo desarrollando" className={styles.img} />
      </div>
    </div>
  )
}

export default IniciarSesion