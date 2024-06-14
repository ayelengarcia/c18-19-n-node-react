import styles from "./panel.module.css"
import NavVertical from "./components/navVertical";
import PropietarioPanel from "./PropietarioPanel.jsx";

export const Propietario = () => {
  return (
    <div className={styles.container}>
      <NavVertical />
      <PropietarioPanel />
    </div>
  )
}
