import styles from "./Ingresar.module.css";
import { useForm } from "react-hook-form";

function IniciarSesion() {
  const {  register,  handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { nombre, edad, email, telefono, direccion, password } = data;
    console.log(nombre);
  };

  console.log("errors", errors);

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
              minLength: { value: 3, message: "Minimo tres digitos" },
            })}
          />
          {errors.nombre && <p>{errors.nombre.message}</p>}

          <input
            type="text"
            placeholder="Dirección*"
            className={styles.standar}
            {...register("direccion", {
              required: { value: true, message: "Direccion requerida" },
              minLength: { value: 3, message: "Minimo tres digitos" },
            })}
          />
          {errors.direccion && <p>{errors.direccion.message}</p>}
        </div>

        <div className={styles.container_datos}>
          <input
            type="text"
            placeholder="Edad*"
            className={styles.standar}
            {...register("edad", {
              required: { value: true, message: "Edad requerida" },
              minLength: { value: 1, message: "Minimo un digito" },
              maxLength: { value: 2, message: "Maximo dos digitos" },
            })}
          />
          {errors.edad && <p>{errors.edad.message}</p>}


          <input
            type="text"
            placeholder="Teléfono*"
            className={styles.standar}
            {...register("telefono", {
              required: { value: true, message: "Telefono requerida" },
              maxLength: { value: 20, message: "Maximo 20 digitos" },
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
            required: { value: true, message: "Contraseña requerido" },
            pattern: {
              value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
              message:
                "caracteres entre 8 y 6, al menos un digito, mayuscula, minuscula",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <div className={styles.container_check}>
          <input type="checkbox" {...register("check", { required: true })} />
          <label htmlFor="terminos" className={styles.parrafo}>Acepto los terminos y condiciones</label>
        </div>

        <button type="submit" className={styles.btn}>
          Crear cuenta
        </button>

      </form>
    </div>

  );
}

export default IniciarSesion;
