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

// const getAccount = async (req, res) =>{
//     try {
//         let data = await userService.getAccountInfo(req.user.email)
//         if(data) {
//             return res.status(200).json({
//                 EM: 'get account info success',
//                 EC: 0,
//                 DT: {
//                     ...data,
//                     accessToken: req.accessToken,
//                     refreshToken: req.refreshToken,
//                     userGroupWithRoles: req.user.userGroupWithRoles,
//                 },
//             });
//         }
//     } catch (error) {
//         console.log('getAccount controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: '',
//         });
//     }
// }

// const refreshNewToken = async (req, res) => {
//     let cookies = req.cookies
//     let refToken = cookies.refreshToken

//     if (!refToken) {
//         return res.status(403).json({
//             EM: 'No refresh token available',
//             EC: '-101',
//             DT: '',
//         });
//     }

//     try {
//         let data = await jwtActions.refreshNewToken(refToken)
//         if (data && +data === -101) {
//             return res.status(403).json({
//                 EM: 'Refresh token expired',
//                 EC: '-101',
//                 DT: '',
//             });
//         }

//         if(data && +data !== -101) {
//             res.clearCookie('accessToken');
//             // set token
//             res.cookie('accessToken', data.accessToken, {
//                 httpOnly: true,
//                 maxAge: 60000 * 1000,
//             });

//             let newData = await userService.getAccountInfo(data.email)

//             return res.status(200).json({
//                 EM: 'Get new access token success',
//                 EC: 0,
//                 DT: {
//                     ...newData,
//                     accessToken: data.accessToken,
//                     refreshToken: data.refreshToken,
//                     userGroupWithRoles: data.userGroupWithRoles,
//                 },
//             });
//         }
        

//     } catch (error) {
//         console.log('refreshNewToken controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EX: '-1',
//             DT: '',
//         });
//     }
// }

// const uploadAvatar = async (req, res) => {
//     try {
//         let email = req.user.email
//         let avatar = req.body.avatar

//         let data = await userService.uploadUserAvatar(email, avatar)
//         if(data) {
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT,
//             });
//         }
//     } catch (error) {
//         console.log('uploadAvatar controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: '',
//         });
//     }
// }

// const getUserAvatar = async (req, res) => {
//     try {
//         let data = await userService.getUserAvatar(req.user.email)
//         if(data) {
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT,
//             });
//         }
//     } catch (error) {
//         console.log('uploadAvatar controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: '',
//         });
//     }
// }

// const deleteUserAvatar = async (req, res) => {
//     try {
//         let data = await userService.deleteUserAvatar(req.user.email)
//         if(data) {
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT,
//             });
//         }
//     } catch (error) {
//         console.log('uploadAvatar controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: '',
//         });
//     }
// }

// const getOtherUserInfo = async (req, res) => {
//     try {
//         let data = await userService.getOtherUserInfoSV(req.body.email)
//         if(data) {
//             return res.status(200).json({
//                 EM: 'getOtherUserInfo success',
//                 EC: 0,
//                 DT: data,
//             });
//         }
//     } catch (error) {
//         console.log('getOtherUserInfo controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-1',
//             DT: '',
//         });
//     }
// }

module.exports = {
    getInfo,
    getUserPosts,
    getFollowers,
    getFollowings,

    // getAccount,
    // refreshNewToken,
    // uploadAvatar,
    // getUserAvatar,
    // deleteUserAvatar,
    // getOtherUserInfo
}