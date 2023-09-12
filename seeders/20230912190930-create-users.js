'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insira os dados na tabela "create-users"
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: 'senha1',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'waiter@example.com',
        password: 'senha2',
        role: 'waiter',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'chef@example.com',
        password: 'senha3',
        role: 'chef',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Remova os dados da tabela "create-users" se necessário
    await queryInterface.bulkDelete('create-users', null, {});

    return Promise.resolve();
  },
};