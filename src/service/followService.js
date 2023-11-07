import db from '../models/index'

const followSV = async (email, emailToFollow) => {
    let user = await db.Users.findOne({where: {email: email}})
    let userToFollow = await db.Users.findOne({where: {email: emailToFollow}})

    // tim ra nhung user minh dang follow
    let usersAlreadyFollowing = await db.Follows.findAll({
        where: { follower: user.id },
        raw: true,
        attributes: [ 'userToFollow' ]
    })
    usersAlreadyFollowing = usersAlreadyFollowing.map(item => (item.userToFollow)) // chi lay id
    if (usersAlreadyFollowing.includes(userToFollow.id)) {
        return -1 // user is already followed
    }

    await db.Follows.create({
        follower: +user.id,
        userToFollow: +userToFollow.id
    })

    return userToFollow.username
}

const unfollowSV = async (email, emailToUnfollow) => {
    let user = await db.Users.findOne({where: {email: email}})
    let userToUnFollow = await db.Users.findOne({where: {email: emailToUnfollow}})

    // tim ra nhung user minh dang follow
    let usersAlreadyFollowing = await db.Follows.findAll({
        where: { follower: user.id },
        raw: true,
        attributes: [ 'userToFollow' ]
    })
    usersAlreadyFollowing = usersAlreadyFollowing.map(item => (item.userToFollow)) // chi lay id
    if (usersAlreadyFollowing.includes(userToUnFollow.id)) {
        await db.Follows.destroy({
            where: {
                follower: +user.id,
                userToFollow: +userToUnFollow.id
            }
        })
        return userToUnFollow.username
    }
    return -1 // user is not follow yet
}

const getUsersFollowingSV = async (email, limit) => {
    let user = await db.Users.findOne({ where: { email: email } })
    let followingListId = await db.Follows.findAll({
        where: { follower: +user.id },
        attributes: [ 'userToFollow' ],
        raw: true,
    })
    followingListId = followingListId.map(item => (item.userToFollow))

    let data = {}
    const { count, rows } = await db.Users.findAndCountAll({ where: { id: followingListId }, limit: limit })
    data = {
        countFollowing: count,
        listFollowing: rows
    }
    return data
}

const getFollowersSV = async (email, limit) => {
    let user = await db.Users.findOne({ where: { email: email } })
    let followersListId = await db.Follows.findAll({
        where: { userToFollow: +user.id },
        attributes: [ 'follower' ],
        raw: true,
    })
    followersListId = followersListId.map(item => (item.follower))

    let data = {}
    const { count, rows } = await db.Users.findAndCountAll({ where: { id: followersListId }, limit: limit })
    data = {
        countFollower: count,
        listFollower: rows
    }
    return data
}

module.exports = {
    followSV,
    unfollowSV,
    getFollowersSV,
    getUsersFollowingSV
}