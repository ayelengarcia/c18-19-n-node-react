import styles from './Ingresar.module.css'
import { NavLink } from "react-router-dom"

const Iniciar_sesion = () => {

  const handleForm = (e) => {
    e.preventDefault()
  }

  return (
    <div>
          <form onSubmit={handleForm} className={styles.form} >
            <input type="email" placeholder="Correo electronico" className={styles.standar} />
            <input type="password" placeholder="Contraseña" className={styles.standar} />
            <button type="submit" className={styles.btn}>Ingresar</button>
          </form>
          <NavLink to="/Registro">Olvidé mi contraseña</NavLink>
    </div>
  )
}

export default Iniciar_sesion