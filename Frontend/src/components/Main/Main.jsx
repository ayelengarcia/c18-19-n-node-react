import styles from './Main.module.css'
import { Route, Routes, Navigate } from "react-router-dom"
import Inicio from "./Inicio/Inicio.jsx"
import Servicios from "./Servicios/Servicios.jsx"
import ServicioCategoria from "./Servicios/ServiciosCategoria.jsx"
import ServicioDetail from "./Servicios/ServicioDetail.jsx"
import { Panel } from './Panel/Panel.jsx'

import Contacto from "./Contacto/Contacto.jsx"
import Galeria from './Galeria2/Galeria2.jsx'

  const Main = () => {
  
  return (
    <div className={styles.container}>
      <Routes>

        <Route path="/" element={<Inicio />} />
        <Route path='/servicios' element={<Servicios />} />
        <Route path='/servicios/:categoria' element={<ServicioCategoria />} />

        <Route path='/servicios/:categoria/:id' element={<ServicioDetail />} />
        <Route path='/galeria' element={<Galeria />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/panel' element={<Panel />} />


        <Route path='/*' element={<Navigate to="/"/>} />
        
      </Routes>
    </div>
  )
}

export default Main