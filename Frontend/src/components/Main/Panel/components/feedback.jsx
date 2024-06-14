import styles from "../panel.module.css";
import { TiStar } from "react-icons/ti";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Context from "../../../../context/context.jsx";

const feedback = ({ id }) => {
  const { authToken } = useContext(Context);
  const [feedback, setFeedback] = useState("");
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reservas/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setReserva(response.data);
        setFeedback(response.data.feedback || "");
      } catch (error) {
        console.error("Error al obtener la reserva:", error);
      }
    };

    fetchData();
  }, [id, authToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/reservas/${id}`,
        { feedback },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);
      setReserva((prev) => ({ ...prev, feedback: response.data.feedback || feedback }));
    } catch (error) {
      console.error("Error al enviar el feedback:", error);
    }
  };

  if (!reserva) {
    return <div>Cargando reserva...</div>;
  }

  return (
    
    <div className={styles.container_feedback}>
      <h3 className={styles.title_card}>
        <TiStar className={styles.star} /> Feedback:
      </h3>
     
      {reserva.feedback ? (
        <div>{reserva.feedback}</div>
      ) : (
          <div className={styles.container_form}>
            <textarea
              id='output'
              className={styles.textarea_feedback}
              placeholder="Coméntanos..."
              name="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button className={styles.btn_calificar} onClick={handleSubmit}>
              Enviar
            </button>

        </div>
      )}
    </div>
  );
}

export default feedback