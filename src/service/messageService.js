import { Op } from 'sequelize'
import db from '../models/index.js'

const getListChatboxSV = async (accountId, limit) => {
   let listChatbox = await db.Chatboxs.findAll({
      where: { 
         [Op.or]: [
            { userId: +accountId },
            { userId2: +accountId }
         ]
      },
      attributes: ['id', 'userId', 'userId2', 'lastMessageId', 'createdAt', 'updatedAt'],
      subQuery: false,
      raw: true,
      nest: true,
      order: [['updatedAt', 'DESC']],  
      limit: +limit,
   })
   
   listChatbox = await Promise.all(listChatbox.map(async chatbox => {
      const user1 = await db.Users.findOne({
         where: { id: +chatbox.userId },
         raw: true,
         nest: true,
         attributes: ['id', 'avatar', 'username']
      })
      const user2 = await db.Users.findOne({
         where: { id: +chatbox.userId2 },
         raw: true,
         nest: true,
         attributes: ['id', 'avatar', 'username']
      })
      const lastMessage = await db.Messages.findOne({
         where: { id: +chatbox.lastMessageId },
         attributes: ['message']
      })

      return { 
         ...chatbox,
         account: +user1.id === +accountId ? user1 : user2,
         otherUser: +user1.id === +accountId ? user2 : user1,
         lastMessage: lastMessage?.message ? lastMessage.message : ''
      }
   }))

   return listChatbox
   

}

const getChatboxSV = async (accountId, userId, chatboxId, limit) => {
   const chatbox = await db.Chatboxs.findOne({
      // where: {
      //    [Op.or]: [
      //       { userId: +accountId, userId2: +userId },
      //       { userId: +userId, userId2: +accountId }
      //    ]
      // } 
      where: { id: +chatboxId }
   })
   
   if(chatbox) {
      const chatboxMessage = await db.Messages.findAll({
         where: { chatboxId: +chatboxId },
         order: [['updatedAt', 'DESC']],
         attributes: [ 'id', 'userId', 'type', 'message', 'src' ],
         limit: +limit,
      })

      return chatboxMessage

   } else {
      const newChatbox = await db.Chatboxs.create({
         name: `chatbox_${accountId}and${userId}`,
         userId: +accountId,
         userId2: +userId,
      })

      return {
         newChatboxId: +newChatbox.id
      }
   }




}

const createMessageSV = async (accountId, type, chatboxId, message, src, date, time) => {
   const newMessage = await db.Messages.create({
      type: type,
      message: message ? message : '',
      src: src ? src : '',
      userId: +accountId,
      chatboxId: +chatboxId,
      date: date,
      time: time,
   })

   const chatboxUpdate = await db.Chatboxs.update({
      lastMessageId: +newMessage.id
   },
   { where: { id: +chatboxId }}
   )

   return chatboxUpdate
}

module.exports = {
   getListChatboxSV,
   getChatboxSV,
   createMessageSV,


}