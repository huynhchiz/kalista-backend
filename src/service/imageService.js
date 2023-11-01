import { cloudinary } from '../config/configCloudinary'
import db from '../models/index'

const uploadImageCloudinary = async (image) => {
    try {
        let data = await cloudinary.uploader.upload(`./${image.path}`)
        if (data) {
            return {
                EC: 0,
                EM: 'Upload image tp Cloudinary success',
                DT: data.url || data.secure_url,
            }
        }
    } catch (error) {
        console.log('uploadImageCloudinary err service: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-5',
            DT: '',
        };
    }
}

const uploadImage = async (email, src, alt, caption, time, date) => {
    try {
        let user = await db.Users.findOne({
            where: {email: email}
        })

        if (user) {
            await db.Images.create({
                src: src,
                alt: alt,
                caption: caption,
                time: time,
                date: date,
                userId: user.id
            })
            return {
                EC: 0,
                EM: 'Upload image success',
                DT: '',
            }
        }
    } catch (error) {
        console.log('uploadImage err service: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-5',
            DT: '',
        };
    }
}



module.exports = {
    uploadImageCloudinary, uploadImage
}