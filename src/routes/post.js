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
    router.post('/upload', postController.uploadPost)

    router.get('/get-home', postController.getFollowingPosts)
    router.get('/get-explore', postController.getExplorePosts)
    router.get('/get-user/:userId', postController.getUserPosts)

    router.post('/like', postController.likePost)
    router.post('/unlike', postController.unlikePost)
    router.get('/count-like', postController.countOnePostLike)
    router.get('/count-comment', postController.countOnePostComments)

    router.post('/create-comment', commentPostController.createComment)
    router.get('/get-comments', commentPostController.getOnePostComments)
    router.post('/like-comment', commentPostController.likeComment)
    router.post('/unlike-comment', commentPostController.unlikeComment)
    router.get('/count-comment-likes', commentPostController.countCommentLikes)

    return app.use('/post', router)
}

export default postRoutes