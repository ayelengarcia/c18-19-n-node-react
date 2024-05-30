import styles from './Servicios.module.css'
import servicios from "./servicios.json";
import ServicioCard from "./ServicioCard.jsx"

const Servicios = () => {
  return (
    <div className={styles.container_servicios}>
      {servicios.map((servicio) => {
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