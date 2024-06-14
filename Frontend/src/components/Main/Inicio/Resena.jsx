import React from 'react'
import { TiStar } from "react-icons/ti";
import styles from './Inicio.module.css'

export const Resena = ({ nombre, descripcion, img, fecha, puntuacion }) => {
  return (
    <div>
      <div className={styles.resenas_img_title}>
        <img src={img} alt="" className={styles.resena_img} />
        <h3 className={styles.resena_title}>{nombre}</h3>
      </div>
      <p className={styles.resenas_parrafo}>
        {descripcion}
      </p>
      <div className={styles.resenas_img_title}>
        <span className={styles.fecha}>{fecha}</span>
        <span className={styles.resena_title}><TiStar />{puntuacion}</span>
      </div>
    </div>
  )
}
