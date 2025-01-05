const userService = require('../services/userService');
const func = require('../../utilities/utility-function');
module.exports = {
    userRegistration: userRegistration,
    userLogin: userLogin,
};

async function userRegistration(req, res) {
    logger.info(`${func.jsonConst.LOG_ENTER} controller userRegistration()`);
    await userService.userRegistration(req.body)
        .then((result) => {
            logger.info(`${func.jsonConst.LOG_EXIT} controller userRegistration() ${func.jsonConst.LOG_SUCCESS}`);
            res.status(200).send(result);
        })
        .catch((error) => {
            logger.error(`${func.jsonConst.LOG_EXIT} controller userRegistration() ${func.jsonConst.LOG_ERROR}`);
            res.status(500).send(error);
        });
}

async function userLogin(req, res) {
    logger.info(`${func.jsonConst.LOG_ENTER} controller userRegistration()`);
    await userService.userLogin(req.body)
        .then((result) => {
            logger.info(`${func.jsonConst.LOG_EXIT} controller userRegistration() ${func.jsonConst.LOG_SUCCESS}`);
            res.status(200).send(result);
        })
        .catch((error) => {
            logger.error(`${func.jsonConst.LOG_EXIT} controller userRegistration() ${func.jsonConst.LOG_ERROR}`);
            res.status(500).send(error);
        });
}