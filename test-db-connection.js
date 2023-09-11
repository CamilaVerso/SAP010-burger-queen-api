const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.dbUrl);

// const sequelize = new Sequelize('postgres', 'postgres', '*BancoDeDados1*', {
// 	host: 'localhost',
// 	dialect: 'postgres', // Ou o dialect correspondente ao seu banco de dados (por exemplo, 'mysql' para MySQL)
// });

// Teste de conexão
sequelize.authenticate()
	.then(() => {
		console.log('Conexão bem-sucedida com o banco de dados.');
	})
	.catch(err => {
		console.error('Erro na conexão com o banco de dados:', err);
	});
