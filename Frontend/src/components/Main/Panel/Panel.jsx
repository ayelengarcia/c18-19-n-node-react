import React, { useContext } from 'react';
import { Usuario } from './Usuario';
import { Admin } from './Admin';
import { Propietario } from './Propietario';
import Context from '../../../context/context';

export const Panel = () => {
  const { users } = useContext(Context);

  if (!users || users.length === 0) {
    return <p>No hay usuarios disponibles.</p>;
  }

  {
    users.map((user, id) => {
      switch (user.rol) {
        case 'usuario':
          return <Usuario key={id} />;
        case 'admin':
          return <Admin key={id} />;
        case 'propietario':
          return <Propietario key={id} />;
        default:
          console.warn(`Tipo de usuario desconocido: ${user.rol}`);
          return <Usuario key={id} />;
      }
    })
  }

};
