module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "pass@123",
    DB: "ms_motor",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
