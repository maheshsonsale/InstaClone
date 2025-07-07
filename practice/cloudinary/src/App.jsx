import axios from 'axios'
import './App.css'

function App() {

   function inputhandler(e) {
    const file = e.target.files[0];
console.log(file);

    if (!file) { return }
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "chat-app")
    data.append("cloud_name", "dzmmp468g")
    
       axios.post("https://api.cloudinary.com/v1_1/dzmmp468g/image/upload", data).then((res)=>{
        console.log("uploaded successfully", res.data.url);
      }).catch((error)=>{
        console.log(error);
      })
  }

  return (
    <>
      <div style={{ backgroundColor: 'gray', width: '200px', height: '50px' }}>
        <input type="file" onChange={inputhandler} />
      </div>
    </>
  )
}

export default App
