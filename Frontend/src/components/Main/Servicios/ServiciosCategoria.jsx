import styles from './Servicios.module.css';
import ServicioCard from './componentes/ServicioCard.jsx';
import { useContext } from 'react';
import Context from '../../../context/context.jsx';
import { Buscador } from '../../Filtrado/Buscador.jsx';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const ServicioCategoria = () => {
  const { serviciosFiltrados } = useContext(Context);
  const { categoria } = useParams();

  const servicios = serviciosFiltrados.filter(servicio => servicio.categoria.toLowerCase() === categoria.toLowerCase());

  let content;
  switch (categoria) {
    case 'oficinas':
      content = <div className={`${styles.banner_categoria} ${styles.banner_oficinas}`}>
      </div>;
      break;
    case 'salas':
      content = <div className={`${styles.banner_categoria} ${styles.banner_salas}`}>
      </div>;
      break;
    case 'eventos':
      content = <div className={`${styles.banner_categoria} ${styles.banner_eventos}`}>
      </div>;
      break;
    default:
      content = <div className={`${styles.banner_categoria} ${styles.banner_oficinas}`}>
      </div>;
      break;
  }

  return (
    <div className={styles.container}>

      {content}

      <ul className={styles.container_ul}>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.navlink_cat} ${styles["navlink-active"]}` : styles.navlink_cat)}
          to="/servicios/oficinas"
        >
          Oficinas
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.navlink_cat} ${styles["navlink-active"]}` : styles.navlink_cat)}
          to="/servicios/salas"
        >
          Salas
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? `${styles.navlink_cat} ${styles["navlink-active"]}` : styles.navlink_cat)}
          to="/servicios/eventos"
        >
          Eventos
        </NavLink>
      </ul>

      <Buscador categoria={categoria} />

      <div className={styles.container_reservas}>
        {servicios.map(servicio => (
          <ServicioCard
            key={servicio.servicioID}
            id={servicio.servicioID}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            disponible={servicio.disponible}
            imagen={servicio.imagen}
            fecha={servicio.fecha}
            hora={servicio.hora}
            categoria={servicio.categoria}
          />
        ))}
      </div>

    </div>
  );
};

export default ServicioCategoria;
