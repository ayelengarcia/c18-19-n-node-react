import './App.css'
import Header from './components/Header/Header.jsx'
import Main from './components/Main/Main.jsx'
import Footer from './components/Footer/Footer.jsx'
import { ContextProvider } from './context/context.jsx'
import Ingresar from "../src/components/Ingresar/Ingresar.jsx"
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
          <Route path='/ingresar' element={<Ingresar />} />
        </Routes>
      
    </ContextProvider>
  )
}

export default App
