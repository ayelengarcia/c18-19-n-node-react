import './App.css'
import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'
import Footer from './components/Footer/Footer.jsx'
import { ContextProvider } from './context/context.jsx'
import Ingresar from "../src/components/Ingresar/Ingresar.jsx"
// import Registro from "../src/components/Ingresar/Registro.jsx"
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
          <Route path='/Ingresar' element={<Ingresar />} />
          {/* <Route path='/Registro' element={<Registro />} /> */}
        </Routes>
      
    </ContextProvider>
  )
}

export default App
