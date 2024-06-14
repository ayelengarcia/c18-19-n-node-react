import { useState } from "react";
import styles from "../panel.module.css";
import { BiAlarm } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";
import Feedback from "./feedback";

const CardReserva = ({ imagen, titulo, fecha, hora, categoria, id }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleToggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <div className={styles.container_cardReserva}>
      <div className={styles.container_card}>
        <img className={styles.img_reserva} src={imagen} alt={titulo} />

        <div className={styles.container_text}>
          <div className={styles.info}>
            <h2 className={styles.title_card}>{titulo}</h2>
            <p className={styles.p_fecha}><BiCalendarAlt />{fecha}</p>
            <p className={styles.p_fecha}><BiAlarm />{hora}hs</p>
          </div>

          <div className={styles.container_end}>
            <p>{categoria}</p>
            <button className={styles.btn_calificar} onClick={handleToggleFeedback}>
              {showFeedback ? "Ocultar" : "Feedback"}
            </button>
          </div>
        </div>
      </div>

      {showFeedback && <Feedback id={id} />}
    </div>
  );
};

export default CardReserva;
