import { cloudinary } from '../config/configCloudinary'
import db from '../models/index'
import { Op } from 'sequelize'

const uploadImageCloudinarySV = async (image) => {
    let data = await cloudinary.uploader.upload(`./${image.path}`)
    if (data) {
        return data.url || data.secure_url
    }
}

const uploadVideoCloudinarySV = async (video) => {
    let data = await cloudinary.uploader.upload(`./${video.path}`, { resource_type: "video" })
    if (data) {
        return data.url || data.secure_url
    }
}

const uploadPostSV = async (userId, src, alt, caption, time, date, type) => {
    let user = await db.Users.findOne({
        where: {id: userId}
    })
    if (user) {
        await db.Posts.create({
            src: src,
            alt: alt,
            caption: caption,
            time: time,
            date: date,
            type: type,
            userId: +user.id
        })
    }
}

const likePostSV = async (userId, postId) => {
    let checkLiked = await db.PostsLikes.count({
        where: { postId: +postId, userId: +userId }
    })

    if(checkLiked && +checkLiked >= 1) {
        return -1 // post is already liked
    }
    await db.PostsLikes.create({
        userId: +userId,
        postId: +postId,
    })

    return postId
}

const unlikePostSV = async (userId, postId) => {
    let checkLiked = await db.PostsLikes.count({
        where: { postId: +postId, userId: +userId }
    })

    if(checkLiked && +checkLiked >= 1) {
        await db.PostsLikes.destroy({
            where: {
                postId: +postId,
                userId: +userId,
            }
        })
        return postId
    }
    return -1 // post is not liked yet
}

const getHomePostsSV = async (accountId, limit) => {
    let followingListId = await db.Follows.findAll({
        where: { follower: +accountId },
        attributes: [ 'userToFollow' ],
        raw: true,
    })
    followingListId = followingListId.map(item => (item.userToFollow))
    followingListId = followingListId.concat(accountId)

    let posts = []
    posts = await db.Posts.findAll({
        where: { userId: followingListId },
        include: { model: db.Users, attributes: [ 'username', 'avatar', 'email', 'id' ] },
        raw: true, 
        nest: true,
        limit: +limit,
        order: [['updatedAt', 'DESC']]
    })

    posts = await Promise.all(posts.map(async (post) => {
        let likePost = await db.PostsLikes.findOne({
            where: { postId: +post.id, userId: +accountId },
            attributes: [ 'userId' ],
            raw: true
        })
        let countLike = await db.PostsLikes.count({
            where: { postId: +post.id }
        })
        let countComment = await db.PostsComments.count({
            where: { postId: +post.id }
        })
        if (likePost && +likePost.userId === +accountId) {
            return (
                {...post, countLike, countComment, liked: true}
            )
        } 
        return (
            {...post, countLike, countComment, liked: false}
        )
    }))
    return posts
}

const getExplorePostsSV = async (accountId, limit) => {
    let followingListId = await db.Follows.findAll({
        where: { follower: +accountId },
        attributes: [ 'userToFollow' ],
        raw: true,
    })
    followingListId = followingListId.map(item => (item.userToFollow))
    followingListId = followingListId.concat(accountId)
    
    let posts = [] 
    posts = await db.Posts.findAll({
        where: { userId: {[Op.notIn]: followingListId} },
        include: { model: db.Users, attributes: ['username', 'avatar', 'email', 'id'] },
        raw: true, 
        nest: true,
        limit: +limit,
        order: [['updatedAt', 'DESC']]
    })

    posts = await Promise.all(posts.map(async (post) => {
        let likePost = await db.PostsLikes.findOne({
            where: { postId: +post.id, userId: +accountId },
            attributes: [ 'userId' ],
            raw: true
        })
        let countLike = await db.PostsLikes.count({
            where: { postId: +post.id }
        })
        let countComment = await db.PostsComments.count({
            where: { postId: +post.id }
        })
        if (likePost && +likePost.userId === +accountId) {
            return (
                {...post, countLike, countComment, liked: true}
            )
        } 
        return (
            {...post, countLike, countComment, liked: false}
        )
    }))
    return posts
}

const getInfoOnePostSV = async (accountId, postId) => {
    let post = await db.Posts.findOne({
        where: { id: +postId },
        include: { model: db.Users, attributes: [ 'username', 'avatar', 'email', 'id' ] },
        raw: true, 
        nest: true,
    })
    let likePost = await db.PostsLikes.count({
        where: { postId: +postId, userId: +accountId }
    })
    let countLike = await db.PostsLikes.count({
        where: { postId: +postId }
    })
    let countComment = await db.PostsComments.count({
        where: { postId: +postId }
    })

    if (likePost && +likePost >= 1) {
        return (
            {...post, countLike, countComment, liked: true}
        )
    }
    return (
        {...post, countLike, countComment, liked: false}
    )
}

const getPostCommentsSV = async (accountId, postId, limit) =>  {
    let comments = await db.PostsComments.findAll({
        where: { postId: +postId },
        include: { model: db.Users, attributes: [ 'username', 'avatar', 'email', 'id' ] },
        raw: true,
        nest: true,
        limit: +limit,
        order: [['updatedAt', 'DESC']]
    })
    
    comments = await Promise.all(comments.map(async (comment) => {
        let likedComment = await db.CommentsLikes.count({
            where: { postsCommentId: +comment.id, userId: +accountId },
        })
        
        let countLike = await db.CommentsLikes.count({
            where: { postsCommentId: +comment.id }
        })

        if (likedComment && +likedComment >= 1) {
            return (
                {...comment, countLike, liked: true}
            )
        } 
        return (
            {...comment, countLike, liked: false}
        )
    }))

    return comments
}

const createCommentSV = async (accountId, postId, comment, date, time) => {
    await db.PostsComments.create({
        comment: comment,
        userId: +accountId,
        postId: +postId,
        date: date,
        time: time,
    })
    return comment
}

const likeCommentSV = async (accountId, commentId) => {
    let checkLiked = await db.CommentsLikes.count({
        where: { postsCommentId: +commentId, userId: +accountId }
    })

    if(checkLiked && checkLiked >= 1) {
        return -1 // comment is already liked
    }

    await db.CommentsLikes.create({
        postsCommentId: +commentId,
        userId: +accountId
    })
    return commentId
}

const unlikeCommentSV = async (accountId, commentId) => {
    let checkLiked = await db.CommentsLikes.count({
        where: { postsCommentId: +commentId, userId: +accountId }
    })

    if(checkLiked && checkLiked >= 1) {
        await db.CommentsLikes.destroy({
            where: {
                postsCommentId: +commentId,
                userId: +accountId
            }
        })
        return commentId
    }

    return -1 // comment is not liked yet
    
}

const getInfoOneCommentSV = async (accountId, commentId) => {
    let comment = await db.PostsComments.findOne({
        where: { id: +commentId },
        include: { model: db.Users, attributes: [ 'username', 'avatar', 'email', 'id' ] },
        raw: true,
        nest: true,
    })
    let likedComment = await db.CommentsLikes.count({
        where: { postsCommentId: +commentId, userId: +accountId },
    })
    
    let countLike = await db.CommentsLikes.count({
        where: { postsCommentId: +commentId }
    })

    if (likedComment && +likedComment >= 1) {
        return (
            {...comment, countLike, liked: true}
        )
    } 
    return (
        {...comment, countLike, liked: false}
    )
}

/////////////

const countOnePostLikeSV = async (postId) => {
    let data = await db.PostsLikes.findAll({
        where: { postId: postId },
        raw: true,
    })
    if (data && data.length > 0) {
        return data.length
    }
    return 0
}

const countOnePostCommentsSV = async (postId) => {
    let data = await db.PostsComments.findAll({
        where: { postId: postId },
        raw: true,
    })
    if (data && data.length > 0) {
        return data.length
    }
    return 0
}

const getOnePostSV = async (email, postId) => {
    let user = await db.Users.findOne({where: {email: email}})
    let post = await db.Posts.findOne({
        where: { id: +postId },
        include: { model: db.Users, attributes: [ 'username', 'avatar', 'email' ] },
        raw: true,
        nest: true,
    })

    let likePost = await db.PostsLikes.findOne({
        where: { postId: +post.id, userId: +user.id },
        attributes: [ 'userId' ],
        raw: true
    })
    let countLike = await db.PostsLikes.count({
        where: { postId: +post.id }
    })
    let countComment = await db.PostsComments.count({
        where: { postId: +post.id }
    })

    if (likePost && +likePost.userId === +user.id) {
        return {...post, countComment, countLike, liked: true}
    }
    
    return {...post, countLike, countComment, liked: false}
}

module.exports = {
    uploadImageCloudinarySV,
    uploadVideoCloudinarySV,
    uploadPostSV,
    getHomePostsSV,
    getExplorePostsSV,
    likePostSV,
    unlikePostSV,
    getInfoOnePostSV,
    getPostCommentsSV,
    createCommentSV,
    likeCommentSV,
    unlikeCommentSV,
    getInfoOneCommentSV,


    ////
    countOnePostLikeSV,
    countOnePostCommentsSV,
    getOnePostSV
}