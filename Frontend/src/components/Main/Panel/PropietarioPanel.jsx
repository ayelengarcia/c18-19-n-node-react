import styles from "./panel.module.css";
import PostServicio from './components/PostServicio.jsx'
import CardServicio from './components/CardServicio.jsx'
import { useContext } from "react";
import Context from "../../../context/context.jsx";

const PropietarioPanel = () => {
  const { usuario } = useContext(Context);
  const serviciosCreados = usuario.listaServicios;


  return (
    <div className={`${styles.container_prop_panel} ${styles.container_gralServicios}`}>
      {console.log(serviciosCreados)}
      <div className={styles.container_servicios}>
        <h2 className={styles.title}>Crear</h2>
        <PostServicio />
      </div>

      <div className={styles.container_servicios}>
        <h2 className={styles.title}>Tus servicios</h2>
        <CardServicio
          imagen={serviciosCreados.imagen}
          titulo={serviciosCreados.titulo}
          fecha={serviciosCreados.fecha}
          hora={serviciosCreados.hora}
          categoria={serviciosCreados.categoria}
        />
      </div>
    </div>
  )
}

export default PropietarioPanel