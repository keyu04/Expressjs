
async function sequelizeConnection() {
  try {
    const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize('myDb', 'sa', '12345678', {
      host: 'localhost',
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