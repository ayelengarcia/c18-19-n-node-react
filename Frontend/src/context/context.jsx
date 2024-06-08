import { createContext, useState, useEffect, useRef } from "react";
// import servicios from "../data/servicios.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Context = createContext();

export const ContextProvider = ({ children }) => {

  //LOGICA MANUPULACION DE ESTADOS DE LOGGIN Y TOKEN
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Obtener token desde la URL o localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get('token');
  const savedToken = localStorage.getItem('token');
  const authToken = urlToken || savedToken

  //Uso el token para poder manipular el estado de logueo y poder actualizar los componentes que necesiten actualizarse luego de hacer el login
  useEffect(() => {
    //si el token ya existe actualizo el estado
    if (token) {
      setLoggedIn(true)
    }
    //con el token de la URL actualizo el estado
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

  //TRAIGO LA API DE SERVICIOS
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/servicios")
      .then(response => {
        setServicios(response.data);
      })
      .catch(error => {
        console.error("Error al obtener servicios:", error);
      });
  }, []);


  //TRAIGO LA API DE USER
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        console.log("Using token:", authToken); // Verifica el token
        const response = await axios.get("http://127.0.0.1:3000/user", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log("Datos de usuarios recibidos:", response.data); // Verifica la respuesta
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    if (authToken) {
      fetchUsuarios();
    } else {
      console.error("Token no disponible");
    }
  }, [authToken]);


  //Instancia para Redirecciones
  const navigate = useNavigate();

  //LOGICA BUSCADOR/FILTRO
  const [busqueda, setBusqueda] = useState('');
  const [selectedFecha, setSelectedFecha] = useState('');
  const [selectedHora, setSelectedHora] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);


  const handleSelectedFecha = (e) => {
    const selectedFecha = e.target.value;
    setSelectedFecha(selectedFecha);
  };

  const handleSelectedHora = (e) => {
    const selectedHora = e.target.value;
    setSelectedHora(selectedHora);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    let serviciosFiltradosTemp = servicios;

    // Filtro por fecha
    if (selectedFecha) {
      serviciosFiltradosTemp = serviciosFiltradosTemp.filter(element => element.fecha === selectedFecha);
    }

    // Filtro por hora
    if (selectedHora) {
      serviciosFiltradosTemp = serviciosFiltradosTemp.filter(element => element.hora === selectedHora);
    }

    // Filtro de texto
    if (busqueda) {
      serviciosFiltradosTemp = serviciosFiltradosTemp.filter(element =>
        element.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        element.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setServiciosFiltrados(serviciosFiltradosTemp);
  }, [busqueda, selectedFecha, selectedHora, servicios]);



  //LOGICA ESTILO ACTIVE COMPONENTE INGRESAR/INICIAR-SESION/REGISTRO
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


  return (
    <Context.Provider value={{ busqueda, setBusqueda, handleSubmit, serviciosFiltrados, setServiciosFiltrados, selectedFecha, selectedHora, handleSelectedFecha, handleSelectedHora, loggedIn, handleLogin, handleRegistro, login, setLogin, loginRef, setLoggedIn, msgError, msgSuccess, navigate, servicios, usuarios }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
