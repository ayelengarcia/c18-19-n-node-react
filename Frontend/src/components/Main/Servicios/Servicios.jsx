import styles from './Servicios.module.css'
import ServicioCard from "./ServicioCard.jsx"
import { useContext } from "react";
import Context from '../../../context/context.jsx';

const Servicios = () => {
  const { serviciosFiltrados } = useContext(Context);

  return (
    <div className={styles.container_servicios}>
      {serviciosFiltrados.map((servicio) => {
        return (
          <ServicioCard
            id={servicio.id}
            key={servicio.id}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            imagen={servicio.imagen}
            disponibilidad={servicio.disponibilidad}
            fecha={servicio.fecha}
            hora={servicio.hora}
            categoria={servicio.categoria}
          />
        );
      })}
    </div>
  )
}

export default Servicios