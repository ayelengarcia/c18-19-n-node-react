// import styles from './Ingresar.module.css'
import { NavLink } from "react-router-dom"

const IniciarSesion = () => {
  return (
    <div>
      <h2>INICIAR SESION</h2>
      <NavLink to="/Registro">¿No tienes una cuenta?. Crear una cuenta</NavLink>
    </div>
  )
}

export default IniciarSesion