import React, { useContext } from 'react';
import { Usuario } from './Usuario';
import { Admin } from './Admin';
import { Propietario } from './Propietario';
import Context from '../../../context/context';

export const Panel = () => {
  const { usuarios } = useContext(Context);

  if (!usuarios || usuarios.length === 0) {
    return <p>No hay usuarios disponibles.</p>;
  }
  console.log("users", usuarios)

  {
    usuarios.map((user) => {
      switch (user.rol) {
        case 'usuario':
          return <Usuario key={user.usuarioId} />;
        case 'admin':
          return <Admin key={user.usuarioId} />;
        case 'propietario':
          return <Propietario key={user.usuarioId} />;
        default:
          console.warn(`Tipo de usuario desconocido: ${user.rol}`);
          return <Usuario key={user.usuarioId} />;
      }
    })
  }

};
