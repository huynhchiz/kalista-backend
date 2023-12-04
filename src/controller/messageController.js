import messageService from '../service/messageService.js'

const getListChatbox = async (req, res) => {
    try {
        let data = await messageService.getListChatboxSV(req.user.userId, req.params.limit)
        if(data) {
            return res.status(200).json({
                EM: 'getListChatbox success',
                EC: 0,
                DT: data,
            });
        }
    } catch (error) {
        console.log('getListChatbox controller error: ', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
    }
}


const getChatbox = async (req, res) => {
    try {
        let data = await messageService.getChatboxSV(req.user.userId, req.params.userId, req.params.chatboxId, req.params.limit)
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

const createMessage = async (req, res) => {
    try {
        let data = await messageService.createMessageSV(
            req.user.userId,
            
            req.body.type,
            req.body.chatboxId,
            req.body.message,
            req.body.src,
            req.body.date,
            req.body.time
        )

        if(data) {
            return res.status(200).json({
                EM: 'createMessage success',
                EC: 0,
                DT: data,
            });
        }
        
    } catch (error) {
        console.log('createMessage controller error: ', error)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: '',
        });
        
    }
}

module.exports = {
    getListChatbox,
    getChatbox,
    createMessage,

}