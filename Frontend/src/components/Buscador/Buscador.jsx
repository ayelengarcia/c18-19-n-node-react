import styles from './Buscador.module.css'
import { useContext } from "react";
import Context from '../../context/context';

export const Buscador = () => {

  const { busqueda, setBusqueda, handleSubmit } = useContext(Context);
    
    return (
        <form
            action=""
            onSubmit={handleSubmit}
        >
            <input  className={styles.input}
                type="text"
                name='busqueda'
                autoComplete='off'
                placeholder='Ingresa el nombre de la sede...'
                value={busqueda}
                onChange={event => setBusqueda(event.target.value)}
            />
        </form>
    )
}
