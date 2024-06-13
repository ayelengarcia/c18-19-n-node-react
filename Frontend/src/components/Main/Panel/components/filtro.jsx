import styles from "../panel.module.css";

function Filtro() {
  
  return (
      <select
        // value=""
        // onChange=""
        className={styles.select}
      >
        <option value="">Activas</option>
        <option value="">Historial</option>

      </select>
  );
}

export default Filtro;