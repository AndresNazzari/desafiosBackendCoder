const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`);
    },
});

const upload = multer({ storage: storage });
const uploadAvatar = upload.single('avatar');

module.exports = uploadAvatar;
