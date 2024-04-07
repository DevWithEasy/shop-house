const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        const fileName = Date.now()+'_'+ file.originalname.toLowerCase().split(' ').join('_')
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500000
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Invalid file type. Only jpg.jepg and png are allowed.'));
        }
    }
})

module.exports = upload