const jwt = require('jsonwebtoken');

module.exports = {
    headerValidate: headerValidate
};

async function headerValidate(req, res, next) {
    const token = req.headers['token'];
    const calling_entity = req.headers['calling_entity'];
    if (!token || calling_entity) return res.status(401).json({ message: 'Unauthorized access or missing calling entity' });

    try {
        const decoded = await jwt.verify(token, process.env.DEV_SECRET_KEY);
        req.user = decoded;

        const sessionToken = await redisClient.get(`session_${decoded.id}`);
        if (!sessionToken || sessionToken !== token) {
            return res.status(401).json({ message: 'Invalid or expired session' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

