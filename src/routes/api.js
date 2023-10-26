import express from "express";
import signController from '../controller/signController'
import themeController from '../controller/themeController'

const router  = express.Router()

const initApiRoutes = (app) => {
    router.post('/register', signController.handleRegister)
    router.post('/login', signController.handleLogin)

    router.get('/theme/read', themeController.handleGetTheme)

    return app.use('/api', router)
}

export default initApiRoutes