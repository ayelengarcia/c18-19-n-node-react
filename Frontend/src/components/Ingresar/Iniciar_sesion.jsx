import styles from './Ingresar.module.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import Context from '../../context/context';

const Iniciar_sesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //traigo del Context el callback para setear el estado loggedIn
  const { setLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Iniciaste sesión')

      setLoggedIn(true);
      //navego al inicio luego de loguear para no perder el estado y no se vuelva a setear en false
      navigate("/");
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response.data);
    }
  };

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
    </div>
  );
};

export default Iniciar_sesion;