// import imageService from '../service/imageService'

// const handleUploadImage = async (req, res) => {
//     console.log(req.file);
//     try {
//         let data = await imageService.uploadImage(req.body)
//         if(data) {
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT,
//             });
//         } else {
//             console.log('check err from imageController handleUploadImage');
//         }
//     } catch (error) {
//         console.log('handleUploadImage controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EX: '-5',
//             DT: '',
//         });
//     }
// }

// module.exports = {
//     handleUploadImage
// }