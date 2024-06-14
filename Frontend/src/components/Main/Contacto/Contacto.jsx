import styles from "./Contacto.module.css";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import axios from "axios";
import Context from "../../../context/context.jsx";
import { ToastContainer } from "react-toastify";
import { Skeleton } from "@chakra-ui/react";

const Contacto = () => {
  const { msgError, msgSuccess } = useContext(Context);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [loadingSent, setLoadingSent] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoadingSent(true);
      await axios
        .post("http://localhost:3000/sent-email", data)
        .then((res) => msgSuccess("Mensaje enviado"))
        .then((res) => setLoadingSent(false))
        .then((res) => reset());
    } catch (error) {
      console.error("Error al enviar mensaje:", error.response?.data || error.message);
      msgError("Error al enviar mensaje");
      setLoadingSent(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_titulo}>
        <h1 className={styles.title}>¡Comunícate con Ofiflex!</h1>
        <p className={styles.subtitle}>¿Tienes alguna duda o inquietud?. Completa el formulario</p>
        <p className={styles.subtitle}>a continuación y estaremos encantados de asistirte.</p>
      </div>

      <form method="POST" onSubmit={handleSubmit(onSubmit)} className={styles.content_form}>
        <div className={styles.container_datos}>
          <div className={styles.content}>
            <label htmlFor="nombre" className={styles.label}>
              Nombre
            </label>
            <input
              type="text"
              className={styles.standar}
              id="nombre"
              placeholder="Nombre"
              name="nombre"
              {...register("nombre", {
                required: { value: true, message: "Nombre requerido" },
                minLength: { value: 3, message: "Mínimo tres dígitos" },
              })}
            />
            {errors.nombre && <p className={styles.msgError}>{errors.nombre.message}</p>}
          </div>

          <div className={styles.content}>
            <label htmlFor="telefono" className={styles.label}>
              Teléfono
            </label>
            <input
              type="number"
              id="telefono"
              placeholder="Teléfono"
              name="telefono"
              className={styles.standar}
              {...register("telefono", {
                required: { value: true, message: "Teléfono requerido" },
                maxLength: { value: 20, message: "Máximo 20 dígitos" },
              })}
            />
            {errors.telefono && <p className={styles.msgError}>{errors.telefono.message}</p>}
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
              name="asunto"
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
              name="email"
              {...register("email", {
                required: { value: true, message: "Correo requerido" },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Formato incorrecto",
                },
              })}
            />
            {errors.email && <p className={styles.msgError}>{errors.email.message}</p>}
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
            name="mensaje"
            {...register("mensaje", {
              required: { value: true, message: "Mensaje requerido " },
            })}
          ></textarea>
          {errors.mensaje && <p className={styles.msgError}>{errors.mensaje.message}</p>}
        </div>

        {loadingSent ? (
          <Skeleton isLoaded className={styles.btn}>
            {" "}
            Enviando...
          </Skeleton>
        ) : (
          <button type="submit" className={styles.btn}>
            Enviar
          </button>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Contacto;
