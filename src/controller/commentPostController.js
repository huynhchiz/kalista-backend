import commentService from '../service/commentService'

const createComment = async (req, res) => {
    console.log(req.body);
    try {
        if (!req.user.email || !req.body.postId || !req.body.comment || !req.body.date || !req.body.time) {
            return res.status(200).json({
                EM: 'Missing required parameters!',
                EC: '1',
                DT: '',
        })}
        let data = await commentService.createCommentSV(
            req.user.email,
            req.body.postId,
            req.body.comment,
            req.body.date,
            req.body.time
        )
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: `Comment success`,
                DT: data,
            })
        }
    } catch (error) {
        console.log('likePost controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}


const getOnePostComment = async (req, res) => {
    
}

module.exports = {
    createComment,

}