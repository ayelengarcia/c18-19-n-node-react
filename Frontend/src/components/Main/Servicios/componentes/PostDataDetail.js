import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Context from "../../../../context/context.jsx";

function PostDataDetail({ servicio, usuario, setIsSuccess, setReservaId, setIsLoading }) {

  const { authToken } = useContext(Context);

  const [postData, setPostData] = useState({
    servicioId: '',
    usuarioId: '',
    usuarioReserva: '',
    servicioReservado: ''
  });

  useEffect(() => {
    if (servicio && usuario[0]) {
      setPostData({
        servicioId: servicio.servicioID,
        usuarioId: usuario[0].usuarioId,
        usuarioReserva: usuario[0].nombre,
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

