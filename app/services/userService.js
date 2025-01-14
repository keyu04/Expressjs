const userModel = require('../modules/userModel');
const usersSequenceModel = require('../modules/userSequelise');
const func = require('../../utilities/utility-function');
const jwt = require('jsonwebtoken');

module.exports = {
    userRegistration: userRegistration,
    userLogin: userLogin,
    userLogout: userLogout,
    userList: userList,
    userDisplay: userDisplay
}

async function userRegistration(reqBody) {
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_SERVICE} userRegistration()`);
    const { name, email, password } = reqBody;
    const record = new userModel({ name, email, password });
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return { message: 'User already exists' }
        } else {
            await record.save();
            logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userRegistration() ${func.jsonConst.LOG_SUCCESS}`);
            return { message: 'Record created' }
        }
    } catch (error) {
        logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userRegistration() ${func.jsonConst.LOG_ERROR} =>`, error);
        throw { message: 'Failed to create record', error: error.message }
    }
}

async function userLogin(reqBody, res) {
    const { email, password } = reqBody;
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_SERVICE} userLogin()`);
    try {
        const user = await userModel.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return { message: 'Invalid email or password' }
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.DEV_SECRET_KEY, {
            expiresIn: '1h',
        });

        // Store session token in Redis
        redisClient.setEx(`session_${user._id}`, 3600, token); // Expire in 1 hour
        logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userLogin() ${func.jsonConst.LOG_SUCCESS}`);
        return { message: 'Login successful', token }
    } catch (error) {
        logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userLogin() ${func.jsonConst.LOG_ERROR} =>`, error);
        throw { message: 'Server error', error: error.message }
    }
}

async function userLogout(reqBody) {
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_SERVICE} userLogout()`);
    const { userId } = reqBody;
    try {
        redisClient.del(`session_${userId}`);
        logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userLogout() ${func.jsonConst.LOG_SUCCESS}`);
        return { message: 'Logout successful' }
    } catch (error) {
        logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userLogout() ${func.jsonConst.LOG_ERROR} =>`, error);
        throw { message: 'Server error', error: error.message }
    }
}

async function userList() {
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_SERVICE} userList()`);
    try {
        const usersList = usersSequenceModel()
        const users = await usersList.findAll();
        logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userList() ${func.jsonConst.LOG_SUCCESS}`);
        return users;
    } catch (error) {
        logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userList() ${func.jsonConst.LOG_ERROR} =>`, error);
        throw { message: 'Server error', error: error.message }
    }
}

async function userDisplay(reqBody) {
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_SERVICE} userDisplay()`);
    const { userId } = reqBody;
    try {
        const pool = await sqlCon;
        const user = await pool.request()
            .query(`SELECT * FROM master.user_master with(nolock) where id = ${userId}`);
        if (!user) {
            return { message: 'User not found' }
        }
        logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userDisplay() ${func.jsonConst.LOG_SUCCESS}`);
        return user.recordset;
    } catch (error) {
        logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_SERVICE} userDisplay() ${func.jsonConst.LOG_ERROR} =>`, error);
        throw { message: 'Server error', error: error.message }
    }
}