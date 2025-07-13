import express from 'express'
import rout from './routes.js'
// import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({origin:'http://localhost:5173',credentials:true}))
// app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())

app.use(rout)

app.listen(5000, () => {
    console.log("server running at 5000 port");
})