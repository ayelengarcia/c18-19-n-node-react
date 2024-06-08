import styles from './Servicios.module.css';
import { Link } from 'react-router-dom';

const ServicioCard = ({ id, titulo, descripcion, imagen, fecha, hora, categoria }) => {
  return (
    <div className={styles.card} key={id}>
      <img src={imagen} alt={titulo} />
      <div>
        <h2>{titulo}</h2>
        <div className={styles.detalles}>
          <p>{descripcion}</p>

          <div className={styles.container_fecha}>
            <p>{fecha}</p>
            <p>{hora}</p>
          </div>

        </div>
        <Link to={`/servicios/${categoria}/${id}`}>
          <button className={styles.btn}>Reservar</button>
        </Link>
      </div>
    </div>
  );
};

export default ServicioCard;
