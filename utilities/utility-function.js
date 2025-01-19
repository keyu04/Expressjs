
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
    },

    upload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, '../app/assets/')); // Save files to this directory
            },
            filename: function (req, file, cb) {
                cb(null, `${Date.now()}-${file.originalname}`); // Custom filename
            }
        }),
        limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
        fileFilter: function (req, file, cb) {
            const fileTypes = /jpeg|jpg|png|gif/; // Allowed image types
            const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimeType = fileTypes.test(file.mimetype);
            if (extName && mimeType) {
                cb(null, true);  // Accept file
            } else {
                cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));  // Reject file
            }
        }
    }).array('files'),
};
