import express from "express";

import userController from '../controller/userController'
import { checkUserJwt, checkUserPermission } from '../middleware/jwtActions';

const router  = express.Router()

const userRoutes = (app) => {
    router.all('*', checkUserJwt, checkUserPermission);

    router.get('/get-user-info/:userId', userController.getInfo)
    router.get('/get-user-posts/:userId/:limit', userController.getUserPosts)
    router.get('/get-user-followers/:userId/:limit', userController.getFollowers)
    router.get('/get-user-followings/:userId/:limit', userController.getFollowings)
    router.get('/get-search-users/:searchValue/:limit', userController.searchUsers)
    

    return app.use('/user', router)
}

export default userRoutes