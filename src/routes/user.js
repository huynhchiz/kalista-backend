import express from "express";

import userController from '../controller/userController'
import followController from '../controller/followController'

const router  = express.Router()

const userRoutes = (app) => {

    router.get('/get-info/:userId', userController.getOtherUserInfo)
    router.get('/get-followers/:userId', followController.getFollowers)
    router.get('/get-followings/:userId', followController.getUsersFollowing)

    return app.use('/user', router)
}

export default userRoutes