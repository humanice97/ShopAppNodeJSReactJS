import { storage } from '../config/configAppwrite.js';
import { InputFile } from 'node-appwrite/file';
import { ID } from 'node-appwrite';

export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Vui lòng chọn ảnh' });
        }

        console.log(`🚀 Đang upload ${req.files.length} ảnh từ RAM...`);

        const uploadPromises = req.files.map(file => {
            // Chú ý: file.buffer là dữ liệu ảnh nằm trong RAM
            const fileBuffer = InputFile.fromBuffer(file.buffer, file.originalname);

            return storage.createFile(
                process.env.APPWRITE_BUCKET_ID,
                ID.unique(),
                fileBuffer
            );
        });

        const results = await Promise.all(uploadPromises);

        // Map lại kết quả cho gọn
        const data = results.map(file => ({
            fileId: file.$id,
            name: file.name,
            url: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${file.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`
        }));

        return res.status(201).json({
            success: true,
            message: `Upload thành công ${results.length} ảnh`,
            data: data
        });

    } catch (error) {
        console.error('❌ Lỗi upload nhiều file:', error);
        return res.status(500).json({ message: error.message });
    }
};