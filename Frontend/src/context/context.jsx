import { createContext, useState, useEffect, useRef } from "react";
import servicios from "../data/servicios.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import axios from "axios";


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

  //TRAIGO LA API DE SERVICIOS
  // const [servicios, setServicios] = useState([]);

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:3000/servicios", {
  //     headers: {
  //       Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NjI0ZjQ0NGI4NWMzOWYwZGY0NjE1NiIsImVtYWlsIjoiYXllbGVuZ2FyY2lhN0BnbWFpbC5jb20ifSwiaWF0IjoxNzE3NzI2MjAxLCJleHAiOjE3MTc3Mjk4MDF9.6GnDUejak8BwXRqqT9PVxAOKiBR_Ax9xxZkz9BcdK8k",
  //     },
  //   })
  //     .then(response => {
  //       setServicios(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error al obtener servicios:", error);
  //     });
  // }, []);

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
  }, [busqueda, selectedOption, servicios]);


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
    <Context.Provider value={{ busqueda, setBusqueda, handleSubmit, serviciosFiltrados, setServiciosFiltrados, selectedOption, handleSelectChange, loggedIn, handleLogin, handleRegistro, login, setLogin, loginRef, setLoggedIn, msgError, msgSuccess, navigate, servicios }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
