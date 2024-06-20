import styles from "./panel.module.css";
import Filtro from "./components/filtro.jsx";
import { useContext } from "react";
import Context from "../../../context/context.jsx";
import CardReserva from "./components/cardReserva.jsx";

const UsuarioPanel = () => {
  const { usuario, servicios } = useContext(Context);
  const reservas = usuario.listaReservas;

  return (
    <div className={styles.container_user_panel}>
      <div className={styles.container_reservas}>
        <h2 className={styles.title}>Reservas</h2>
        <Filtro />

        {reservas.map((reserva, index) => {
          const servicioReservado = servicios.find(servicio => servicio._id.toString() === reserva.servicioId.toString());
                    
          if (!servicioReservado) {
            // Si no se encuentra el servicio, omitir la reserva
            return null;
          }

          return (
            <CardReserva
              key={index}
              id={reserva.reservaId}
              imagen={servicioReservado.imagen}
              titulo={servicioReservado.titulo}
              fecha={servicioReservado.fecha}
              hora={servicioReservado.hora}
              categoria={servicioReservado.categoria}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UsuarioPanel;
