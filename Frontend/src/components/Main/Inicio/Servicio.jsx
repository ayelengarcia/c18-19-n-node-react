import React from 'react'
import styles from './Inicio.module.css'

export const Servicio = ({img, name, cantidad}) => {
    return (
        <div>
            <img src={img} alt="" className={styles.servicio_img} />
            <h3 className={styles.servicio_title}>{name}</h3>
            <span className={styles.servicio_cantidad}>{cantidad}</span>
        </div>
    )
}
