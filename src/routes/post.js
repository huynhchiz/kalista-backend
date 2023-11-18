import express from "express";

import postController from '../controller/postController'
import commentPostController from "../controller/commentPostController";

import { checkUserJwt, checkUserPermission } from '../middleware/jwtActions';
import { upload } from "../middleware/multer";

const router  = express.Router()

const postRoutes = (app) => {
    router.all('*', checkUserJwt, checkUserPermission);

    router.post('/upload-cloudinary-image', upload.single('image'), postController.uploadImageCloudinary)
    router.post('/upload-cloudinary-video', upload.single('video'), postController.uploadVideoCloudinary)
    router.post('/upload-post', postController.uploadPost)

    router.get('/get-home-posts/:limit', postController.getHomePosts)
    router.get('/get-explore-posts', postController.getExplorePosts)

    router.post('/like-post', postController.likePost)
    router.post('/unlike-post', postController.unlikePost)

    router.get('/get-post-info/:postId', postController.getInfoOnePost)
    router.get('/get-post-comments/:postId/:limit', postController.getPostComments)

    router.post('/create-comment', postController.createComment)
    router.post('/like-comment', postController.likeComment)
    router.post('/unlike-comment', postController.unlikeComment)
    router.get('/get-comment-info/:commentId', postController.getInfoOneComment)

    
    //////
    router.get('/count-like', postController.countOnePostLike)
    router.get('/count-comment', postController.countOnePostComments)
    router.get('/get-comments', commentPostController.getOnePostComments)
    router.get('/count-comment-likes', commentPostController.countCommentLikes)

    return app.use('/post', router)
}

export default postRoutes