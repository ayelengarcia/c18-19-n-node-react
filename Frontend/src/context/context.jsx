import { createContext, useState, useEffect, useRef } from "react";
// import servicios from "../data/servicios.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useJwt } from "react-jwt";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  //LOGICA MANIPULACION DE ESTADOS DE LOGGIN Y TOKEN
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Obtener token desde la URL o localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get("token");
  const savedToken = localStorage.getItem("token");
  const authToken = urlToken || savedToken;

  //Uso el token para manipular el estado de logueo y poder actualizar los componentes que necesiten luego de hacer el login
  useEffect(() => {
    //si el token ya existe actualizo el estado
    if (token) {
      setLoggedIn(true);
    }
    //con el token de la URL actualizo el estado
    if (urlToken) {
      setToken(urlToken);
      setLoggedIn(true);
      localStorage.setItem("token", urlToken);
      //quito el token de la URL por seguridad
      window.history.replaceState(null, "", window.location.pathname);
    } else if (savedToken) {
      setToken(savedToken);
      setLoggedIn(true);
    }
  }, []);

  //TRAIGO LA API DE SERVICIOS
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/servicios")
      .then((response) => {
        setServicios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener servicios:", error);
      });
  }, []);

  //TRAIGO LA API DE USER/:ID
  const [usuario, setUsuario] = useState([]);

  // Decodificar el token para obtener el id de mongo del usuario
  const { decodedToken } = useJwt(authToken);
  const usuarioId = decodedToken?.user?._id;

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        if (authToken && usuarioId) {
          const response = await axios.get(
            `http://127.0.0.1:3000/user/${usuarioId}`,
            {
              headers: {
                Authorization: authToken,
              },
            }
          );
          setUsuario([response.data]);
        } else {
          console.error("Token o usuario ID no disponibles");
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      }
    };

    if (authToken && usuarioId) {
      fetchUsuario();
    }
  }, [authToken, usuarioId]);

  //Instancia para Redirecciones
  const navigate = useNavigate();

  //LOGICA BUSCADOR/FILTRO
  const [busqueda, setBusqueda] = useState("");
  const [selectedFecha, setSelectedFecha] = useState("");
  const [selectedHora, setSelectedHora] = useState("");
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

  const clearFilters = () => {
    setSelectedFecha("");
    setSelectedHora("");
    setBusqueda("")
  };

  useEffect(() => {
    let serviciosFiltradosTemp = servicios;

    // Filtro de texto
    if (busqueda) {
      serviciosFiltradosTemp = serviciosFiltradosTemp.filter(
        (element) =>
          element.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          element.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtro por fecha
    if (selectedFecha) {
      serviciosFiltradosTemp = serviciosFiltradosTemp.filter(
        (element) => element.fecha === selectedFecha
      );
    }

    // Filtro por hora
    if (selectedHora) {
      serviciosFiltradosTemp = serviciosFiltradosTemp.filter(
        (element) => element.hora === selectedHora
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
  };

  const handleLogin = (e) => {
    navLink(e);
    setLogin(true);
  };

  const handleRegistro = (e) => {
    navLink(e);
    setLogin(false);
  };

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
    <Context.Provider
      value={{
        busqueda,
        setBusqueda,
        handleSubmit,
        serviciosFiltrados,
        setServiciosFiltrados,
        selectedFecha,
        selectedHora,
        handleSelectedFecha,
        handleSelectedHora,
        loggedIn,
        handleLogin,
        handleRegistro,
        login,
        setLogin,
        loginRef,
        setLoggedIn,
        msgError,
        msgSuccess,
        navigate,
        servicios,
        usuario,
        clearFilters
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
