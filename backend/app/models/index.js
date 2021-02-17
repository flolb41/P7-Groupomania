const dbConfig = require("../config/db.config.js");

/**
 * Structure Sequelize. Paramétrage grace au fichier de config
 */
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * Modèles des tables
 */
db.user = require("./user.model.js")(sequelize, Sequelize);
db.message = require('./message.model.js')(sequelize, Sequelize);

/**
 * Relations entre les tables
 */
db.user.hasMany(db.message);
db.message.belongsTo(db.user);

module.exports = db;
