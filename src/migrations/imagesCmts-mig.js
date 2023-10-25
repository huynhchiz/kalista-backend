'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('ImagesComments', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         
         comment: {
            type: Sequelize.STRING,
         },
         userId: {
            type: Sequelize.INTEGER,
         },
         imageId: {
            type: Sequelize.INTEGER,
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
      await queryInterface.dropTable('ImagesComments');
   },
};
