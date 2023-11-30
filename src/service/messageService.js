import { Op } from 'sequelize'
import db from '../models/index.js'

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
   getChatboxSV,

}