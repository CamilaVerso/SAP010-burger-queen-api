'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'XSalada',
        price: 12.90,
        image: 'url_da_imagem',
        type: 'almoço',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);

    return Promise.resolve();
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Products', null, {});

    return Promise.resolve();
  },
};