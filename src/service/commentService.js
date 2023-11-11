import db from '../models/index'

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

module.exports = {
    createCommentSV,

}