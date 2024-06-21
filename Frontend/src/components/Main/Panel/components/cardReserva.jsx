import { useState, useContext } from "react";
import styles from "../panel.module.css";
import { BiAlarm } from "react-icons/bi";
import { BiCalendarAlt } from "react-icons/bi";
import Feedback from "./feedback";
import { FaRegTrashCan } from "react-icons/fa6";
import Context from "../../../../context/context";
import axios from "axios";

const CardReserva = ({ imagen, titulo, fecha, hora, categoria, id }) => {
  const { usuario, authToken, servicios } = useContext(Context);

  const [showFeedback, setShowFeedback] = useState(false);

  const handleToggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedListaReservas = usuario.listaReservas.filter(reserva => reserva.reservaId.toString() !== id.toString());
    const reservaEnCuestion = usuario.listaReservas.find(reserva => reserva.reservaId.toString() === id.toString());
    const disponibilizar = servicios.find(servicio => servicio._id.toString() === reservaEnCuestion.servicioId.toString());
    console.log(servicios);

    try {
      // Actualizar la lista de reservas del usuario
      const responseUsuario = await axios.put(`http://127.0.0.1:3000/user/${usuario._id}`, { listaReservas: updatedListaReservas }, {
        headers: {
          authorization: 'Bearer ' + authToken
        }
      });
      console.log('Usuario actualizado:', responseUsuario.data);
      
      // Actualizar la disponibilidad del servicio en el servidor
      const responseServicio = await axios.put(`http://127.0.0.1:3000/servicios/${disponibilizar._id}`, { disponible: true }, {
        headers: {
          authorization: 'Bearer ' + authToken
        }
      });
      console.log('Servicio actualizado:', responseServicio.data);
  
    } catch (error) {
      console.error('Error al actualizar el usuario o el servicio:', error);
    }

  }

  return (
    <div className={styles.container_cardReserva}>
      <form onSubmit={handleSubmit} className={styles.trash} >
        <button type="submit" className={styles.trash_btn}>
          <FaRegTrashCan className={styles.trash_icon} />
        </button>
      </form>
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
