import { storage } from '../config/configAppwrite.js';
import { InputFile } from 'node-appwrite/file';
import { ID } from 'node-appwrite';
import fs from "fs"

export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Vui lòng chọn ít nhất một ảnh để upload' });
        }

        console.log(`🚀 Bắt đầu upload ${req.files.length} ảnh...`);

        // 2. Tạo một mảng các Promise để upload song song (nhanh hơn upload tuần tự)
        const uploadPromises = req.files.map(async (file) => {
            const localFilePath = file.path;
            const originalName = file.originalname;

            // Chuẩn bị file
            const fileForAppwrite = InputFile.fromPath(localFilePath, originalName);

            // Upload lên Appwrite
            const response = await storage.createFile(
                process.env.APPWRITE_BUCKET_ID,
                ID.unique(),
                fileForAppwrite
            );

            // Trả về thông tin file sau khi upload xong
            return {
                fileId: response.$id,
                url: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${response.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`,
                name: response.name
            };
        });

        // 3. Chờ tất cả các file upload xong
        const results = await Promise.all(uploadPromises);

        // 4. Cleanup: Xóa tất cả file tạm trên server
        // (Dù thành công hay thất bại, bước cleanup nên được đảm bảo)
        req.files.forEach(file => {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        });

        // 5. Trả về mảng các ảnh đã upload
        return res.status(201).json({
            success: true,
            message: `Đã upload thành công ${results.length} ảnh`,
            data: results // Mảng chứa thông tin các ảnh
        });

    } catch (error) {
        // Cleanup lỗi: Nếu có lỗi, vẫn phải xóa các file tạm còn sót lại
        if (req.files) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            });
        }

        console.error('❌ Lỗi upload nhiều file:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server khi upload danh sách ảnh',
            error: error.message
        });
    }
};
