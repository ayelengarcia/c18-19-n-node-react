import React from 'react'
import styles from './Inicio.module.css'
import { NavLink } from 'react-router-dom'

export const Servicio = ({img, name, cantidad, categoria}) => {
    return (
      <div>
          <NavLink className={styles.navlink} to={`/servicios/${categoria}`}>
            <img src={img} alt="" className={styles.servicio_img} />
            <h3 className={styles.servicio_title}>{name}</h3>
            <span className={styles.servicio_cantidad}>{cantidad}</span>
          </NavLink>
        </div>
    )
}
