const { Pool } = require('pg');
const Sequelize = require('sequelize');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: '*BancoDeDados1*',
	port: 5432, // A porta padrão do PostgreSQL
});

const sequelize = new Sequelize(
	'postgres',
	'postgres',
	'*BancoDeDados1*',
	{
		host: 'localhost',
		dialect: 'postgres'
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adicione seus modelos ao objeto 'db' aqui, por exemplo:
db.User = sequelize.import('./models/User.js');

// Adicione associações de modelos, se aplicável.

module.exports = {
	db: db,
	pool: pool,
};
