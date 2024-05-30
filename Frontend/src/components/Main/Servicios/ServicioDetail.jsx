import styles from './Servicios.module.css'
import servicios from "./servicios.json";
import { useParams } from 'react-router-dom';

const ServicioDetail = () => {

  const { id } = useParams();
  const servicio = servicios.find((servicio) => servicio.id.toString() === id);

  return (
    <div className={styles.card} key={servicio.id}>
      <img src={servicio.imagen} alt="" />
      <div>
        <h2 >{servicio.titulo}</h2>

        <div className={styles.detalles}>
          <p >{servicio.descripcion}</p>
          <p >{servicio.disponibilidad}</p>
          <p >{servicio.fecha}</p>
          <p >{servicio.hora}</p>
          <p >{servicio.categoria}</p>
        </div>

        <button className={styles.btn}>Reservar</button>
      </div>
    </div>
  )
}

export default ServicioDetail