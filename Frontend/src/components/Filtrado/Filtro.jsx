import styles from "./Buscador.module.css";
import { useContext } from "react";
import Context from "../../context/context";
import { parseDate, sortTimes } from "../utils.jsx";

function Filtro({categoria}) {
  const { selectedFecha, selectedHora, handleSelectedFecha, handleSelectedHora, serviciosFiltrados, clearFilters } =
    useContext(Context);

  // Filtrar los servicios por la categoría en la que se encuentra
  const serviciosFiltradosPorCategoria = serviciosFiltrados.filter(
    (servicio) => servicio.categoria.toLowerCase() === categoria.toLowerCase()
  );
  
  // Obtener las fechas únicas y ordenarlas de menor a mayor
  const fechasUnicas = [...new Set(serviciosFiltradosPorCategoria.map((servicio) => servicio.fecha))]
    .sort((a, b) => parseDate(a) - parseDate(b));
  
  // Obtener las horas únicas y ordenarlas de menor a mayor
  const horasUnicas = [...new Set(serviciosFiltradosPorCategoria.map((servicio) => servicio.hora))]
    .sort(sortTimes);

  return (
    <div className={styles.container_input_filtro}>
      <select
        value={selectedFecha}
        onChange={handleSelectedFecha}
        className={styles.select}
      >
        <option value="">Fechas disponibles</option>
        {fechasUnicas.map((fecha, index) => (
          <option key={index} value={fecha}>{fecha}</option>
        ))}
      </select>

      <select
        value={selectedHora}
        onChange={handleSelectedHora}
        className={styles.select}
      >
        <option value="">Horarios disponibles</option>
        {horasUnicas.map((hora, index) => (
          <option key={index} value={hora}>{hora}</option>
        ))}
      </select>

      <button className={styles.btn} onClick={clearFilters}>Limpiar</button>
    </div>
  );
}

export default Filtro;
