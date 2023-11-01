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

        let data = await imageService.uploadImage(email, src, alt, caption, time, date)
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