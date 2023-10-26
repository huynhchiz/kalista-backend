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
        console.log('error from handleRegister controller: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EX: '-1',
            DT: '',
         });
    }
}

module.exports = {
    handleRegister
}