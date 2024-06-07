import { createContext, useState, useEffect } from "react";
import servicios from "../components/Main/Servicios/servicios.json";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  //console.log(loggedIn)

  function handleSelectChange(event) {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  //uso el token para poder manipular el estado de logueo y poder actualizar los componentes que necesiten actualizarse luego de hacer el login
  useEffect(() => {
    //obtengo el token desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    const savedToken = localStorage.getItem('token');
    //si el token ya existe actualizo el estado
    if(token){
      setLoggedIn(true)
    }
    //con el token de la URL acualizo el estado
    if (urlToken) {
      setToken(urlToken);
      setLoggedIn(true);
      localStorage.setItem('token', urlToken);
      //quito el token de la URL por seguridad
      window.history.replaceState(null, '', window.location.pathname); 
    } else if (savedToken) {
      setToken(savedToken);
      setLoggedIn(true);
    }
  }, []);

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
    <Context.Provider value={{ busqueda, setBusqueda, handleSubmit, serviciosFiltrados, setServiciosFiltrados, selectedOption, handleSelectChange, loggedIn, setLoggedIn }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
