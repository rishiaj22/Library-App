import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Books from "./pages/Books"
import Create from "./pages/Create"


import { Route,Routes } from 'react-router-dom'
import './Style/Home.css'
import "./Style/index.css"

function App() {
  return(
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/books" element={<Books/>}/>
      <Route path="/create" element= {<Create/>} />
    </Routes>
  )
}

export default App
