import styles from './ServicioDetail.module.css'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../../context/context.jsx';
import PostDataDetail from './PostDataDetail.js';

const ServicioDetail = () => {
  const { servicios, usuario } = useContext(Context);
  const { id } = useParams();
  const servicio = servicios.find((servicio) => servicio.servicioID === id);

  const {handleSubmit}  = PostDataDetail({servicio, usuario});



  return (
    <>
      <div className={styles.container}>
        {/* Parte de imagenes */}
        <div className={styles.center_column}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png' className={styles.img} />
          <div className={styles.center_row}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png' className={`${styles.img} ${styles.img_abajo}`} />
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png' className={`${styles.img} ${styles.img_abajo}`} />
            <img src='https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png' className={`${styles.img} ${styles.img_abajo}`} />
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
          <form onSubmit={handleSubmit}>
            <button className={styles.btn}>Reservar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ServicioDetail;
