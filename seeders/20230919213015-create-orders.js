'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      {
        userId: 1,
        client: 'Cliente 1',
        status: 'Concluído',
        dateEntry: new Date(),
        dateProcessed: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const orderProductsData = [
      {
        orderId: 1,
        productId: 2,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 3,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    

    await queryInterface.bulkInsert('OrderProducts', orderProductsData);
    // const ordersData = [
    //   {
    //     userId: 1, // ID do usuário associado ao pedido
    //     client: 'Cliente 1',
    //     status: 'Pendente',
    //     dateEntry: new Date(),
    //     dateProcessed: null, // Como é um pedido pendente, a data de processamento é nula
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     userId: 2, // ID do usuário associado ao pedido
    //     client: 'Cliente 2',
    //     status: 'Em Preparo',
    //     dateEntry: new Date(),
    //     dateProcessed: null, // Como é um pedido em preparo, a data de processamento é nula
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     userId: 3, // ID do usuário associado ao pedido
    //     client: 'Cliente 3',
    //     status: 'Concluído',
    //     dateEntry: new Date(),
    //     dateProcessed: new Date(), // Como é um pedido concluído, forneça a data de processamento
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   // Adicione mais pedidos conforme necessário
    // ];

    // await queryInterface.bulkInsert('Order', ordersData, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('OrderProducts', null, {});
  },
};
