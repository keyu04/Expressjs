
module.exports = {
    // constants links
    jsonConst: require('./constents/jsonConst'),



    // functions
    userJoiValidator: function userJoiValidator(schema, req, res, next) {
        const self = this;
        logger.info(`${self.jsonConst.LOG_ENTER} ${self.jsonConst.LOG_FUNCTION} userJoiValidator()`);
        const { error } = schema.validate(req.body);
        if (error) {
            logger.error(`${self.jsonConst.LOG_EXIT} ${self.jsonConst.LOG_FUNCTION} userJoiValidator() ${self.jsonConst.LOG_ERROR} =>`, error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }
        logger.info(`${self.jsonConst.LOG_EXIT} ${self.jsonConst.LOG_FUNCTION} userJoiValidator() ${self.jsonConst.LOG_SUCCESS}`);
        next();
    }
};
