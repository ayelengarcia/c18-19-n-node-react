import React, { useContext } from 'react';
import { Usuario } from './Usuario';
import { Admin } from './Admin';
import { Propietario } from './Propietario';
import Context from '../../../context/context';
// import usuarios from './usuarios.json'


export const Panel = () => {
  const { usuario } = useContext(Context);

  let rol;
  if (!usuario || usuario.length === 0) {
    return <p>No hay usuarios disponibles.</p>;
  }
  {
    switch (usuario[0].rol) {
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