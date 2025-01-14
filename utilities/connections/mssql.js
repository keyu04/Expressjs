const sql = require('mssql');

const config = {
    user: 'sa',
    password: '12345678',
    server: 'LAPTOP-BO7UCVSP', // Use 'localhost' or IP address
    database: 'Mydb',
    options: {
        encrypt: true, // Required for Azure connections
        trustServerCertificate: true, // Set to true for development; set false for production
    },
};

async function connectToDatabase() {
    try {
        const pool = await sql.connect(config);
        // console.log('Connected to MSSQL');
        return pool;
    } catch (err) {
        console.error('Database connection failed: ', err);
        throw err;
    }
}

global.sqlCon = connectToDatabase();

