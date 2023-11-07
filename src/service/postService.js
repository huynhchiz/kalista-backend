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
    let user = await db.Users.findOne({
        where: {email: email}
    })

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

    posts = posts.map(post => ({...post, followType: true}))
    return posts
}

const getExplorePostsSV = async (email, limit) => {
    let user = await db.Users.findOne({
        where: {email: email}
    })
    let followingListId = await db.Follows.findAll({
        where: { follower: +user.id },
        attributes: [ 'userToFollow' ],
        raw: true,
    })
    followingListId = followingListId.map(item => (item.userToFollow))
    followingListId = followingListId.concat(user.id)
    
    let posts = [] 
    posts = await db.Posts.findAll({
        where: { userId: {[Op.not]: followingListId} },
        include: { model: db.Users, attributes: [ 'username', 'avatar', 'email' ] },
        raw: true,
        nest: true,
        limit: limit,
        order: [['updatedAt', 'DESC']]
    })

    posts = posts.map(post => ({...post, followType: false}))
    return posts
}

const getUserPostsSV = async (email, limit) => {
    let user = await db.Users.findOne({
        where: {email: email}
    })

    let posts = []
    posts = await db.Posts.findAll({
        where: { userId: user.id },
        include:  { model: db.Users, attributes: [ 'username', 'avatar', 'email' ] },         
        raw: true,
        nest: true,
        limit: limit,
        order: [['updatedAt', 'DESC']]
    })
    return posts
}

const likePostSV = async (email, postId) => {
    let user = await db.Users.findOne({ where: { email: email } })

    if(user) {
        await db.PostsLikes.create({
            userLike: +user.id,
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
                userLikey: +user.id,
                postId: +postId,
            }
        })
    }

    return postId
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
}