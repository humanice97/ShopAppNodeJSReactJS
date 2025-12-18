import multer from "multer";

const fileFilter = (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
        return callback(new Error("Only image files allowed"));
    }
    callback(null, true);
}
const storage = multer.memoryStorage();
const uploadMultiple = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB / ảnh
    }
});
export default uploadMultiple;
