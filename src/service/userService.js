import db from '../models/index'

const uploadUserAvatar = async (email, avatar) => {
    try {
        await db.Users.update({
            avatar: avatar
        },
        {
            where: { email: email }
        })
        return {
            EC: 0,
            EM: 'Upload avatar success',
            DT: '',
        }
    } catch (error) {
        console.log('uploadUserAvatar sv err: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-5',
            DT: '',
        };
    }
}

const getUserAvatar = async (email) => {
    try {
        let data = await db.Users.findOne({
            where: { email: email },
            attributes: ['avatar']
        })
        if(data) {
            return {
                EC: 0,
                EM: 'Get avatar success',
                DT: data
            }
        }
    } catch (error) {
        console.log('getUserAvatar sv err: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-5',
            DT: '',
        };
    }
}

const deleteUserAvatar = async (email) => {
    try {
        await db.Users.update({
            avatar: ''
        },
        {
            where: { email: email }
        })
        return {
            EC: 0,
            EM: 'Delete avatar success',
            DT: ''
        }
        
    } catch (error) {
        console.log('getUserAvatar sv err: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-5',
            DT: '',
        };
    }
}

const getOtherUserInfoSV = async (email) => {
    let user = await db.Users.findOne({
        where: { email: email },
        attributes: [ 'id', 'email', 'username', 'address', 'phone', 'avatar' ]
    })
    return user
}

module.exports = {
    uploadUserAvatar,
    getUserAvatar,
    deleteUserAvatar,
    getOtherUserInfoSV
}