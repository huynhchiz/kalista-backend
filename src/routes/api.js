import express from "express";
import signController from '../controller/signController'
import userController from '../controller/userController'
import imageController from '../controller/imageController'

import { checkUserJwt, checkUserPermission } from '../middleware/jwtActions';
import { upload } from "../middleware/multer";

const router  = express.Router()

const initApiRoutes = (app) => {
    router.all('*', checkUserJwt, checkUserPermission);

    router.post('/register', signController.handleRegister)
    router.post('/login', signController.handleLogin)
    router.get('/account', userController.getAccount)
    router.post('/refresh-token', userController.refreshNewToken)

    router.post('/image/upload-cloudinary', upload.single('image'), imageController.handleUploadImageCloudinary)
    router.post('/image/upload', imageController.handleUploadImage)

    return app.use('/api', router)
}

export default initApiRoutes