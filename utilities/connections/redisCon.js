const redis = require('redis');
// Create a Redis client
const redisClient = redis.createClient({
    socket: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT },
});

// Connect to Redis
(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
})();

global.redisClient = redisClient;
