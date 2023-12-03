import express from "express";
import messageController from '../controller/messageController'


import { checkUserJwt, checkUserPermission } from '../middleware/jwtActions';

const router  = express.Router()

const messageRoutes = (app) => {
    router.all('*', checkUserJwt, checkUserPermission);

    router.get('/get-list-chatbox/:limit', messageController.getListChatbox)
    router.get('/get-chatbox/:userId/:limit', messageController.getChatbox)

    

    return app.use('/message', router)
}

export default messageRoutes