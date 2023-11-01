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
        console.log('uploadImage err service: ', error);
        return {
            EM: 'Something wrong in service',
            EC: '-5',
            DT: '',
        };
    }
}

const uploadImage = async (src, alt, caption, time) => {
    try {
        // let data = await db.Images.create({

        // })
        if (data) {
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