'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Posts', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         src: {
            type: Sequelize.STRING,
         },         
         alt: {
            type: Sequelize.STRING,
         },
         caption: {
            type: Sequelize.STRING,
         },
         time: {
            type: Sequelize.STRING,
         },
         date: {
            type: Sequelize.STRING,
         },
         
         userId: {
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
      await queryInterface.dropTable('Posts');
   },
};
