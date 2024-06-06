import styles from './Ingresar.module.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Context from '../../context/context.jsx';

const Iniciar_sesion = () => {
  const { msgError, msgSuccess, loggedIn, setLoggedIn, navigate } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Iniciaste sesión')
      msgSuccess("Sesión iniciada con éxito")

      setLoggedIn(true);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response.data);
      msgError("Error al iniciar sesión. Registrese o vuelva a intentar")
    }
  };
  
  if (loggedIn) {
    navigate("/")
  }

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} className={styles.form} >
        <input
          type="email"
          placeholder="Correo electrónico*"
          className={styles.standar}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='username'
        />
        <input
          type="password"
          placeholder="Contraseña*"
          className={styles.standar}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
        <button type="submit" className={styles.btn}>Ingresar</button>
        <NavLink to="/Registro" className={styles.parrafo}>Olvidé mi contraseña</NavLink>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Iniciar_sesion;