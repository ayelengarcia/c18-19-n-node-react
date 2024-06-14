import ImageUploader from "./ImageUploader";
import { useContext } from "react";
import Context from "../../../../context/context";
import styles from "../panel.module.css"


const NavVertical = () => {
  const { usuario } = useContext(Context);

  return (
    <div className={styles.container_nav}>
     
      <ImageUploader />

      <div className={styles.container_more_info}>
        <div className={styles.more_info}>
          <div><b>Email:</b> {usuario.email}</div>
          <div><b>Edad:</b> {usuario.edad}</div>
          <div><b>Teléfono:</b> {usuario.telefono}</div>
        </div>
      </div>
    </div>
  );
};

export default NavVertical;