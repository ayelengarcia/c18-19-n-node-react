import styles from './Buscador.module.css'
import { useContext } from "react";
import Context from '../../context/context.jsx';
import Filtro from "./Filtro.jsx"

export const Buscador = () => {
  const { busqueda, setBusqueda, handleSubmit } = useContext(Context);
    
    return (
        <form
            className={styles.container_input}
            onSubmit={handleSubmit}
        >
            <input  className={styles.input}
                type="text"
                name='busqueda'
                autoComplete='off'
                placeholder='Busca tu espacio favorito... 🔍'
                value={busqueda}
                onChange={event => setBusqueda(event.target.value)}
        />
        <Filtro />
        </form>
    )
}
