import styles from "./panel.module.css"
import NavVertical from "./components/navVertical";
import UsuarioPanel from "./UsuarioPanel.jsx";



export const Usuario = () => {

  return (
    <div className={styles.container}>
      <NavVertical />
      <UsuarioPanel />
    </div>
  );
};
