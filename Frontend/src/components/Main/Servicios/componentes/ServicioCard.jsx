import styles from "../Servicios.module.css";
import { Link } from "react-router-dom";
import { BiAlarm } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";

const ServicioCard = ({ id, titulo, descripcion, imagen, fecha, hora, categoria }) => {
  return (
      <div className={styles.card} key={id}>
        <Link className={styles.navlink} to={`/servicios/${categoria}/${id}`}>
        <img className={styles.img_serv} src={imagen} alt={titulo} />
        <div>
          <h3 className={styles.titulo_card}>{titulo}</h3>
          <div className={styles.detalles}>
            <p>{descripcion}</p>

            <div className={styles.container_fecha}>
              <p className={styles.p_fecha}><BiCalendarAlt />{fecha}</p>
              <p className={styles.p_fecha}><BiAlarm />{hora}hs</p>
            </div>
          </div>
        </div>
        </Link>
        <Link to={`/servicios/${categoria}/${id}`}>
          <button className={styles.btn}>Reservar</button>
        </Link>
      </div>
  );
};

export default ServicioCard;
