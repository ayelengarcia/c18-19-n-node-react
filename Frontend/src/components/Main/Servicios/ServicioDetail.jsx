import styles from './Servicios.module.css';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../../context/context.jsx';

const ServicioDetail = () => {
  const { servicios } = useContext(Context);

  const { id } = useParams();
  const servicio = servicios.find((servicio) => servicio.servicioID === id);


  return (
    <div className={styles.container_detail} key={servicio._id}>
      <img className={styles.img_detail} src={servicio.imagen} alt={servicio.titulo} />
      <div>
        <h2>{servicio.titulo}</h2>
        <div className={styles.detalles}>
          <p>{servicio.descripcion}</p>
          <p>{servicio.disponible ? 'Disponible' : 'No disponible'}</p>
          <p>{servicio.categoria}</p>
        </div>
        <button className={styles.btn}>Confirmar reserva</button>
      </div>
    </div>
  );
};

export default ServicioDetail;
