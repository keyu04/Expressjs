const userModel = require('../modules/userModel');
const func = require('../../utilities/utility-function');
const jwt = require('jsonwebtoken');

module.exports = {
    userRegistration: userRegistration,
    userLogin: userLogin,
}

async function userRegistration(reqBody) {
    logger.info(`${func.jsonConst.LOG_ENTER} service userRegistration()`);
    const { name, email, password } = reqBody;
    const record = new userModel({ name, email, password });
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return { message: 'User already exists' }
        } else {
            await record.save();
            logger.info(`${func.jsonConst.LOG_EXIT} service userRegistration() ${func.jsonConst.LOG_SUCCESS}`);
            return { message: 'Record created' }
        }
    } catch (error) {
        logger.error(`${func.jsonConst.LOG_EXIT} service userRegistration() ${func.jsonConst.LOG_ERROR} =>`, error);
        throw { message: 'Failed to create record', error: error.message }
    }
}

async function userLogin(reqBody, res) {
    const { email, password } = reqBody;
    logger.info(`${func.jsonConst.LOG_ENTER} service userLogin()`);
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
        logger.info(`${func.jsonConst.LOG_EXIT} service userLogin() ${func.jsonConst.LOG_SUCCESS}`);
        return { message: 'Login successful', token }
    } catch (error) {
        logger.error(`${func.jsonConst.LOG_EXIT} service userLogin() ${func.jsonConst.LOG_ERROR} =>`, error);
        throw { message: 'Server error', error: error.message }
    }
}
