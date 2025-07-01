// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize, DataTypes) => {
    const cars = sequelize.define("cars", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return cars;
};
