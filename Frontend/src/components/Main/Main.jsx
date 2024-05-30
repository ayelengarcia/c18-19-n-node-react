import styles from './Main.module.css'
import { Route, Routes, Navigate } from "react-router-dom"
import Inicio from "./Inicio/Inicio.jsx"
import Servicios from "./Servicios/Servicios.jsx"
import Contacto from "./Contacto/Contacto.jsx"
import IniciarSesion from "./Ingresar/IniciarSesion.jsx"
import Registro from "./Ingresar/Registro.jsx"
import ServicioDetail from "./Servicios/ServicioDetail.jsx"

const Main = () => {
  return (
    <div className={styles.container}>
      <Routes>

        <Route path='/' element={<Inicio />} />
        <Route path='Servicios' element={<Servicios />} />
        <Route path='Servicios/:id' element={<ServicioDetail />} />
        <Route path='Contacto' element={<Contacto />} />

        <Route path='Iniciar-Sesion' element={<IniciarSesion />} />
        <Route path='Registro' element={<Registro />} />

        <Route path='/*' element={<Navigate to="/"/>} />
        
      </Routes>
    </div>
  )
}

export default Main