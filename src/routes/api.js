import express from "express";

import signController from '../controller/signController'

const router  = express.Router()

const initApiRoutes = (app) => {
    router.post('/register', signController.handleRegister)

    return app.use('/api', router)
}

export default initApiRoutes