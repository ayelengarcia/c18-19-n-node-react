import styles from "./Ingresar.module.css";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registered, setRegistered] = useState(false);

  // Envíamos los datos del formulario al backend para el registro, y si el registro es exitoso, establece el estado registered en true para redirigir al usuario
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", data);
      setRegistered(true);
    } catch (error) {
      console.error("Error al registrar:", error.response.data);
    }
  };
  const navigate = useNavigate();

  // si registered es true, redirigir al Home ('/')
  if (registered) {
    navigate('/');
  }

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.container_datos}>
          <input
            type="text"
            placeholder="Nombre*"
            className={styles.standar}
            {...register("nombre", {
              required: { value: true, message: "Nombre requerido" },
              minLength: { value: 3, message: "Mínimo tres dígitos" },
            })}
          />
          {errors.nombre && <p>{errors.nombre.message}</p>}

          <input
            type="text"
            placeholder="Apellido*"
            className={styles.standar}
            {...register("apellido", {
              required: { value: true, message: "Apellido requerido" },
              minLength: { value: 3, message: "Mínimo tres dígitos" },
            })}
          />
          {errors.apellido && <p>{errors.apellido.message}</p>}
        </div>

        <div className={styles.container_datos}>
          <input
            type="text"
            placeholder="Edad*"
            className={styles.standar}
            {...register("edad", {
              required: { value: true, message: "Edad requerida" },
              minLength: { value: 1, message: "Mínimo un dígito" },
              maxLength: { value: 2, message: "Máximo dos dígitos" },
            })}
          />
          {errors.edad && <p>{errors.edad.message}</p>}

          <input
            type="text"
            placeholder="Teléfono*"
            className={styles.standar}
            {...register("telefono", {
              required: { value: true, message: "Teléfono requerido" },
              maxLength: { value: 20, message: "Máximo 20 dígitos" },
            })}
          />
          {errors.telefono && <p>{errors.telefono.message}</p>}
        </div>

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
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Contraseña*"
          className={styles.standar}
          {...register("password", {
            required: { value: true, message: "Contraseña requerida" },
            pattern: {
              value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
              message: "Debe tener entre 8 y 16 caracteres, al menos una mayúscula y una minúscula",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <div className={styles.container_check}>
          <input type="checkbox" {...register("check", { required: true })} />
          <label htmlFor="terminos" className={styles.parrafo}>Acepto los términos y condiciones</label>
        </div>

        <button onClick={onSubmit} type="submit" className={styles.btn}>
          Crear cuenta
        </button>

        <NavLink to="/IniciarSesion" className={styles.parrafo}>¿Ya tienes una cuenta? Inicia sesión aquí</NavLink>
      </form>
    </div>
  );
}

export default Registro;
