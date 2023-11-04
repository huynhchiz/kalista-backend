import express from "express";

import signController from '../controller/signController'
import userController from '../controller/userController'
import imageController from '../controller/imageController'
import videoController from '../controller/videoController'
import postController from '../controller/postController'

import { checkUserJwt, checkUserPermission } from '../middleware/jwtActions';
import { upload } from "../middleware/multer";

const router  = express.Router()

const initApiRoutes = (app) => {
    router.all('*', checkUserJwt, checkUserPermission);

    router.post('/register', signController.handleRegister)
    router.post('/login', signController.handleLogin)
    router.post('/logout', signController.handleLogout)
    
    router.get('/account', userController.getAccount)
    router.post('/refresh-token', userController.refreshNewToken)

    router.post('/user/avatar/upload', userController.uploadAvatar)
    router.get('/user/avatar/read', userController.getUserAvatar)
    router.post('/user/avatar/delete', userController.deleteUserAvatar)

    router.post('/image/upload-cloudinary', upload.single('image'), imageController.handleUploadImageCloudinary)
    router.post('/image/upload', imageController.handleUploadImage)

    router.post('/video/upload-cloudinary', upload.single('video'), videoController.handleUploadVideoCloudinary)
    router.post('/video/upload', videoController.handleUploadVideo)

    router.get('/post/read', postController.getPosts)

    return app.use('/api', router)
}

export default initApiRoutes