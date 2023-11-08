import postService from '../service/postService'

const uploadImageCloudinary = async (req, res) => {
    try {
        let data = await postService.uploadImageCloudinarySV(req.file)
        if (data) {
            return res.status(200).json({
                EC: 0,
                EM: 'Upload image tp Cloudinary success',
                DT: data
            })
        }
    } catch (error) {
        console.log('uploadImageCloudinary controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const uploadVideoCloudinary = async (req, res) => {
    try {
        let data = await postService.uploadVideoCloudinarySV(req.file)
        if (data) {
            return res.status(200).json({
                EC: 0,
                EM: 'Upload video to Cloudinary success',
                DT: data
            })
        }
    } catch (error) {
        console.log('uploadVideoCloudinary controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const uploadPost = async (req, res) => {
    try {
        let email = req.user.email

        let src = req.body.src
        let alt = req.body.alt
        let caption = req.body.caption
        let time = req.body.time
        let date = req.body.date
        let type = req.body.type
        
        if (!email || !src || !alt || !time || !date || !type) {
            return res.status(200).json({
               EM: 'Missing required parameters!',
               EC: '1',
               DT: '',
        })}

        await postService.uploadPostSV(email, src, alt, caption, time, date, type)
        return res.status(200).json({
            EC: 0,
            EM: 'Upload post success',
            DT: '',
        })

    } catch (error) {
        console.log('uploadPost controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getPosts = async (req, res) => {
    try {
        let data = await postService.getPostsSV(req.body.limit)
        if(data && data.length > 0) {
            return res.status(200).json({
                EC: 0,
                EM: 'Get posts success',
                DT: data,
            })
        }
    } catch (error) {
        console.log('getPosts controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getFollowingPosts = async (req, res) => {
    try {
        let data = await postService.getFollowingPostsSV(req.user.email, req.body.limit)
        if(data && data.length > 0) {
            return res.status(200).json({
                EC: 0,
                EM: 'Get posts success',
                DT: data,
            })
        }
    } catch (error) {
        console.log('getPosts controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getExplorePosts = async (req, res) => {
    try {
        let data = await postService.getExplorePostsSV(req.user.email, req.body.limit)
        if(data && data.length > 0) {
            return res.status(200).json({
                EC: 0,
                EM: 'Get posts from user not following yet success',
                DT: data,
            })
        }
    } catch (error) {
        console.log('getExplorePosts controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getUserPosts = async (req, res) => {
    try {
        let data = await postService.getUserPostsSV(req.body.email, req.body.limit)
        if(data) {
            console.log(data);
            return res.status(200).json({
                EC: 0,
                EM: 'Get posts success',
                DT: data,
            })
        }
    } catch (error) {
        console.log('getPosts controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const likePost = async (req, res) => {
    try {
        let data = await postService.likePostSV(req.user.email, req.body.postId)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `Like post ${data} success`,
                DT: data,
            })
        }
    } catch (error) {
        console.log('likePost controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const unlikePost = async (req, res) => {
    try {
        let data = await postService.unlikePostSV(req.user.email, req.body.postId)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `Unlike post ${data} success`,
                DT: data,
            })
        }
    } catch (error) {
        console.log('unlikePost controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const countOnePostLike = async (req, res) => {
    try {
        let data = await postService.countOnePostLikeSV(req.body.postId)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `Get like count success`,
                DT: data,
            })
        }
    } catch (error) {
        console.log('countOnePostLike controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

module.exports = {
    uploadImageCloudinary,
    uploadVideoCloudinary,
    uploadPost,
    getPosts,
    getFollowingPosts,
    getUserPosts,
    getExplorePosts,
    likePost,
    unlikePost,
    countOnePostLike
}