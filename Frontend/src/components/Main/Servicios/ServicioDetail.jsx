import styles from './ServicioDetail.module.css'
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import Context from '../../../context/context.jsx';
import PostDataDetail from './componentes/PostDataDetail.js';
import { BtnBack } from './componentes/BtnBack.jsx';
import { MsjExito } from './componentes/MsjExito.jsx';
import { Button, Stack } from '@chakra-ui/react'
import { ToastContainer } from "react-toastify";

const ServicioDetail = () => {
  const { servicios, usuario } = useContext(Context);
  const { id } = useParams();
  const servicio = servicios.find((servicio) => servicio.servicioID === id);

  const [isSuccess, setIsSuccess] = useState(false)
  const [reservaId, setReservaId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit } = PostDataDetail({ servicio, usuario, setIsSuccess, setReservaId, setIsLoading });

  return (
    <>
      {!isSuccess && servicio ? (
        <div className={styles.container}>
          <BtnBack></BtnBack>
          {/* Parte de imagenes */}
          <div className={styles.center_column}>
            <img src={servicio.imagen} className={styles.img} />
            <div className={styles.center_row}>
              <img src={servicio.imagen} className={`${styles.img} ${styles.img_abajo}`} />
              <img src={servicio.imagen} className={`${styles.img} ${styles.img_abajo}`} />
              <img src={servicio.imagen} className={`${styles.img} ${styles.img_abajo}`} />
            </div>
          </div>
          {/* Parte de texto */}
          <div className={styles.container_text}>
            <div>
              <h1 className={styles.titulo}>{servicio.titulo}</h1>
              <p>{servicio.descripcion}</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum provident ab quaerat illum adipisci accusamus aut, aperiam, beatae, consequuntur aliquam neque aspernatur doloribus facere porro magni dicta minus? Placeat, fugit.</p>
            </div>
            <div className={styles.center_row}>
              <p className={styles.fecha_hora}>{servicio.fecha}</p>
              <p className={styles.fecha_hora}>{servicio.hora}</p>
            </div>
            <form onSubmit={handleSubmit}>
              <Stack>
                <Button
                  isLoading={isLoading}
                  loadingText='Cargando datos'
                  colorScheme='teal'
                  variant='outline'
                  spinnerPlacement='end'
                  type='submit'
                  className={styles.btn}
                >
                  Confirmar reserva
                </Button>
              </Stack>
            </form>
          </div>
        </div>
      ) : (
        <MsjExito usuario={usuario} servicio={servicio} reservaId={reservaId} />
      )}
      <ToastContainer />
    </>
  );
};

export default ServicioDetail;
