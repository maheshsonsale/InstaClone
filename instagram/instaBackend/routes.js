import express from 'express'
import * as method from './methods.js'
import AuthMiddleware from './middlewares/AuthMiddleware.js'
let rout=express()

rout.post('/Auth',method.Auth) // registration
rout.post('/create',method.registration) // registration
rout.post('/login',method.login) // login
rout.post('/createpost',AuthMiddleware,method.createpost)  // post create
rout.get('/myposts',AuthMiddleware,method.MyPosts) // show all post in feed
rout.get('/logout',method.logout)   // logout handler
rout.get('/profile',AuthMiddleware,method.profile) //loading data for profle to see 
rout.post('/updatebio',AuthMiddleware,method.updatebio)    // 
rout.get('/allposts',AuthMiddleware,method.allposts)
rout.get('/sideprofile',AuthMiddleware,method.sideprofile)
rout.put('/likes',AuthMiddleware,method.likes)
rout.post('/comments',AuthMiddleware,method.comments)
rout.post('/deletepost',AuthMiddleware,method.deletepost)
rout.post('/followers',AuthMiddleware,method.followers)
rout.post('/following',AuthMiddleware,method.following)
rout.post('/otherPersonPosts',AuthMiddleware,method.otherPersonPosts)
rout.post('/loadAllComments',AuthMiddleware,method.loadAllComments)
rout.post('/editPic',AuthMiddleware,method.editPic)
rout.post('/search',method.search)
// rout.get('/hi',AuthMiddleware,method.hi)
// rout.post('/likeunlike',method.likeunlike)


export default rout