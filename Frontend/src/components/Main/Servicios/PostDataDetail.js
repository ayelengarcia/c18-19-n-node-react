import { useState, useEffect } from 'react';
import axios from 'axios';

function PostDataDetail({ servicio, usuario }) {

  const [postData, setPostData] = useState({
    servicioId: '',
    usuarioId: '',
    usuarioReserva: '',
    servicioReservado: ''
  });

  useEffect(() => {
    if(servicio && usuario[0]) {
      setPostData({
        servicioId: servicio.servicioID,
        usuarioId: usuario[0].usuarioId,
        usuarioReserva: usuario[0].nombre,
        servicioReservado: servicio.titulo
      });
    }
  }, [servicio, usuario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:3000/reservas", postData)
      .then(response => {
        console.log('Respuesta:', response.data);
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      });
  };
  return ({ handleSubmit })

}

export default PostDataDetail;

