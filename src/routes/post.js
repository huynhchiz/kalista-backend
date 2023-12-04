import express from "express";

import postController from '../controller/postController'

import { checkUserJwt, checkUserPermission } from '../middleware/jwtActions';
import { upload } from "../middleware/multer";

const router  = express.Router()

const postRoutes = (app) => {
    router.all('*', checkUserJwt, checkUserPermission);

    router.post('/upload-cloudinary-image', upload.single('image'), postController.uploadImageCloudinary)
    router.post('/upload-cloudinary-video', upload.single('video'), postController.uploadVideoCloudinary)
    router.post('/upload-post', postController.uploadPost)

    router.get('/get-home-posts/:limit', postController.getHomePosts)
    router.get('/get-explore-posts/:limit', postController.getExplorePosts)

    router.post('/like-post', postController.likePost)
    router.post('/unlike-post', postController.unlikePost)

    router.get('/get-post-info/:postId', postController.getInfoOnePost)
    router.get('/get-post-comments/:postId/:limit', postController.getPostComments)

    router.post('/create-comment', postController.createComment)
    router.post('/like-comment', postController.likeComment)
    router.post('/unlike-comment', postController.unlikeComment)
    router.get('/get-comment-info/:commentId', postController.getInfoOneComment)

    return app.use('/post', router)
}

export default postRoutes