'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   // chạy cái này trong gitbash để tạo table user | running migrations
   // npx sequelize-cli db:migrate
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Users', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },

         userId: {
            type: Sequelize.INTEGER,
         },
         userFollowId: {
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
      await queryInterface.dropTable('Users');
   },
};
