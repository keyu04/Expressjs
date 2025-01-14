const userService = require('../services/userService');
const func = require('../../utilities/utility-function');
module.exports = {
    userRegistration: userRegistration,
    userLogin: userLogin,
    userLogout: userLogout,
    userList: userList,
    userDisplay: userDisplay,
};

async function userRegistration(req, res) {
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_CONTROLLER} userRegistration()`);
    await userService.userRegistration(req.body)
        .then((result) => {
            logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userRegistration() ${func.jsonConst.LOG_SUCCESS}`);
            res.status(200).send(result);
        }).catch((error) => {
            logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userRegistration() ${func.jsonConst.LOG_ERROR}`);
            res.status(500).send(error);
        });
}

async function userLogin(req, res) {
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_CONTROLLER} userRegistration()`);
    await userService.userLogin(req.body)
        .then((result) => {
            logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userRegistration() ${func.jsonConst.LOG_SUCCESS}`);
            res.status(200).send(result);
        }).catch((error) => {
            logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userRegistration() ${func.jsonConst.LOG_ERROR}`);
            res.status(500).send(error);
        });
}

async function userLogout(req, res) {
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_CONTROLLER} userLogout()`);
    await userService.userLogout(req.body)
        .then((result) => {
            logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userLogout() ${func.jsonConst.LOG_SUCCESS}`);
            res.status(200).send(result);
        }).catch((error) => {
            logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userLogout() ${func.jsonConst.LOG_ERROR}`);
            res.status(500).send(error);
        });
}

async function userList(req, res) {
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_CONTROLLER} userList()`);
    await userService.userList()
        .then((result) => {
            logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userList() ${func.jsonConst.LOG_SUCCESS}`);
            res.status(200).send(result);
        }).catch((error) => {
            logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userList() ${func.jsonConst.LOG_ERROR}`);
            res.status(500).send(error);
        });
}

async function userDisplay(req, res) {
    logger.info(`${func.jsonConst.LOG_ENTER} ${func.jsonConst.LOG_CONTROLLER} userDisplay()`);
    await userService.userDisplay(req.body)
        .then((result) => {
            logger.info(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userDisplay() ${func.jsonConst.LOG_SUCCESS}`);
            res.status(200).send(result);
        }).catch((error) => {
            logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_CONTROLLER} userDisplay() ${func.jsonConst.LOG_ERROR}`);
            res.status(500).send(error);
        });
}