import followService from '../service/followService'

const follow = async (req, res) => {
    try {
        if(req.user.email === req.body.email) {
            return res.status(200).json({
                EC: 1,
                EM: `Cannot follow yourself`,
                DT: '',
            })
        }

        let data = await followService.followSV(req.user.email, req.body.email)
        if(data && +data !== -1) {
            return res.status(200).json({
                EC: 0,
                EM: `Follow user ${data} success`,
                DT: data,
            })
        }

        if(+data === -1) {
            return res.status(200).json({
                EC: 0,
                EM: `You are already follow this user`,
                DT: data,
            })
        }

    } catch (error) {
        console.log('follow controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const unfollow = async (req, res) => {
    try {
        if(req.user.email === req.body.email) {
            return res.status(200).json({
                EC: 1,
                EM: `Cannot unfollow yourself`,
                DT: '',
            })
        }

        let data = await followService.unfollowSV(req.user.email, req.body.email)
        if(data && +data !== -1) {
            return res.status(200).json({
                EC: 0,
                EM: `unfollow user ${data} success`,
                DT: data,
            })
        }

        if(+data === -1) {
            return res.status(200).json({
                EC: 0,
                EM: `You are not follow this user yet`,
                DT: data,
            })
        }
        
    } catch (error) {
        console.log('unfollow controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getFollowers = async (req, res) => {
    try {
        let data = await followService.getFollowersSV(req.body.email)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `get followers success`,
                DT: data,
            })
        }
        
    } catch (error) {
        console.log('unfollow controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

const getUsersFollowing = async (req, res) => {
    try {
        let data = await followService.getUsersFollowingSV(req.body.email, req.body.limit)
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `get user followings success`,
                DT: data,
            })
        }
        
    } catch (error) {
        console.log('unfollow controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

module.exports = {
    follow,
    unfollow,
    getFollowers,
    getUsersFollowing
}