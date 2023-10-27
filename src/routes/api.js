import express from "express";
import signController from '../controller/signController'
import themeController from '../controller/themeController'
import userController from '../controller/userController'
import { checkUserJwt, checkUserPermission } from '../middleware/jwtActions';

const router  = express.Router()

const initApiRoutes = (app) => {
    router.all('*', checkUserJwt, checkUserPermission);

    router.post('/register', signController.handleRegister)
    router.post('/login', signController.handleLogin)
    router.get('/account', userController.getAccount)
    router.post('/refresh-token', userController.refreshNewToken)

    router.get('/theme/read', themeController.handleGetTheme)

    return app.use('/api', router)
}

export default initApiRoutes