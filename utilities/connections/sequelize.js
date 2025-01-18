
async function sequelizeConnection() {
  try {
    const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.localhost,
      dialect: 'mssql',
    });
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    // console.log('Connection established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return null;
  }
}
module.exports = sequelizeConnection;