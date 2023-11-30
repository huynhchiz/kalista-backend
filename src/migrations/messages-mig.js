'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Messages', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         type: {
            type: Sequelize.STRING,
         },
         message: {
            type: Sequelize.STRING,
         },
         src: {
            type: Sequelize.STRING,
         },
         userId: {
            type: Sequelize.INTEGER,
         },
         chatboxId: {
            type: Sequelize.INTEGER,
         },
         date: {
            type: Sequelize.STRING,
         },
         time: {
            type: Sequelize.STRING,
         },

         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Messages');
   },
};
