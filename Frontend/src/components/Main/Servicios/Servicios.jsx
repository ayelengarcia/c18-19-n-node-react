import styles from './Servicios.module.css'
// import servicios from "./servicios.json";
import ServicioCard from "./ServicioCard.jsx"
// import { useState, useEffect } from 'react';
import { useContext } from "react";
import Context from '../../../context/context.jsx';

// const Servicios = ({ busqueda }) => {
const Servicios = () => {
  const { serviciosFiltrados } = useContext(Context);
  // const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  // useEffect(() => {
  //   if (busqueda == '') {
  //     setServiciosFiltrados(servicios);
  //   } else {
  //     const filtro = servicios.filter(element => {
  //       return (
  //         element.titulo.toLowerCase().includes(busqueda.toLowerCase())
  //         ||
  //         element.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
  //     })
  //     setServiciosFiltrados(filtro)
  //   }
  // }, [busqueda]);
  // console.log('Servicios filtrados', serviciosFiltrados);

  return (
    <div className={styles.container_servicios}>
      {serviciosFiltrados.map((servicio) => {
        return (
          <ServicioCard
            id={servicio.id}
            key={servicio.id}
            titulo={servicio.titulo}
            descripcion={servicio.descripcion}
            imagen={servicio.imagen}
            disponibilidad={servicio.disponibilidad}
            fecha={servicio.fecha}
            hora={servicio.hora}
            categoria={servicio.categoria}
          />
        );
      })}
    </div>
  )
}

export default Servicios