
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer'
import Projects from './Pages/Projects'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import { toast, ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { TokenAuthContext } from './ContextAPI/TokenAuth'

function App() {

const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Home/>}></Route>
      <Route path='/login' element={<Auth/>}></Route>
      <Route path='/register' element={<Auth register/>}></Route>
      <Route path='/projects' element={isAuthorized?<Projects/>:<Home/>}></Route>
    </Routes>
     <Footer/>
    </>
  )
}

export default App
