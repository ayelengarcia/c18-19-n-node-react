import styles from "./Buscador.module.css";
import { useContext } from "react";
import Context from "../../context/context";

function Filtro() {
  const { selectedFecha, selectedHora, handleSelectedFecha, handleSelectedHora, serviciosFiltrados } =
    useContext(Context);
  
  // Obtener las fechas y horas únicas para las opciones de filtro
  const fechasUnicas = [...new Set(serviciosFiltrados.map((servicio) => servicio.fecha))];
  const horasUnicas = [...new Set(serviciosFiltrados.map((servicio) => servicio.hora))];

  return (
    <div>
      <select
        value={selectedFecha}
        onChange={handleSelectedFecha}
        className={styles.select}
      >
        <option value="">Fecha</option>
        {fechasUnicas.map((fecha, index) => (
          <option key={index} value={fecha}>{fecha}</option>
        ))}
      </select>

      <select
        value={selectedHora}
        onChange={handleSelectedHora}
        className={styles.select}
      >
        <option value="">Hora</option>
        {horasUnicas.map((hora, index) => (
          <option key={index} value={hora}>{hora}</option>
        ))}
      </select>
    </div>
  );
}

export default Filtro;
