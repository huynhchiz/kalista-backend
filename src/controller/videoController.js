import { cloudinary } from '../config/configCloudinary'
import db from '../models/index'

const handleUploadVideoCloudinary = async (req, res) => {
    try {
        let data = await cloudinary.uploader.upload(`./${req.file.path}`, { resource_type: "video" })
        if(data) {
            return res.status(200).json({
                EC: 0,
                EM: 'Upload video to Cloudinary success',
                DT: data.url || data.secure_url,
            });
        }
    } catch (error) {
        console.log('handleUploadVideoCloudinary controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: -5,
            DT: '',
        });
    }
}

const handleUploadVideo = async (req, res) => {
    try {
        let email = req.user.email
        let src = req.body.src
        let alt = req.body.alt
        let caption = req.body.caption
        let time = req.body.time
        let date = req.body.date
        
        if (!email || !src || !alt || !time || !date) {
            return res.status(200).json({
               EM: 'Missing required parameters!',
               EC: '1',
               DT: '',
        })}
        
        let user = await db.Users.findOne({
            where: {email: email}
        })
        if (user) {
            await db.Videos.create({
                src: src,
                alt: alt,
                caption: caption,
                time: time,
                date: date,
                userId: user.id
            })
            return res.status(200).json({
                EC: 0,
                EM: 'Upload video success',
                DT: '',
            })
        }
    } catch (error) {
        console.log('handleUploadImage controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-5',
            DT: '',
        });
    }
}

module.exports = {
    handleUploadVideoCloudinary, handleUploadVideo
}