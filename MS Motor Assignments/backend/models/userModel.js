// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email_Id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return users;
};
