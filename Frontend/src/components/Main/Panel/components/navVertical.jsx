import ImageUploader from "./ImageUploader";
import { useContext } from "react";
import Context from "../../../../context/context";
import styles from "../panel.module.css"


const NavVertical = () => {
  const { usuario } = useContext(Context);

  return (
    <div className={styles.container_nav}>
     
      <ImageUploader />
      <div>{usuario.nombre}</div>
    </div>
  );
};

export default NavVertical;