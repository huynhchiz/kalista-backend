import db from '../models/index'

const getPosts = async (req, res) => {
    try {
        let posts = []
        let images = await db.Images.findAll({
            raw: true
        })
        images = images.map(image => ({...image, type: 'image'}))

        let videos = await db.Videos.findAll({
            raw: true
        })
        videos = videos.map(video => ({...video, type: 'video'}))

        posts = images.concat(videos)
        if(posts && posts.length > 0) {
            return res.status(200).json({
                EC: 0,
                EM: 'Get posts success',
                DT: posts,
            })
        }
    } catch (error) {
        console.log('getPosts controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

module.exports = {
    getPosts
}