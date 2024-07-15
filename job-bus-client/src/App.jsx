import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/Navbar/NavBar'
import Footer from './components/Footer/Footer'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;


function App() {
 
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
