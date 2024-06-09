import styles from './Servicios.module.css'
import { NavLink } from 'react-router-dom'

const Servicios = () => {
  return (
    <div className={styles.container_servicios}>
      <NavLink className={styles.servicios_cards} to="/servicios/oficinas">
        <div className={styles.cards_content}>
          <img src="/servicios-oficinas.webp" alt="presentacion de las oficinas" className={styles.cards_img} />
        </div>
        <div className={styles.cards_content}>
          <h2 className={styles.cards_title}>OFICINAS</h2>
          <p>Oficinas
            Nuestras oficinas, ideeales para equipos de hasta 10 personas,
            ofrecen un entorno de trabajo cómodo y profesional. Internet de 100 mbps, sillas ergonómicas y,
            en algunas oficinas, acceso a baños privados con cocina equipada.</p>
        </div>
      </NavLink>

      <NavLink className={styles.servicios_cards} to="/servicios/salas">
        <div className={styles.cards_content}>
          <img src="/servicios-salas.webp" alt="presentacion de las oficinas" className={styles.cards_img} />
        </div>
        <div className={styles.cards_content}>
          <h2 className={styles.cards_title}>OFICINAS</h2>
          <p>Oficinas
            Nuestras oficinas, ideeales para equipos de hasta 10 personas,
            ofrecen un entorno de trabajo cómodo y profesional. Internet de 100 mbps, sillas ergonómicas y,
            en algunas oficinas, acceso a baños privados con cocina equipada.</p>
        </div>
      </NavLink>
      <NavLink className={styles.servicios_cards} to="/servicios/eventos">
        <div className={styles.cards_content}>
          <img src="/servicios-eventos.webp" alt="presentacion de las oficinas" className={styles.cards_img} />
        </div>
        <div className={styles.cards_content}>
          <h2 className={styles.cards_title}>OFICINAS</h2>
          <p>Oficinas
            Nuestras oficinas, ideeales para equipos de hasta 10 personas,
            ofrecen un entorno de trabajo cómodo y profesional. Internet de 100 mbps, sillas ergonómicas y,
            en algunas oficinas, acceso a baños privados con cocina equipada.</p>
        </div>
      </NavLink>

    </div>
  )
}

export default Servicios