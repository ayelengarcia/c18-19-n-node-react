import styles from "../panel.module.css";
import { BiAlarm } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";

const CardServicio = ({imagen, titulo, fecha, hora, categoria}) => {
  return (
    <div className={styles.container_cardReserva}>
      <img className={styles.img_reserva} src={imagen} alt={titulo} />

      <div className={styles.container_text}>
        <div className={styles.info}>
          <h2 className={styles.title_card}>{titulo}</h2>
          <p className={styles.p_fecha}><BiCalendarAlt />{fecha}</p>
          <p className={styles.p_fecha}><BiAlarm />{hora}hs</p>
        </div>
        <p>{categoria}</p>
      </div>

      </div>
  )
}

export default CardServicio;