import imageService from '../service/imageService'

const handleUploadImageCloudinary = async (req, res) => {
    try {
        let data = await imageService.uploadImageCloudinary(req.file)
        if(data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } else {
            console.log('check err from imageController handleUploadImage');
        }
    } catch (error) {
        console.log('handleUploadImage controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EX: '-5',
            DT: '',
        });
    }
}

const handleUploadImage = async (req, res) => {
    console.log(req.user);
    try {
        let src = res.body.src
        let alt = res.body.alt
        let caption = res.body.caption
        let time = res.body.time
        if (!src || !alt || !caption || !time) {
            return res.status(200).json({
               EM: 'Missing required parameters!',
               EC: '1',
               DT: '',
        })}

        let data = await imageService.uploadImage(src, alt, caption, time)
        if(data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        } else {
            console.log('check err from imageController handleUploadImage');
        }
    } catch (error) {
        console.log('handleUploadImage controller err: ', error);
        return res.status(500).json({
            EM: 'error from server',
            EX: '-5',
            DT: '',
        });
    }
}

module.exports = {
    handleUploadImageCloudinary, handleUploadImage
}