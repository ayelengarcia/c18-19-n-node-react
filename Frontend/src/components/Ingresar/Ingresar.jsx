import styles from './Ingresar.module.css'
import Iniciar_sesion from "./Iniciar_sesion.jsx"
import Registro from "./Registro.jsx"
import { useState } from 'react'

function Ingresar (){
  const [login, setLogin] = useState(true);
  const navLink=(e)=>{
    window.document.querySelector(".active")?.classList.remove("active");
    e.target.classList.add("active");
  }
  const handleLogin = (e)=>{
    navLink(e);
    setLogin(true)
    }
  const handleRegistro = (e)=>{
    navLink(e);
    setLogin(false)
    }

  return (
    <div className={styles.container} >
      <div className={styles.container_form}>
        <div className={styles.container_inputs}>
          <div className={styles.container_titles}>
            <span onClick={handleLogin} className='navlink'>Iniciar Sesion</span>
            <span onClick={handleRegistro} className='navlink'>Registrarse</span>
          </div>
          <p>Continuar con google</p>
          {login ? <Iniciar_sesion/>: <Registro/>}
        </div>
        <div className={styles.content_img}>
          <img src="img-register.png" alt="equipo desarrollando" className={styles.img} />
        </div>

      </div>
    </div>
  )
}
export default Ingresar