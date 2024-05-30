import styles from './Servicios.module.css'
import { Link } from 'react-router-dom'

const ServicioCard = ({ id, titulo, descripcion, imagen, disponibilidad, fecha, hora, categoria }) => {
  return (
    <div className={styles.card} key={id}>
      <img src={imagen} alt="" />
      <div>
        <h2 >{titulo}</h2>

        <div className={styles.detalles}>
          <p >{descripcion}</p>
          <p >{disponibilidad}</p>
          <p >{fecha}</p>
          <p>{hora}</p>
          <p >{categoria}</p>
        </div>

        <Link to={`/Servicios/${id}`}>
          <button className={styles.btn}>Ver detalle</button>
        </Link>
      </div>
    </div>
  )
}

export default ServicioCard

