import express from 'express';
import './config/DB.js'
import router from './routes/userRoutes.js';
import cors from 'cors'

const PORT = 5000;
const app = express()


app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json())
app.use('/',router)


// app.get('/', (req, res) => {
//   res.send('API is running...');
// });


app.listen(PORT, () => {
    console.log(`server running at ${PORT}  port`)
});