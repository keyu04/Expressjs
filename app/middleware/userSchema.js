const joi = require('joi');
const func = require('../../utilities/utility-function');

module.exports = {
    userLogin: userLogin,
    userRegistration: userRegistration,
    userLogout: userLogout,
    userDisplay: userDisplay
};
function userLogin(req, res, next) {
    const schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });
    func.userJoiValidator(schema, req, res, next);
}

function userRegistration(req, res, next) {
    const schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        name: joi.string().required()
    });
    func.userJoiValidator(schema, req, res, next);
}

function userLogout(req, res, next) {
    const schema = joi.object().keys({
        userId: joi.string().required()
    });
    func.userJoiValidator(schema, req, res, next);
}

function userDisplay(req, res, next) {
    const schema = joi.object().keys({
        userId: joi.number().required()
    });
    func.userJoiValidator(schema, req, res, next);
}