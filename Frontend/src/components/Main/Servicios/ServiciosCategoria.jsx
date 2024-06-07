import styles from './Servicios.module.css';
import ServicioCard from './ServicioCard.jsx';
import { useContext } from 'react';
import Context from '../../../context/context.jsx';
import { Buscador } from '../../Filtrado/Buscador.jsx';
import { useParams } from 'react-router-dom';

const ServicioCategoria = () => {
  const { serviciosFiltrados } = useContext(Context);
  const { categoria } = useParams();

  const servicios = serviciosFiltrados.filter(servicio => servicio.categoria.toLowerCase() === categoria.toLowerCase());

  return (
    <div className={styles.container}>
      <div className={styles.banner_categoria}>
        <h2 className={styles.title_categoria}>{categoria.toUpperCase()}</h2>
      </div>
      <Buscador />
      <div className={styles.container_reservas}>
        {servicios.map(servicio => (
          <ServicioCard
            key={servicio.servicioID}
            id={servicio.servicioID}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            disponible={servicio.disponible}
            imagen={servicio.imagen}
            fecha={servicio.fechasDisponibles}
            hora={servicio.hora}
            categoria={servicio.categoria}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicioCategoria;
