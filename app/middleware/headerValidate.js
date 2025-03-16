const jwt = require('jsonwebtoken');
const func = require('../../utilities/utility-function');

module.exports = {
    headerValidate: async function (req, res, next) {
        const token = req.headers['token'];
        const calling_entity = req.headers['calling_entity'];
        if (!(token || calling_entity)) return res.status(401).json({ message: 'Unauthorized access or missing calling entity' });

        try {
            const decoded = await jwt.verify(token, process.env.DEV_SECRET_KEY);

            const sessionCheck = await redisClient.get(`session_${decoded.userid}`);
            global.sessionObject = JSON.parse(sessionCheck)[0];

            if (!sessionCheck || sessionCheck === undefined) {
                logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_FUNCTION} headerValidate() Invalid or expired session`);
                return res.status(401).json({ message: 'Invalid or expired session' });
            }
            logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_FUNCTION} headerValidate() ${func.jsonConst.LOG_SUCCESS}`);
            next();
        } catch (error) {
            logger.error(`${func.jsonConst.LOG_EXIT} ${func.jsonConst.LOG_FUNCTION} headerValidate() ${func.jsonConst.LOG_ERROR} =>`, error);
            res.status(401).json({ message: 'Invalid token' });
        }
    }
};
