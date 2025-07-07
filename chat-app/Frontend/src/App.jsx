import { Routes, Route } from "react-router-dom"
import Register from "./pages/Register.jsx"
import './App.css'
import Login from "./pages/Login.jsx"
function App() {

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/"  element={<Login />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

      </div>
    </>
  )
}

export default App
