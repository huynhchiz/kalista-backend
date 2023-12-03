import express from "express";

import accountController from '../controller/accountController'
import { checkUserJwt, checkUserPermission } from '../middleware/jwtActions';

const router  = express.Router()

const accountRoutes = (app) => {
    router.all('*', checkUserJwt, checkUserPermission);

    router.post('/register', accountController.register)
    router.post('/login', accountController.login)
    router.post('/logout', accountController.logout)

    router.get('/get-info', accountController.getInfo)
    router.post('/refresh-token', accountController.refreshToken)
    router.get('/get-posts/:limit', accountController.getPosts)

    router.post('/upload-avatar', accountController.uploadAvatar)
    router.get('/get-avatar', accountController.getAvatar)
    router.post('/delete-avatar', accountController.deleteAvatar)
    
    router.post('/follow', accountController.follow)
    router.post('/unfollow', accountController.unfollow)

    router.get('/get-followers/:limit', accountController.getFollowers)
    router.get('/get-followings/:limit', accountController.getFollowings)

    return app.use('/account', router)
}

export default accountRoutes