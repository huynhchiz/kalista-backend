import express from "express";

import signController from '../controller/signController'
import userController from '../controller/userController'
import postController from '../controller/postController'
import followController from '../controller/followController'
import commentPostController from "../controller/commentPostController";

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

    router.post('/user/follower/read', followController.getFollowers)
    router.post('/user/following/read', followController.getUsersFollowing)
    router.post('/user/follow', followController.follow)
    router.post('/user/unfollow', followController.unfollow)

    router.post('/user/other/read-info', userController.getOtherUserInfo)

    router.post('/post/upload-cloudinary-image', upload.single('image'), postController.uploadImageCloudinary)
    router.post('/post/upload-cloudinary-video', upload.single('video'), postController.uploadVideoCloudinary)
    router.post('/post/upload', postController.uploadPost)

    router.post('/post/read', postController.getPosts)
    router.post('/post/read-following', postController.getFollowingPosts)
    router.post('/post/read-not-following', postController.getExplorePosts)
    router.post('/post/read-user', postController.getUserPosts)
    router.get('/post/preview/:postId', postController.getOnePost)

    router.post('/post/like', postController.likePost)
    router.post('/post/unlike', postController.unlikePost)
    router.post('/post/count-like', postController.countOnePostLike)

    router.post('/post/comment/create', commentPostController.createComment )

    return app.use('/api', router)
}

export default initApiRoutes