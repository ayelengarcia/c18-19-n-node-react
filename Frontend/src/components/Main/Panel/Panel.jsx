import { useContext } from 'react';
import { Usuario } from './Usuario';
import { Admin } from './Admin';
import { Propietario } from './Propietario';
import Context from '../../../context/context';
import styles from "./panel.module.css"

export const Panel = () => {
  const { usuario } = useContext(Context);

  let rol;
  if (!usuario || usuario.length === 0) {
    return (
      <div className={styles.container}>
        <h2>No hay usuarios disponibles.</h2>;
      </div>
      )
  }
  {
    switch (usuario.rol) {
      case 'usuario':
        return rol = <Usuario />;
      case 'admin':
        return rol = <Admin />;
      case 'propietario':
        return rol = <Propietario />;
      default:
        return rol = <Usuario />;
    }
  }
};