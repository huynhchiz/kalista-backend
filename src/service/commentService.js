import db from '../models/index'
import Sequelize from 'sequelize'

const createCommentSV = async (email, postId, comment, date, time) => {
    let user = await db.Users.findOne({ where: { email: email } })
    if(user) {
        await db.PostsComments.create({
            userId: +user.id,
            postId: +postId,
            comment: comment,
            date: date,
            time: time,
        })
        return {
            postId: postId,
            comment: comment,
        }
    }    
}

const likeCommentSV = async (email, cmtId) => {    
    let user = await db.Users.findOne({ where: { email: email }})
    if(user) {
        await db.CommentsLikes.create({
            userId: +user.id,
            postsCommentId: +cmtId,
        })
    }

    return cmtId
}

const unlikeCommentSV = async (email, cmtId) => {    
    let user = await db.Users.findOne({ where: { email: email }})
    if(user) {
        await db.CommentsLikes.destroy({
            where: {
                userId: +user.id,
                postsCommentId: +cmtId,
            }
        })
    }

    return cmtId
}

const countCommentLikesSV = async (cmtId) => {
    let data = await db.CommentsLikes.findAll({
        where: { postsCommentId: cmtId },
        raw: true,
    })
    if (data && data.length > 0) {
        return data.length
    }
    return 0
}

const getOnePostCommentsSV = async (email, postId, limit) => {
    let user = await db.Users.findOne({ where: { email: email }})
    let comments = await db.PostsComments.findAll({
        where: { postId: postId },
        subQuery: false,
        attributes: { 
            include: [
                [Sequelize.fn("COUNT", Sequelize.col("CommentsLikes.id")), "commentLikeCount"]
        ]},
        include: [
            { model: db.CommentsLikes, attributes: [] },
            { model: db.Users, attributes: [ 'username', 'avatar', 'email' ] }
        ],         
        group: ['PostsComments.id'],  
        raw: true,
        nest: true,
        limit: limit,
        order: [['updatedAt', 'DESC']]
    })
    
    comments = await Promise.all(comments.map(async (comment) => {
        let likedComment = await db.CommentsLikes.findOne({
            where: { postsCommentId: +comment.id, userId: +user.id },
            attributes: [ 'userId' ],
            raw: true
        })
        if (likedComment && +likedComment.userId === +user.id) {
            return (
                {...comment, liked: true}
            )
        } 
        return (
            {...comment, liked: false}
        )
    }))

    return comments
}

module.exports = {
    createCommentSV,
    likeCommentSV,
    unlikeCommentSV,
    countCommentLikesSV,
    getOnePostCommentsSV
}