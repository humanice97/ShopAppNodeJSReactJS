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
            url: `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKET_ID}/files/${file.$id}/view?project=${process.env.APPWRITE_PROJECT_ID}`
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
const parseUrl = (url) => {
    const match = url.match(/buckets\/([^/]+)\/files\/([^/]+)/);
    return match ? { bucketId: match[1], fileId: match[2] } : null;
};

export const deleteImages = async (req, res) => {
        const {data} = req.body
        if (!data || !Array.isArray(data) || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy dữ liệu ảnh (File not found)",
            });
        }
        const deletePromises = data.map(item => {
    
            const bucketId = parseUrl(item.url);
            
            if (!bucketId) {
                console.log(`❌ Bỏ qua file ${item.name} vì URL không hợp lệ`);
                return null;
            }

            console.log(`🗑️ Đang xóa file: ${item.name} | Bucket: ${bucketId} | ID: ${item.fileId}`);
            
            // Gọi lệnh xóa
            return storage.deleteFile(bucketId, item.fileId)
            .catch(err => {
                // Chỉ log lỗi để biết, không throw lỗi ra ngoài middleware
                console.error(`⚠️ Không xóa được file ${item.name}: ${err.message}`);
                return null; 
            });
            
        });

        // Lọc bỏ các giá trị null (nếu có URL lỗi) và chờ xóa xong
        await Promise.all(deletePromises.filter(p => p !== null));
        return res.status(200).json({
            success: true,
            message: `Xóa ảnh thành công!`,
        });

}