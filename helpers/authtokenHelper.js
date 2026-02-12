// helpers/authHelper.js
import jwt from 'jsonwebtoken';
import db from '../models';

export const verifyAndGetUserFromToken = async (req) => {
    // 1. LẤY TOKEN TỪ HEADER
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        const error = new Error('NoToken');
        error.status = 401; // Gán mã lỗi HTTP
        throw error;
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;

    // 2. VERIFY TOKEN
    // Nếu lỗi (hết hạn, sai key), jwt sẽ tự throw error
    const decoded = jwt.verify(token, secretKey);

    // 3. QUERY DATABASE
    const user = await db.User.findByPk(decoded.id, {
        attributes: ['id', 'email', 'role'] // Chỉ lấy cột cần thiết
    });

    if (!user) {
        const error = new Error('UserNotFound');
        error.status = 401;
        throw error;
    }

    return user;
};