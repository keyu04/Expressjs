const { DataTypes } = require('sequelize');

// I created this function to wait for the database call for some time.
const sequelizeConnection = require('../../utilities/connections/sequelize');
let UserMaster;
(async () => {
    const sequelize = await sequelizeConnection();

    if (!sequelize) {
        console.error('Failed to establish a database connection.');
        return;
    }

    UserMaster = sequelize.define('user_master', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        schema: 'master',
        tableName: 'user_master',
        timestamps: true,
    });

})();

module.exports = () => UserMaster; // get variable value as function