import styles from './ServicioDetail.module.css'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../../context/context.jsx';

const ServicioDetail = () => {
  const { servicios } = useContext(Context);

  const { id } = useParams();
  const servicio = servicios.find((servicio) => servicio.servicioID === id);

  return (
    <>
    {console.log(servicio)}

      <div className={styles.container}>
        {/* Parte de imagenes */}
        <div className={styles.center_column}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png' className={styles.img}/>
          <div className={styles.center_row}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png' className={`${styles.img} ${styles.img_abajo}`}/>
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png' className={`${styles.img} ${styles.img_abajo}`}/>
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png' className={`${styles.img} ${styles.img_abajo}`}/>
          </div>
        </div>
        {/* Parte de texto */}
        <div className={styles.container_text}>
          <div>
            <h1 className={styles.titulo}>{servicio.titulo}</h1>
            <p>{servicio.descripcion} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum provident ab quaerat illum adipisci accusamus aut, aperiam, beatae, consequuntur aliquam neque aspernatur doloribus facere porro magni dicta minus? Placeat, fugit.</p>
          </div>
          <div className={styles.center_row}>
            <p className={styles.fecha_hora}>{servicio.fecha}</p>
            <p className={styles.fecha_hora}>{servicio.hora}</p>
          </div>
          <button className={styles.btn}>Reservar</button>
        </div>
      </div>
    </>
  );
};

export default ServicioDetail;
