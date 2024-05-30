import styles from './Main.module.css'
import { Route, Routes, Navigate } from "react-router-dom"
import Inicio from "./Inicio/Inicio.jsx"
import Servicios from "./Servicios/Servicios.jsx"
import Contacto from "./Contacto/Contacto.jsx"
import ServicioDetail from "./Servicios/ServicioDetail.jsx"


  const Main = () => {
  
  return (
    <div className={styles.container}>
      <Routes>

        <Route path="/" element={<Inicio />} />
        <Route path='/servicios' element={<Servicios />} />
        <Route path='/servicios/:id' element={<ServicioDetail />} />
        <Route path='/contacto' element={<Contacto />} />

        <Route path='/*' element={<Navigate to="/"/>} />
        
      </Routes>
    </div>
  )
}

export default Main