const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const db = {};
let sequelize;

// Configuração do Sequelize
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  throw new Error('A variável de ambiente DATABASE_URL não está definida.');
}

// Leitura dos modelos e associação
fs
  .readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1
  ))
  .forEach((file) => {
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associações de modelos
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
