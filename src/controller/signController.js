import signService from '../service/signService.js'

const handleRegister = async (req, res) => {
    let userData = req.body
    try {
        if (!userData.email || !userData.phone || !userData.password) {
            return res.status(200).json({
               EM: 'Missing required parameters!',
               EC: '1',
               DT: '',
            });
         } else {
            let data = await signService.registerUser(userData);
            return res.status(200).json({
               EM: data.EM,
               EC: data.EC,
               DT: '',
            });
         }
    } catch (error) {
        console.log('handleRegister controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EX: '-5',
            DT: '',
        });
    }
}

const handleLogin = async (req, res) => {
    try {
        let userData = req.body
        let data = await signService.loginUser(userData)

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

const handleLogout = async (req, res) => {
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

module.exports = {
    handleRegister, handleLogin, handleLogout
}