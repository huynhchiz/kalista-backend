import jwtActions from '../middleware/jwtActions'

const getAccount = async (req, res) =>{
    return res.status(200).json({
        EM: 'Get account success',
        EC: 0,
        DT: {
           accessToken: req.accessToken,
           refreshToken: req.refreshToken,
           userGroupWithRoles: req.user.userGroupWithRoles,
           email: req.user.email,
           username: req.user.username,
        },
    });
}

const refreshNewToken = async (req, res) => {
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
        let newTokenData = await jwtActions.refreshNewToken(refToken)
        if (newTokenData && +newTokenData === -101) {
            return res.status(403).json({
                EM: 'Refresh token expired',
                EC: '-101',
                DT: '',
            });
        }

        if(newTokenData && +newTokenData !== -101) {
            res.clearCookie('accessToken');
            // set token
            res.cookie('accessToken', newTokenData.accessToken, {
                httpOnly: true,
                maxAge: 60000 * 1000,
            });

            return res.status(200).json({
                EM: 'Get new access token success',
                EC: 0,
                DT: newTokenData,
            });
        }
        

    } catch (error) {
        console.log('refreshNewToken controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EX: '-1',
            DT: '',
        });
    }
}

module.exports = {
    getAccount, refreshNewToken
}