import postService from '../service/postService'

const uploadImageCloudinary = async (req, res) => {
    try {
        let data = await postService.uploadImageCloudinarySV(req.file)
        if (data) {
            return res.status(200).json({
                EC: 0,
                EM: 'uploadImageCloudinary success',
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
                EM: 'uploadVideoCloudinary success',
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
        let userId = req.user.userId

        let src = req.body.src
        let alt = req.body.alt
        let caption = req.body.caption
        let time = req.body.time
        let date = req.body.date
        let type = req.body.type
        
        if (!userId || !src || !alt || !time || !date || !type) {
            return res.status(200).json({
               EM: 'Missing required parameters!',
               EC: '1',
               DT: '',
        })}

        await postService.uploadPostSV(userId, src, alt, caption, time, date, type)
        return res.status(200).json({
            EC: 0,
            EM: 'uploadPost success',
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

const getHomePosts = async (req, res) => {
    try {
        let data = await postService.getHomePostsSV(req.user.userId, req.params.limit)
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
        let data = await postService.getExplorePostsSV(req.user.userId, req.body.limit)
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

const likePost = async (req, res) => {
    try {
        let data = await postService.likePostSV(req.user.userId, req.body.postId)
        if(+data === -1) {
            return res.status(200).json({
                EC: -1,
                EM: `post is already liked`,
                DT: '',
            })
        }
        if(data && +data !== -1) {
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
        let data = await postService.unlikePostSV(req.user.userId, req.body.postId)
        if(+data === -1) {
            return res.status(200).json({
                EC: -1,
                EM: `post is not like yet`,
                DT: '',
            })
        }

        if(data && data !== -1) {
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

const getInfoOnePost = async (req, res) => {
    try {
        let data = await postService.getInfoOnePostSV(req.user.userId, req.params.postId)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: 'getInfoOnePost success',
                DT: data,
            })
        }
    } catch (error) {
        console.log('getInfoOnePost controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getPostComments = async (req, res) => {
    try {
        let data = await postService.getPostCommentsSV(req.user.userId, req.params.postId, req.params.limit)
        return res.status(200).json({
            EC: 0,
            EM: `getPostComments success`,
            DT: data,
        })
    } catch (error) {
        console.log('getPostComments controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const createComment = async (req, res) => {
    try {
        if(!req.user.userId || !req.body.postId || !req.body.comment || !req.body.date || !req.body.time) {
            return res.status(200).json({
                EC: 1,
                EM: 'Missing request info',
                DT: '',
            })
        }
        let data = await postService.createCommentSV(req.user.userId, req.body.postId, req.body.comment, req.body.date, req.body.time)
        if (data) {
            return res.status(200).json({
                EC: 0,
                EM: `createComment success`,
                DT: data,
            })
        }
    } catch (error) {
        console.log('createComment controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const likeComment = async (req, res) => {
    try {
        let data = await postService.likeCommentSV(req.user.userId, req.body.commentId)
        if (+data === -1) {
            return res.status(200).json({
                EC: -1,
                EM: `comment is already liked`,
                DT: '',
            })
        }

        if(data && +data !== -1) {
            return res.status(200).json({
                EC: 0,
                EM: `like comment ${data} success`,
                DT: data,
            })
        }

    } catch (error) {
        console.log('likeComment controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const unlikeComment = async (req, res) => {
    try {
        let data = await postService.unlikeCommentSV(req.user.userId, req.body.commentId)
        if (+data === -1) {
            return res.status(200).json({
                EC: -1,
                EM: `comment is not liked yet`,
                DT: '',
            })
        }

        if(data && +data !== -1) {
            return res.status(200).json({
                EC: 0,
                EM: `unlike comment ${data} success`,
                DT: data,
            })
        }

    } catch (error) {
        console.log('likeComment controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getInfoOneComment = async (req, res) => {
    try {
        let data = await postService.getInfoOneCommentSV(req.user.userId, req.params.commentId)
        if (data) {
            return res.status(200).json({
                EC: 0,
                EM: `getInfoOneComment success`,
                DT: data,
            })
        }
    } catch (error) {
        console.log('getInfoOneComment controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

/////////////
const countOnePostLike = async (req, res) => {
    try {
        let data = await postService.countOnePostLikeSV(req.body.postId)
        return res.status(200).json({
            EC: 0,
            EM: `Get like count success`,
            DT: data,
        })
    } catch (error) {
        console.log('countOnePostLike controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const countOnePostComments = async (req, res) => {
    try {
        let data = await postService.countOnePostCommentsSV(req.body.postId)
        return res.status(200).json({
            EC: 0,
            EM: `Get comments count success`,
            DT: data,
        })
    } catch (error) {
        console.log('countOnePostComments controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getOnePost = async (req, res) => {
    try {
        let data = await postService.getOnePostSV(req.user.email, req.params.postId)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `Get one post success`,
                DT: data,
            })
        }
    } catch (error) {
        console.log('getOnePost controller err: ', error);
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
    getHomePosts,
    getExplorePosts,
    likePost,
    unlikePost,
    getInfoOnePost,
    getPostComments,
    createComment,
    likeComment,
    unlikeComment,
    getInfoOneComment,



    //
    countOnePostLike,
    countOnePostComments,
    getOnePost
}