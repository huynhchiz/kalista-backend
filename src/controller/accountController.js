import accountService from '../service/accountService.js'
import jwtActions from '../middleware/jwtActions.js'

const register = async (req, res) => {
    let userData = req.body
    try {
        if (!userData.email || !userData.phone || !userData.password) {
            return res.status(200).json({
               EM: 'Missing required parameters!',
               EC: '1',
               DT: '',
            });

         } 
        let data = await accountService.registerSV(userData);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        });
         
    } catch (error) {
        console.log('register controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EX: '-5',
            DT: '',
        });
    }
}

const login = async (req, res) => {
    try {
        let userData = req.body
        let data = await accountService.loginSV(userData)

        if(data && data.accessToken && data.refreshToken) {
            res.cookie('accessToken', data.accessToken, {
                httpOnly: true,
                maxAge: 60000 * 1000,
            })
            res.cookie('refreshToken', data.refreshToken, {
                httpOnly: true,
                maxAge: 60000 * 1000,
            })

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
             });
        } else {
            console.log('check err handleLogin from controller');
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
             });
        }
        
    } catch (error) {
        console.log('handleLogin controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EX: '-5',
            DT: '',
        });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({
           EM: 'Clear coookie jwt success',
           EC: 0,
           DT: '',
        });
     } catch (error) {
        console.log(error);
        return res.status(500).json({
           EM: 'error from server',
           EX: '-1',
           DT: '',
        });
    }
}

const getInfo = async (req, res) => {
    console.log(req.user.userId);
    try {
        let data = await accountService.getInfoSV(req.user.userId)
        if(data) {
            return res.status(200).json({
                EM: 'get account info success',
                EC: 0,
                DT: {
                    ...data,
                    accessToken: req.accessToken,
                    refreshToken: req.refreshToken,
                    userGroupWithRoles: req.user.userGroupWithRoles,
                },
            });
        }
    } catch (error) {
        console.log('getAccount controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const refreshToken = async (req, res) => {
    let cookies = req.cookies
    let refToken = cookies.refreshToken

    if (!refToken) {
        return res.status(403).json({
            EM: 'No refresh token available',
            EC: '-101',
            DT: '',
        });
    }

    try {
        let data = await jwtActions.refreshNewToken(refToken)
        if (data && +data === -101) {
            return res.status(403).json({
                EM: 'Refresh token expired',
                EC: '-101',
                DT: '',
            });
        }

        if(data && +data !== -101) {
            res.clearCookie('accessToken');
            // set token
            res.cookie('accessToken', data.accessToken, {
                httpOnly: true,
                maxAge: 60000 * 1000,
            });

            let newData = await accountService.getInfoSV(data.userId)

            return res.status(200).json({
                EM: 'Get new access token success',
                EC: 0,
                DT: {
                    ...newData,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    userGroupWithRoles: data.userGroupWithRoles,
                },
            });
        }
        

    } catch (error) {
        console.log('refreshToken controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EX: '-1',
            DT: '',
        });
    }
}

const uploadAvatar = async (req, res) =>  {
    try {
        let userId = req.user.userId
        let avatar = req.body.avatar

        let data = await accountService.uploadAvatarSV(userId, avatar)
        if(data) {
            return res.status(200).json({
                EM: 'upload avatar success',
                EC: 0,
                DT: '',
            });
        }
    } catch (error) {
        console.log('uploadAvatar controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const getAvatar = async (req, res) => {
    try {
        let data = await accountService.getAvatarSV(req.user.userId)
        if(data) {
            return res.status(200).json({
                EM: 'get avatar success',
                EC: 0,
                DT: data,
            });
        }
    } catch (error) {
        console.log('getAvatar controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const deleteAvatar = async (req, res) => {
    try {
        let data = await accountService.deleteAvatarSV(req.user.userId)
        if(data) {
            return res.status(200).json({
                EM: 'delete avatar success',
                EC: 0,
                DT: data,
            });
        }
    } catch (error) {
        console.log('deleteAvatar controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

const follow = async (req, res) => {
    try {
        if(req.user.userId === req.body.userId) {
            return res.status(200).json({
                EC: 1,
                EM: `Can not follow yourself`,
                DT: '',
            })
        }

        let data = await accountService.followSV(req.user.userId, req.body.userId)
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
                EM: `You are already following this user`,
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
        if(req.user.userId === req.body.userId) {
            return res.status(200).json({
                EC: 1,
                EM: `Cannot unfollow yourself`,
                DT: '',
            })
        }

        let data = await accountService.unfollowSV(req.user.userId, req.body.userId)
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
        let data = await accountService.getFollowersSV(req.user.userId)
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

const getFollowings = async (req, res) =>  {
    try {
        let data = await accountService.getFollowingsSV(req.user.userId)
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
    register,
    login,
    logout,
    getInfo,
    refreshToken,
    uploadAvatar,
    getAvatar,
    deleteAvatar,
    follow,
    unfollow,
    getFollowers,
    getFollowings
}