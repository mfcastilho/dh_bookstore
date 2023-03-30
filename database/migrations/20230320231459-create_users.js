'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('users', { 
      id:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      name:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      nickname:{
        type: Sequelize.STRING,
        allowNull: false
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('users');

  }
};
