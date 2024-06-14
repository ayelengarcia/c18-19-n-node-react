import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from "../../../../context/context.jsx";

function PostDataDetail({ servicio, usuario, setIsSuccess, setReservaId, setIsLoading }) {

  const { authToken } = useContext(Context);

  const [postData, setPostData] = useState({
    servicioId: '',
    usuarioId: '',
    usuarioReserva: '',
    servicioReservado: '',
  });
  useEffect(() => {
    if (servicio && usuario) {
      //console.log("usuario",usuario)
      //console.log("servicio",servicio)
      setPostData({
        servicioId: servicio._id,
        usuarioId: usuario._id,
        usuarioReserva: usuario.nombre,
        servicioReservado: servicio.titulo,
      });
    }
  }, [servicio, usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:3000/reservas", postData, {
      headers: {
        authorization: 'Bearer ' + authToken
      }
    })
      .then(response => {
        console.log('Respuesta:', response.data);
        setReservaId(response.data.reservaId);
        setIsSuccess(true);
      })
      .then(() => {
        console.log('Estado del servicio actualizado correctamente');
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return ({ handleSubmit })
}

export default PostDataDetail;

