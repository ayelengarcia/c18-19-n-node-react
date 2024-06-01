import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import servicios from "../components/Main/Servicios/servicios.json";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState('');

  const navigateTo = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigateTo('/Servicios');
  };
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  useEffect(() => {
    if (busqueda == '') {
      setServiciosFiltrados(servicios);
    } else {
      const filtro = servicios.filter(element => {
        return (
          element.titulo.toLowerCase().includes(busqueda.toLowerCase())
          ||
          element.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
      })
      setServiciosFiltrados(filtro)
    }
  }, [busqueda]);

  return (
    <Context.Provider value={{ busqueda, setBusqueda, handleSubmit, serviciosFiltrados, setServiciosFiltrados }}>
      {children}
    </Context.Provider>
  )
}

export default Context;