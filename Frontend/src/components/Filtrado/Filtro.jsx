import styles from './Buscador.module.css'
import { useContext } from "react";
import Context from '../../context/context';

function Filtro() {


    const { selectedOption, handleSelectChange } = useContext(Context);
    return (
        <select value={selectedOption} onChange={handleSelectChange} className={styles.select}>
            <option value="">Filtrar</option>
            <option value="Oficina">Oficinas</option>
            <option value="Sala de reunion">Salas</option>
            <option value="Evento">Auditorios</option>
        </select>
    );
}

export default Filtro;
