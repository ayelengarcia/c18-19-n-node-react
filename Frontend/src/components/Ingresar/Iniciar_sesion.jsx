import styles from './Ingresar.module.css'
import { NavLink } from "react-router-dom"

const Iniciar_sesion = () => {

  const handleForm = (e) => {
    e.preventDefault()
  }

  return (
    <div style={{ width: '100%' }}>
          <form onSubmit={handleForm} className={styles.form} >
            <input type="email" placeholder="Correo electrónico*" className={styles.standar} />
            <input type="password" placeholder="Contraseña*" className={styles.standar} />
            <button type="submit" className={styles.btn}>Ingresar</button>
            <NavLink to="/Registro" className={styles.parrafo}>Olvidé mi contraseña</NavLink>
          </form>
    </div>
  )
}

export default Iniciar_sesion