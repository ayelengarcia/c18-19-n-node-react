import styles from './Servicios.module.css';
import { Link } from 'react-router-dom';

const ServicioCard = ({ id, titulo, descripcion, disponible, imagen, fecha, hora, categoria }) => {
  return (
    <div className={styles.card} key={id}>
      <img src={imagen} alt={titulo} />
      <div>
        <h2>{titulo}</h2>
        <div className={styles.detalles}>
          <p>{descripcion}</p>
          <p>{disponible ? 'Disponible' : 'No disponible'}</p>
          <p>{categoria}</p>
        </div>
        <Link to={`/servicios/${categoria}/${id}`}>
          <button className={styles.btn}>Ver detalle</button>
        </Link>
      </div>
    </div>
  );
};

export default ServicioCard;
