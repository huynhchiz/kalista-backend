import userService from '../service/userService'

const getInfo = async (req, res) => {
    try {
        let data = await userService.getInfoSV(req.user.userId, req.params.userId)
        if(data) {
            return res.status(200).json({
                EM: 'getInfo success',
                EC: 0,
                DT: data,
            });
        }
    } catch (error) {
        console.log('getInfo controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const getUserPosts = async (req, res) => {
    try {
        let data = await userService.getUserPostsSV(req.user.userId, req.params.userId, req.params.limit)
        if(data) {
            return res.status(200).json({
                EM: 'getUserPosts success',
                EC: 0,
                DT: data,
            });
        }
    } catch (error) {
        console.log('getUserPosts controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const getFollowers = async (req, res) => {
    try {
        let data = await userService.getFollowersSV(req.params.userId, req.params.limit)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `get followers success`,
                DT: data,
            })
        }
        
    } catch (error) {
        console.log('getFollowers controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getFollowings = async (req, res) =>  {
    try {
        let data = await userService.getFollowingsSV(req.params.userId, req.params.limit)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `get user followings success`,
                DT: data,
            })
        }
        
    } catch (error) {
        console.log('getFollowings controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const searchUsers = async (req, res) => {
    try {
        let data = await userService.searchUsersSV(req.params.searchValue, req.params.limit)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `searchUsers success`,
                DT: data,
            })
        }
    } catch (error) {
        console.log('searchUsers controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

module.exports = {
    getInfo,
    getUserPosts,
    getFollowers,
    getFollowings,
    searchUsers
}