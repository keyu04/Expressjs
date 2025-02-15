const multer = require('multer');
const path = require('path');
const fs = require('fs')
const ftp = require('../config/connections/ftpCons');

module.exports = {
    // constants links
    jsonConst: require('./constants/jsonConst'),


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
                const filePath = path.join(__dirname, '../app/assets/images/');
                fs.mkdirSync(filePath, { recursive: true });
                cb(null, path.join(__dirname, filePath)); // Save files to this directory
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
    }).any(),

    uploadFile: async function (reqFiles) {
        const self = this;
        const client = await ftp()
        try {
            const mainDir = 'sdcard';
            const subDir = 'ftpServer';

            // console.log("Listing files in the root directory:");
            // const customDir = (await client.list("/")).find(file => file.name === mainDir && file.isDirectory);
            // if (!customDir) {
            //     logger.info(`given directory not found! so Created that directory`);
            //     await client.ensureDir(`/sdcard`);
            // }

            await client.ensureDir(`/${mainDir}/${subDir}`);

            if (fs.existsSync(reqFiles.path)) {
                await client.uploadFrom(reqFiles.path, `/${mainDir}/${subDir}/${reqFiles.filename}`);
                logger.info(`${self.jsonConst.LOG_EXIT} ${self.jsonConst.LOG_FUNCTION} uploadFile() ${self.jsonConst.LOG_SUCCESS}`);
                return `/${mainDir}/${subDir}/${reqFiles.filename}`
            } else {
                logger.error(`${self.jsonConst.LOG_EXIT} ${self.jsonConst.LOG_FUNCTION} uploadFile() ${self.jsonConst.LOG_ERROR} Local file does not exist.`);
            }
        } catch (err) {
            logger.error(`${self.jsonConst.LOG_EXIT} ${self.jsonConst.LOG_FUNCTION} uploadFile()`, err);
        }
        client.close();
    },

    getImageBufferFromFTP: async function (remoteImagePath) {
        const self = this;
        const client = await ftp()
        const imagePath = path.join(path.join(__dirname, '../app/assets/images/'), path.basename(remoteImagePath));

        try {
            await client.downloadTo(imagePath, remoteImagePath);
            self.deleteImageAfterTimeout(imagePath, 1 * 60 * 1000);

            return imagePath;
        } catch (error) {
            logger.error(`${self.jsonConst.LOG_EXIT} ${self.jsonConst.LOG_FUNCTION} Error retrieving image from FTP server:`, error);
            throw error;
        } finally {
            client.close();
        }
    },

    deleteImageAfterTimeout: function (filePath, delay) {
        const self = this
        setTimeout(() => {
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        logger.error(`${self.jsonConst.LOG_EXIT} ${self.jsonConst.LOG_FUNCTION} Error deleting image:`, err);
                    } else {
                        // console.log(`Image deleted successfully: ${filePath}`);
                    }
                });
            }
        }, delay);
    },

    removeFile: function (reqFiles) {
        fs.unlinkSync(reqFiles);
    },
};
