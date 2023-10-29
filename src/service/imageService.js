import { cloudinary } from "../config/configCloudinary";

const uploadImage = async (image) => {
    console.log({image});
    try {
        let data = await cloudinary.uploader.upload(image, { upload_preset: "post_image" })
        if (data) {
            console.log(data);
            return {
                EC: 0,
                EM: 'Upload image success',
                DT: data,
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
    uploadImage,
}