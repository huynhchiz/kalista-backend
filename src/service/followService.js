import db from '../models/index'

const followSV = async (email, emailFollow) => {
    let user = await db.Users.findOne({where: {email: email}})
    let userFollow = await db.Users.findOne({where: {email: emailFollow}})

    let followedIdList = await db.Follows.findAll({
        where: { userId: user.id },
        raw: true,
        attributes: [ 'userFollowId' ]
    })
    followedIdList = followedIdList.map(fledId => (fledId.userFollowId))
    if (followedIdList.includes(userFollow.id)) {
        return -1 // user is already followed
    }

    await db.Follows.create({
        userId: +user.id,
        userFollowId: +userFollow.id
    })

    return userFollow.username
}

const unfollowSV = async (email, emailFollow) => {
    let user = await db.Users.findOne({where: {email: email}})
    let userFollow = await db.Users.findOne({where: {email: emailFollow}})

    let followedIdList = await db.Follows.findAll({
        where: { userId: user.id },
        raw: true,
        attributes: [ 'userFollowId' ]
    })
    followedIdList = followedIdList.map(fledId => (fledId.userFollowId))
    if (followedIdList.includes(userFollow.id)) {
        await db.Follows.destroy({
            where: {
                userId: +user.id,
                userFollowId: +userFollow.id
            }
        })
        return userFollow.username
    }
    return -1 // user is not follow yet
}

module.exports = {
    followSV,
    unfollowSV
}