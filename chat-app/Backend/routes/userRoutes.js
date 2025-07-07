import express from 'express'
import {register,authUser} from '../controller/userController.js'


const router=express.Router()

router.post('/login',authUser)
router.post('/register',register)

export default router