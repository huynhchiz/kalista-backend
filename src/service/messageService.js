import { Op } from 'sequelize'
import db from '../models/index.js'

const getListChatboxSV = async (accountId, limit) => {
   const followingListId = await db.Followings.findAll({
       where: { userId: +accountId },
       attributes: [ 'following' ],
       raw: true,
   })
   followingListId = followingListId.map(item => (item.following))
   
   const listChatbox = await db.Users_Chatboxs.findAll({
      where: { 
         [Op.or]: [
            { userId: +accountId },
            { userId2: +accountId }
         ]
      },
      subQuery: false,
      include: { model: db.Users, attributes: [ 'id', 'avatar', 'username' ] },

      /////////// dang lam

   })

   console.log(listChatbox);


   

}

const getChatboxSV = async (accountId, userId, limit) => {
   const checkChatbox = await db.Users_Chatboxs.findOne({
      where: {
         [Op.or]: [
            { userId: +accountId, userId2: +userId },
            { userId: +userId, userId2: +accountId }
         ]
      } 
   })
   
   if(checkChatbox) {
      const chatbox = await db.Chatboxs.findOne({
         where: { id: +checkChatbox.chatboxId },
         attributes: [ 'id', 'name' ]
      })

      const chatboxMessage = await db.Messages.findAll({
         where: { chatboxId: +chatbox.id },
         order: [['updatedAt', 'DESC']],
         attributes: [ 'id', 'userId', 'type', 'message', 'src', 'date', 'time' ],
         limit: +limit,
      })

      return chatboxMessage

   } else {
      const newChatbox = await db.Chatboxs.create({
         name: `chatbox_${accountId}and${userId}`
      })

      await db.Users_Chatboxs.create({
         userId: +accountId,
         userId2: +userId,
         chatboxId: +newChatbox.id
      })

      return {
         newChatboxId: +newChatbox.id
      }
   }




}

module.exports = {
   getListChatboxSV,
   getChatboxSV,

}