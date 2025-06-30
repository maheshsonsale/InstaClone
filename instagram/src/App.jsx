import Register from "./pages/Register"
import Login from "./pages/Login"
import HomePage from "./pages/HomePage"
import CreatePost from "./pages/CreatePost"
import ProfilePage from "./pages/ProfilePage"
import FeedPage from "./pages/FeedPage"
import './App.css'
import { Routes, Route } from "react-router-dom"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/" element={<HomePage />} >
          <Route path="profile" element={<ProfilePage />} />
          <Route path="createpost" element={<CreatePost />} />
          <Route path="feedpage" element={<FeedPage />} />
          <Route index  element={<FeedPage />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
