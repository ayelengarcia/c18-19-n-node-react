import styles from './ServicioDetail.module.css'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../../context/context.jsx';
import PostDataDetail from './PostDataDetail.js';
import { BtnBack } from './BtnBack.jsx';

const ServicioDetail = () => {
  const { servicios, usuario } = useContext(Context);
  const { id } = useParams();
  const servicio = servicios.find((servicio) => servicio.servicioID === id);

  const { handleSubmit } = PostDataDetail({ servicio, usuario });

  return (
<<<<<<< HEAD
    <div className={styles.container_detail} key={servicio._id}>
      <img className={styles.img_detail} src={servicio.imagen} alt={servicio.titulo} />
      <div>
        <h2>{servicio.titulo}</h2>
        <div className={styles.detalles}>
          <p>{servicio.descripcion}</p>
          <p>{servicio.disponible ? 'Disponible' : 'No disponible'}</p>
          <p>{servicio.categoria}</p>
        </div>
        <button className={styles.btn}>Confirmar reserva</button>
      </div>
    </div>
=======
    <>
      {servicio &&
        <div className={styles.container}>
          <BtnBack></BtnBack>
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
      }
    </>
>>>>>>> 32d85efae4fdd1d28d391857dd5562c347fedd62
  );
};

export default ServicioDetail;
