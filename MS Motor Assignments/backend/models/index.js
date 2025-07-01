const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require('../config/dbConfig')


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: 3306,
    pool: {
        max: dbConfig.max,
        min: dbConfig.min,
        acquire: dbConfig.acquire,
        idle: dbConfig.idle,
    }
});
async function seqWrapper() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}
seqWrapper()

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, DataTypes);
db.cars = require("./carsModel")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
    console.log("Yes - re-sync done..!");
});

module.exports = db;