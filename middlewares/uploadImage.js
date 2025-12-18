import multer from "multer";
import path from 'path'
import fs from 'fs'

const fileFilter = (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
        return callback(new Error("Only image files allowed"));
    }
    callback(null, true);
}
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
const uploadMultiple = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB / ảnh
    }
});
export default uploadMultiple;
