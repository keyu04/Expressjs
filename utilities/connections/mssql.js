const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // Use 'localhost' or IP address
    database: process.env.DB_DATABASE,
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

