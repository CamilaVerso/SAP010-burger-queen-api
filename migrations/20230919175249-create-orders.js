'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      client: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('Pendente', 'Em Preparo', 'Concluído'),
        allowNull: false,
        defaultValue: 'Pendente',
      },
      dateEntry: {
        type: Sequelize.DATE,
      },
      dateProcessed: {
        type: Sequelize.DATE,
        allowNull: true,
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

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('Orders');
},
};
