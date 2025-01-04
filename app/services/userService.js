const userModel = require('../modules/userModel');

module.exports = {
    createRecord: createRecord,
    displayRecord: displayRecord
}

async function createRecord(reqUrl, reqBody) {
    const { name, age } = reqBody;
    const record = new userModel({ name, age });
    redisClient.setEx(reqUrl, 3600, JSON.stringify(reqBody)); // Cache for 1 hour
    try {
        await record.save();
        return 'Record created'
    } catch (error) {
        throw 'Failed to create record'
    }
}

async function displayRecord(reqParams) {
    try {
        const { name } = reqParams;
        const record = await userModel.findOne({ name });
        console.log(await redisClient.get('/record')
        )
        return record;
    } catch (error) {
        throw 'Failed to fetch record'
    }
}