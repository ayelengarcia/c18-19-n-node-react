import { createContext, useState, useEffect } from "react";
import servicios from "../components/Main/Servicios/servicios.json";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  function handleSelectChange(event) {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    let serviciosFiltradosTemp = servicios;

    // Filtro por categoría
    if (selectedOption) {
      serviciosFiltradosTemp = serviciosFiltradosTemp.filter(element => element.categoria == selectedOption);
    }

    // Filtro de texto
    if (busqueda) {
      serviciosFiltradosTemp = serviciosFiltradosTemp.filter(element =>
        element.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        element.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setServiciosFiltrados(serviciosFiltradosTemp);
  }, [busqueda, selectedOption]);

  return (
    <Context.Provider value={{ busqueda, setBusqueda, handleSubmit, serviciosFiltrados, setServiciosFiltrados, selectedOption, handleSelectChange }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
