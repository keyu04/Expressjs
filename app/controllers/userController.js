const userService = require('../services/userService');

module.exports = {
    createRecord: createRecord,
    displayRecord: displayRecord,
};

async function createRecord(req, res) {
    await userService.createRecord(req.originalUrl,req.body)
        .then((result) => {
            res.status(200).send({ message: result });
        })
        .catch((error) => {
            res.status(500).send({ error: error });
        });
}

async function displayRecord(req, res) {
    await userService.displayRecord(req.params)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(500).send({ error: error });
        });
}