import styles from './Ingresar.module.css'
import { useForm} from "react-hook-form"
import { NavLink } from 'react-router-dom';


function IniciarSesion (){
  const { register, handleSubmit } = useForm();
  
  const handleForm = (e) => {
    e.preventDefault()
  }

  return (
      <div>
      <form onSubmit={handleForm} className={styles.form} >
        <input type="text" placeholder="Nombre" className={styles.standar}
        />
        <input type="text" placeholder="Edad" className={styles.standar}
        />
        <input type="text" placeholder="Direccion" className={styles.standar}
        />
        <input type="text" placeholder="Telefono" className={styles.standar}
        />
        <input type="email" placeholder="Correo electronico" className={styles.standar}
        />
        <input type="password" placeholder="Contraseña" className={styles.standar}
        />
        <div>
          <input type="checkbox" 
          />
          <label htmlFor="terminos">Acepto los terminos y condiciones</label>
        </div>
        <button type="submit" className={styles.btn}>Crear cuenta</button>
        <NavLink to="/Iniciar-sesion">¿Ya tienes una cuenta?.</NavLink>
     
      </form>
      {/* <div className={styles.content_img}>
        <img src="https://rightpeoplegroup.com/wp-content/uploads/2022/11/software-production-team-2021-09-24-04-17-44-utc-min-scaled.jpg" alt="equipo desarrollando" className={styles.img} />
      </div> */}
    </div>
  )
}

export default IniciarSesion