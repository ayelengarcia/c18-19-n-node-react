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
          <h2 className={styles.cards_title}>Oficinas</h2>
          <p className={styles.cards_parrafo}>Nuestras oficinas, ideeales para equipos de hasta 10 personas,
            ofrecen un entorno de trabajo cómodo y profesional. Internet de 100 mbps, sillas ergonómicas y,
            en algunas oficinas, acceso a baños privados con cocina equipada.</p>
        </div>
      </NavLink>

      <NavLink className={styles.servicios_cards} to="/servicios/salas">
        <div className={styles.cards_content}>
          <h2 className={styles.cards_title}>Salas de reuniones</h2>
          <p className={styles.cards_parrafo}>Contamos con salas de hasta 20 personas, equipadas con un televisor de 50 pulgadas y un proyector 4K. Sillas ergonómicas e internet de 100 mbps, además de baños privados separados para mayor comodidad.</p>
        </div>
        <div className={styles.cards_content}>
          <img src="/servicios-salas.webp" alt="presentacion de las oficinas" className={styles.cards_img} />
        </div>
      </NavLink>
      
      <NavLink className={styles.servicios_cards} to="/servicios/eventos">
        <div className={styles.cards_content}>
          <img src="/servicios-eventos.webp" alt="presentacion de las oficinas" className={styles.cards_img} />
        </div>
        <div className={styles.cards_content}>
          <h2 className={styles.cards_title}>Auditorios - Eventos</h2>
          <p className={styles.cards_parrafo}>Los salones para eventos están diseñado para grupos de mas de 20 personas, cuenta con un proyector de cine, conexión a internet y un equipo de sonido envolvente para garantizar una experiencia audiovisual de alta calidad.</p>
        </div>
      </NavLink>

    </div>
  )
}

export default Servicios