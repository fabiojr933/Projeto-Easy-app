const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const Validacao = require('./validacao');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),   
    Storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {    
            try {
                crypto.randomBytes(16, (err, hash) => {
                    if (err) cb(err);
                    const fileName = `${hash.toString('hex')}-${file.originalname}`;
                    cb(null, fileName)
                });
            } catch (error) {
            }
        }
    }),
    limits: {
        fileSize: 1000 * 1024 + 1024,
    },
    fileFilter: (req, file, cb) => {      
        const allowedMimes = ['application/octet-stream'];  
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}