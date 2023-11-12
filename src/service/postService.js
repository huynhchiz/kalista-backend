import { cloudinary } from '../config/configCloudinary'
import db from '../models/index'
import { Op } from 'sequelize'
import Sequelize from 'sequelize'

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

const uploadPostSV = async (email, src, alt, caption, time, date, type) => {
    let user = await db.Users.findOne({
        where: {email: email}
    })
    if (user) {
        await db.Posts.create({
            src: src,
            alt: alt,
            caption: caption,
            time: time,
            date: date,
            type: type,
            userId: user.id
        })
    }
}

const getPostsSV = async (limit) => {
    let posts = [] 
    posts = await db.Posts.findAll({
        include: { model: db.Users, attributes: [ 'username', 'avatar', 'email' ] },         
        raw: true,
        nest: true,
        limit: limit,
        order: [['updatedAt', 'DESC']]
    })

    return posts
}

const getFollowingPostsSV = async (email, limit) => {
    let user = await db.Users.findOne({where: {email: email}})
    let followingListId = await db.Follows.findAll({
        where: { follower: +user.id },
        attributes: [ 'userToFollow' ],
        raw: true,
    })
    followingListId = followingListId.map(item => (item.userToFollow))
    followingListId = followingListId.concat(user.id)

    let posts = []
    posts = await db.Posts.findAll({
        where: { userId: followingListId },
        include: { model: db.Users, attributes: [ 'username', 'avatar', 'email' ] },
        raw: true, 
        nest: true,
        limit: limit,
        order: [['updatedAt', 'DESC']]
    })

    posts = await Promise.all(posts.map(async (post) => {
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

const getExplorePostsSV = async (email, limit) => {
    let user = await db.Users.findOne({where: {email: email}})
    let followingListId = await db.Follows.findAll({
        where: { follower: +user.id },
        attributes: [ 'userToFollow' ],
        raw: true,
    })
    followingListId = followingListId.map(item => (item.userToFollow))
    followingListId = followingListId.concat(user.id)
    
    let posts = [] 
    posts = await db.Posts.findAll({
        where: { userId: {[Op.notIn]: followingListId} },
        include: 
            { model: db.Users, attributes: [ 'username', 'avatar', 'email' ] },
        raw: true, 
        nest: true,
        limit: limit,
        order: [['updatedAt', 'DESC']]
    })

    posts = await Promise.all(posts.map(async (post) => {
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

const getUserPostsSV = async (email, limit) => {
    let user = await db.Users.findOne({
        where: {email: email}
    })

    let { count, rows } = await db.Posts.findAndCountAll({
        where: { userId: user.id },
        include: 
            { model: db.Users, attributes: [ 'username', 'avatar', 'email' ] },
        raw: true, 
        nest: true,
        limit: limit,
        order: [['updatedAt', 'DESC']]
    })

    let posts = await Promise.all(rows.map(async (post) => {
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
            return (
                {...post, countLike, countComment, liked: true}
            )
        } 
        return (
            {...post, countLike, countComment, liked: false}
        )
    }))

    return {
        posts: posts,
        count: count.length
    }
}

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

const likePostSV = async (email, postId) => {
    let user = await db.Users.findOne({ where: { email: email } })

    if(user) {
        await db.PostsLikes.create({
            userId: +user.id,
            postId: +postId,
        })
    }

    return postId
}

const unlikePostSV = async (email, postId) => {
    let user = await db.Users.findOne({ where: { email: email } })
    if(user) {
        await db.PostsLikes.destroy({
            where: {
                userId: +user.id,
                postId: +postId,
            }
        })
    }

    return postId
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
    getPostsSV,
    getUserPostsSV,
    getFollowingPostsSV,
    getExplorePostsSV,
    likePostSV,
    unlikePostSV,
    countOnePostLikeSV,
    countOnePostCommentsSV,
    getOnePostSV
}