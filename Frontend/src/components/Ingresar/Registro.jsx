import styles from "./Ingresar.module.css";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import Context from '../../context/context.jsx';

function Registro() {
  const { msgError, msgSuccess, setLogin, loginRef, handleLogin } = useContext(Context);
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [registered, setRegistered] = useState(false);

  // Envíamos los datos del formulario al backend para el registro, y si el registro es exitoso, establece el estado registered en true para redirigir al usuario
  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/auth/register", data)
      setRegistered(true);
      msgSuccess("Registro exitoso");
      handleLogin();
    } catch (error) {
      console.error("Error al registrar:", error.response.data);
      msgError("Error de registro. Vuelva a intentar")
    }
  };

  // Si registered es true, redirigir al Home ('/')
  // Redirijo al usuario a la vista de iniciar sesión, cambio el estado de renderizado setLogin
  if (registered) {
    setTimeout(() => {
      setLogin(true);
    }, 1500);
    loginRef.current.classList.add("active");
  }

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.container_datos}>

          <div>
            <input
              type="text"
              placeholder="Nombre*"
              className={styles.standar}
              {...register("nombre", {
                required: { value: true, message: "Nombre requerido" },
                minLength: { value: 3, message: "Mínimo tres dígitos" },
              })}
            />
            {errors.nombre && <p className={styles.msgError}>{errors.nombre.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Apellido*"
              className={styles.standar}
              {...register("apellido", {
                required: { value: true, message: "Apellido requerido" },
                minLength: { value: 3, message: "Mínimo tres dígitos" },
              })}
            />
            {errors.apellido && <p className={styles.msgError}>{errors.apellido.message}</p>}
          </div>


        </div>

        <div className={styles.container_datos}>
          <div>
            <input
              type="number"
              placeholder="Edad*"
              className={styles.standar}
              {...register("edad", {
                required: { value: true, message: "Edad requerida" },
                minLength: { value: 1, message: "Mínimo un dígito" },
                maxLength: { value: 2, message: "Máximo dos dígitos" },
              })}
            />
            {errors.edad && <p className={styles.msgError}>{errors.edad.message}</p>}
          </div>

          <div>
            <input
              type="number"
              placeholder="Teléfono*"
              className={styles.standar}
              {...register("telefono", {
                required: { value: true, message: "Teléfono requerido" },
                maxLength: { value: 20, message: "Máximo 20 dígitos" },
              })}
            />
            {errors.telefono && <p className={styles.msgError}>{errors.telefono.message}</p>}
          </div>
        </div>

        <div>
          <input
            type="email"
            placeholder="Correo electrónico*"
            className={styles.standar}
            {...register("email", {
              required: { value: true, message: "Email requerido" },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Formato incorrecto",
              },
            })}
          />
          {errors.email && <p className={styles.msgError}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Contraseña*"
            className={styles.standar}
            {...register("password", {
              required: { value: true, message: "Contraseña requerida" },
              pattern: {
                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                message: "Entre 8 y 16 caracteres, al menos una Mayús y una Minús",
              },
            })}
          />
          {errors.password && <p className={styles.msgError}>{errors.password.message}</p>}
        </div>


        <div>
          <div className={styles.container_check}>
            <input type="checkbox"
              {...register("check", {
                required: { value: true, message: "Debe aceptar términos y condiciones" }
              })} />
            <label htmlFor="terminos" className={styles.parrafo}>Acepto los términos y condiciones</label>
          </div>
          {errors.check && <p className={styles.msgError}>{errors.check.message}</p>}
        </div>
      

        <button onClick={onSubmit} type="submit" className={styles.btn}>
          Crear cuenta
        </button>

        <NavLink to="/IniciarSesion" className={styles.parrafo}>¿Ya tienes una cuenta? Inicia sesión aquí</NavLink>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Registro;
