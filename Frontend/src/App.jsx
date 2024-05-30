import './App.css'
import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'
import Footer from './components/Footer/Footer.jsx'
import { ContextProvider } from './context/context.jsx'
import IniciarSesion from "../src/components/Ingresar/IniciarSesion.jsx"
import Registro from "../src/components/Ingresar/Registro.jsx"
import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <ContextProvider>
      
        <Routes>
          <Route path='/*' element={<>
            <Header />
            <Main />
            <Footer />
          </>} />
          <Route path='/Iniciar-Sesion' element={<IniciarSesion />} />
          <Route path='/Registro' element={<Registro />} />
        </Routes>
      
    </ContextProvider>
  )
}

export default App
