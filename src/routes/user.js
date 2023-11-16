import express from "express";

import userController from '../controller/userController'
import { checkUserJwt, checkUserPermission } from '../middleware/jwtActions';

const router  = express.Router()

const userRoutes = (app) => {
    router.all('*', checkUserJwt, checkUserPermission);

    router.get('/get-user-info/:userId', userController.getInfo)
    router.get('/get-user-posts/:userId/:limit', userController.getUserPosts)
    // router.get('/get-followers/:userId', followController.getFollowers)
    // router.get('/get-followings/:userId', followController.getUsersFollowing)

    return app.use('/user', router)
}

export default userRoutes