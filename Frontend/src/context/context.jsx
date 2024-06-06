import { createContext, useState, useEffect, useRef } from "react";
import servicios from "../components/Main/Servicios/servicios.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Context = createContext();

export const ContextProvider = ({ children }) => {
  //Instancia para Redirecciones
  const navigate = useNavigate();

  //LOGICA BUSCADOR/FILTRO
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


  //LOGICA ESTILO ACTIVE COMPONENTE INGRESAR/INICIAR-SECION/REGISTRO
  const [login, setLogin] = useState(true);
  const loginRef = useRef(null);

  const navLink = (e) => {
    window.document.querySelector(".active")?.classList.remove("active");
    e.target.classList.add("active");
  }

  const handleLogin = (e) => {
    navLink(e);
    setLogin(true);
  }

  const handleRegistro = (e) => {
    navLink(e);
    setLogin(false);
  }


  //TOAST PARA MENSAJES DE EXITO Y ERROR
  const msgError = (msg) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  
  const msgSuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  
  //ESTADO DE LA SESION
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Context.Provider value={{ busqueda, setBusqueda, handleSubmit, serviciosFiltrados, setServiciosFiltrados, selectedOption, handleSelectChange, loggedIn, handleLogin, handleRegistro, login, setLogin, loginRef, setLoggedIn, msgError, msgSuccess, navigate }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
