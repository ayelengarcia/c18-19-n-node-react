import styles from './Ingresar.module.css';
import Iniciar_sesion from "./Iniciar_sesion.jsx";
import Registro from "./Registro.jsx";
import { useState, useEffect, useRef } from 'react';
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { FaApple } from "react-icons/fa";

function Ingresar() {
  const [login, setLogin] = useState(true);
  const loginRef = useRef(null);

  useEffect(() => {
    if (loginRef.current) {
      loginRef.current.classList.add("active");
    }
  }, []);

  const navLink = (e) => {
    window.document.querySelector(".active")?.classList.remove("active");
    e.target.classList.add("active");
  }

  const handleLogin = (e) => {
    navLink(e);
    setLogin(true);
  }

  const handleRegistro = (e) => {
    navLink(e);
    setLogin(false);
  }

  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:3000/auth/google';
  }

  const handleFacebookLogin = async () => {
    window.location.href = 'http://localhost:3000/auth/facebook';
  }

  return (
    <div className={styles.container}>
      <div className={styles.container_form}>
        <div className={styles.container_inputs}>
          <div className={styles.container_titles}>
            <h3 onClick={handleLogin} className={`navlink ${styles.h3}`} ref={loginRef}>Iniciar sesión</h3>
            <h3 onClick={handleRegistro} className={`navlink ${styles.h3}`}>Crear cuenta</h3>
          </div>

          <div className={styles.container_buttons}>
            <button onClick={handleGoogleLogin} className={styles.btn_services}><FcGoogle />Continuar con Google</button>
            <button onClick={handleFacebookLogin} className={styles.btn_services}><SiFacebook />Continuar con Facebook</button>
            <button className={styles.btn_services}><FaApple />Continuar con Apple</button>
          </div>

          {login ? <Iniciar_sesion /> : <Registro />}
        </div>

        <div className={styles.content_img}>
          <img src="img-register.png" alt="equipo desarrollando" className={styles.img} />
        </div>

      </div>
    </div>
  )
}
export default Ingresar;
