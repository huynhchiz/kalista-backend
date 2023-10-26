import themeService from '../service/themeService'

const handleGetTheme = async (req, res) => {
    try {
        let userEmail = req.body
        let data = await themeService.getTheme(userEmail)
        if(data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } else {
            console.log('check err handleGetTheme from controller');
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
             });
        }

    } catch (error) {
        console.log('handleGetTheme controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EX: '-5',
            DT: '',
        });
    }
}

module.exports = {
    handleGetTheme,
}