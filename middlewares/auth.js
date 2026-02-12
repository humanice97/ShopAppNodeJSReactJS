import jwt from 'jsonwebtoken';
import db from '../models'; // Import models của bạn để query DB
import { verifyAndGetUserFromToken } from '../helpers/authtokenHelper';

export const requireRoles = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            // 1. GỌI HELPER ĐỂ LẤY USER
            // Nếu lỗi, nó sẽ nhảy xuống catch ngay lập tức
            const user = await verifyAndGetUserFromToken(req);

            // 2. CHECK QUYỀN (ROLE) RIÊNG BIỆT
            if (allowedRoles.length > 0) {
                const userRole = parseInt(user.role);
                // Check xem role của user có nằm trong danh sách cho phép không
                const hasPermission = allowedRoles.map(r => parseInt(r)).includes(userRole);

                if (!hasPermission) {
                    return res.status(403).json({ 
                        message: 'Bạn không có quyền truy cập chức năng này' 
                    });
                }
            }

            // 3. GÁN USER VÀO REQUEST
            req.user = user;
            next();

        } catch (error) {
            // Xử lý các lỗi được ném ra từ helper hoặc từ thư viện JWT
            
            // Lỗi từ helper tự định nghĩa (NoToken, UserBlocked...)
            if (error.status) {
                let message = error.message;
                // Custom lại message cho thân thiện
                if (error.message === 'NoToken') message = 'Vui lòng cung cấp Token xác thực';
                if (error.message === 'UserNotFound') message = 'Tài khoản không tồn tại';
                if (error.message === 'UserBlocked') message = 'Tài khoản đã bị khóa';
                
                return res.status(error.status).json({ message });
            }

            // Lỗi từ thư viện JWT
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token đã hết hạn' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Token không hợp lệ' });
            }

            console.error('Auth Error:', error);
            return res.status(500).json({ message: 'Lỗi xác thực hệ thống' });
        }
    };
};

// Hàm wrapper cho 1 role duy nhất
export const requireRole = (role) => {
    return requireRoles([role]);
};