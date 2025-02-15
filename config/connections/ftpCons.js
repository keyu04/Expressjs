const ftp = require('basic-ftp');
const func = require('../../utilities/utility-function');

async function ftpClient() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({ host: process.env.FTP_HOST, port: process.env.FTP_PORT, user: process.env.FTP_USER, password: process.env.FTP_PASS, secure: false, });
        return client
    } catch (error) {
        logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_FUNCTION}  Error connecting to FTP server:`, error);
        throw error;
    }
}

module.exports = ftpClient;