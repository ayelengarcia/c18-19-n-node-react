import styles from "./Contacto.module.css";
import { useForm } from "react-hook-form";


const Contacto = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(errors);
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.content_form}>

        <div className={styles.container_datos}>
          <div className={styles.content}>
            <label htmlFor="nombre" className={styles.label}> Nombre </label>
            <input
              type="text"
              className={styles.standar}
              id="nombre"
              placeholder="Nombre"
              {...register("nombre", {
                required: { value: true, message: "Nombre requerido" },
                minLength: { value: 3, message: "Mínimo tres dígitos" },
              })}
            />
            {errors.nombre && (
              <p className={styles.msgError}>{errors.nombre.message}</p>
            )}
          </div>

          <div className={styles.content}>
            <label htmlFor="telefono" className={styles.label}>
              Teléfono
            </label>
            <input
              type="number"
              id="telefono"
              placeholder="Teléfono"
              className={styles.standar}
              {...register("telefono", {
                required: { value: true, message: "Teléfono requerido" },
                maxLength: { value: 20, message: "Máximo 20 dígitos" },
              })}
            />
            {errors.telefono && (
              <p className={styles.msgError}>{errors.telefono.message}</p>
            )}
          </div>
        </div>

        <div className={styles.container_datos}>
          <div className={styles.content}>
            <label htmlFor="asunto" className={styles.label}>
              Asunto
            </label>
            <input
              type="text"
              className={styles.standar}
              id="asunto"
              placeholder="Asunto"
              {...register("asunto")}
            />
          </div>

          <div className={styles.content}>
            <label htmlFor="correo" className={styles.label}>
              Correo electrónico
            </label>
            <input
              type="email"
              id="correo"
              placeholder="Correo electrónico"
              className={styles.standar}
              {...register("email", {
                required: { value: true, message: "Correo requerido" },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Formato incorrecto",
                },
              })}
            />
            {errors.email && (
              <p className={styles.msgError}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="mensaje" className={styles.label}>
            Mensaje
          </label>
          <textarea
            className={styles.area}
            id="mensaje"
            placeholder="Escribe tu mensaje aquí..."
            {...register("mensaje", {
              required: { value: true, message: "Mensaje requerido " },
            })}
          ></textarea>
          {errors.mensaje && (
            <p className={styles.msgError}>{errors.mensaje.message}</p>
          )}
        </div>

        <button onClick={onSubmit} type="submit" className={styles.btn}>Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;
