import messageService from '../service/messageService.js'

const getChatbox = async (req, res) => {
    try {
        let data = await messageService.getChatboxSV(req.user.userId, req.params.userId, req.params.limit)
        if(data) {
            return res.status(200).json({
                EM: 'getChatbox success',
                EC: 0,
                DT: data,
            });
        }
    } catch (error) {
        console.log('getChatbox controller error: ', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}

module.exports = {
    getChatbox,

}