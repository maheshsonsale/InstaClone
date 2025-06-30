import express from 'express'
import * as method from './methods.js'
import AuthMiddleware from './AuthMiddleware.js'
let rout=express()

rout.post('/create',method.creatUserProfile) // registration
rout.post('/find',method.getUserProfile) // login
rout.post('/createpost',AuthMiddleware,method.createpost)  // post create
rout.get('/myposts',AuthMiddleware,method.MyPosts) // show all post in feed
rout.get('/logout',method.logout)   // logout handler
rout.get('/profile',AuthMiddleware,method.profile) //loading data for profle to see 
rout.post('/updatebio',AuthMiddleware,method.updatebio)    // 
rout.get('/allposts',AuthMiddleware,method.allposts)
rout.get('/sideprofile',AuthMiddleware,method.sideprofile)
rout.put('/likes',AuthMiddleware,method.likes)
// rout.post('/likeunlike',method.likeunlike)


export default rout