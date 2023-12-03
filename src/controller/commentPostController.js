// import commentService from '../service/commentService'

// const createComment = async (req, res) => {
//     try {
//         if (!req.user.email || !req.body.postId || !req.body.comment || !req.body.date || !req.body.time) {
//             return res.status(200).json({
//                 EM: 'Missing required parameters!',
//                 EC: '1',
//                 DT: '',
//         })}
//         let data = await commentService.createCommentSV(
//             req.user.email,
//             req.body.postId,
//             req.body.comment,
//             req.body.date,
//             req.body.time
//         )
//         if(data) {
//             return res.status(200).json({
//                 EC: 0,
//                 EM: `Comment success`,
//                 DT: data,
//             })
//         }
//     } catch (error) {
//         console.log('likePost controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-5',
//             DT: '',
//         });
//     }
// }

// const likeComment = async (req, res) => {
//     try {
//         let data = await commentService.likeCommentSV(req.user.email, req.body.cmtId)
//         if(data) {
//             return res.status(200).json({
//                 EC: 0,
//                 EM: `Like comment ${data} success`,
//                 DT: data,
//             })
//         }
//     } catch (error) {
//         console.log('likeComment controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-5',
//             DT: '',
//         });
//     }
// }

// const unlikeComment = async (req, res) => {
//     try {
//         let data = await commentService.unlikeCommentSV(req.user.email, req.body.cmtId)
//         if(data) {
//             return res.status(200).json({
//                 EC: 0,
//                 EM: `Unlike comment ${data} success`,
//                 DT: data,
//             })
//         }
//     } catch (error) {
//         console.log('unlikeComment controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-5',
//             DT: '',
//         });
//     }
// }

// const countCommentLikes = async (req, res) => {
//     try {
//         let data = await commentService.countCommentLikesSV(req.body.cmtId)
//         return res.status(200).json({
//             EC: 0,
//             EM: `Get comment likes count success`,
//             DT: data,
//         })
//     } catch (error) {
//         console.log('countCommentLikes controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-5',
//             DT: '',
//         });
//     }
// }

// const getOnePostComments = async (req, res) => {
//     try {
//         let data = await commentService.getOnePostCommentsSV(req.user.email, req.body.postId, req.body.limit)
//         if(data) {
//             return res.status(200).json({
//                 EC: 0,
//                 EM: `get post comments success`,
//                 DT: data,
//             })
//         }
//     } catch (error) {
//         console.log('getOnePostComments controller err: ', error);
//         return res.status(500).json({
//             EM: 'error from server',
//             EC: '-5',
//             DT: '',
//         });
//     }
// }

// module.exports = {
//     createComment,
//     likeComment,
//     unlikeComment,
//     countCommentLikes,
//     getOnePostComments
// }