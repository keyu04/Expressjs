const sqlCon = require('./connections/mssql')
const func = require('../utilities/utility-function');
module.exports = {
    SqlCall: SqlCall
}

async function SqlCall(schema, procName, params = [{}]) {
    try {
        logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_SERVICE} SqlCall()`);
        
        const pool = await sqlCon
        const request = pool.request();
        const payload = {}
        params.forEach((val, key) => {
            request.input(key, val);
            payload[key] = val;
        });

        console.log('>>> payload', payload);
        const result = await request.execute(schema + '.' + procName);

        logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} SqlCall() ${func.jsonConst.LOG_SUCCESS}`);
        return result.recordset;
    } catch (err) {
        logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} SqlCall() ${func.jsonConst.LOG_ERROR}`);
        throw err;
    }
}
