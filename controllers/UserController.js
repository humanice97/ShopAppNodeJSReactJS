import db from "../models";
import { Op } from 'sequelize';
import ResponseUser from '../dtos/responses/user/ResponseUser'
import argon2 from 'argon2'
import InsertUserRequest from "../dtos/requests/user/InsertUserRequest";
import jwt from "jsonwebtoken";
export async function updateUserById(req, res) {
    const { id } = req.params;
    const [updatedRows] = await db.User.update(req.body, {
        where: { id }
    });

    if (updatedRows > 0) {
        return res.status(200).json({
            message: 'Update user success'
        });
    } else {
        return res.status(404).json({
            message: 'User not found or no changes applied'
        });
    }
}


export async function registerUser(req, res) {
    const { email, phone } = req.body;

    // 1. Validate: Bắt buộc phải có Email hoặc Phone
    if (!email && !phone) {
        return res.status(400).json({
            message: 'Email or Phone number is required'
        });
    }

    // 2. Check Existing: Tìm user trùng Email hoặc trùng Phone
    const checkConditions = [];
    if (email) checkConditions.push({ email });
    if (phone) checkConditions.push({ phone });

    const existingUser = await db.User.findOne({
        where: {
            [Op.or]: checkConditions
        }
    });

    if (existingUser) {
        let msg = 'User already exists';
        
        // Xác định chính xác trùng cái nào để báo lỗi
        if (email && existingUser.email === email) msg = 'Email has been used';
        if (phone && +existingUser.phone === +phone) msg = 'Phone number has been used';

        return res.status(409).json({
            message: msg
        });
    }

    // 3. Xử lý logic tạo User
    const userRequest = new InsertUserRequest(req.body);
    
    // Gọi hàm init nếu có (ví dụ để hash password, validate data...)
    if (userRequest.init) {
        await userRequest.init(req.body);
    }

    const user = await db.User.create(userRequest);

    if (user) {
        return res.status(201).json({
            message: 'Register user success',
            data: new ResponseUser(user)
        });
    } 
    
    // Trường hợp db.User.create không throw lỗi nhưng trả về null/false
    return res.status(400).json({
        message: 'Register user fail',
    });
}

export async function login(req, res) {
        const { email, phone, password } = req.body;

        // 1. Validate: Phải có (Email hoặc Phone) VÀ Password
        if ((!email && !phone) || !password) {
            return res.status(400).json({
                message: 'Email/Phone and Password are required'
            });
        }

        // 2. Tìm User trong Database
        const checkConditions = [];
        if (email) checkConditions.push({ email });
        
        // Vẫn giữ logic ép kiểu số cho Phone như cũ để fix lỗi mất số 0 trong DB
        if (phone) checkConditions.push({ phone: +phone }); 

        const user = await db.User.findOne({
            where: {
                [Op.or]: checkConditions
            }
        });

        // 3. Nếu không tìm thấy User
        if (!user) {
            return res.status(404).json({
                message: 'Incorrect account or password' 
            });
        }

        // 4. Kiểm tra Password bằng Argon2
        // Cú pháp: argon2.verify(Mật_khẩu_đã_hash_trong_db, Mật_khẩu_người_nhập)
        const isMatch = await argon2.verify(user.password, password);
        
        if (!isMatch) {
            return res.status(401).json({
                message: 'Incorrect password or account'
            });
        }

        // Chỉ nên để những thông tin không nhạy cảm và cần thiết để xác thực
        const payload = {
            id: user.id,
            email: user.email,
            // role: user.role // Thường cần role để phân quyền Admin/User
        };

        // 5. Ký Token (Sign)
        // Lưu ý: 'SECRET_KEY' nên để trong file .env (process.env.JWT_SECRET)
        const secretKey = process.env.JWT_SECRET; 
        
        const accessToken = jwt.sign(payload, secretKey, {
            expiresIn: process.env.JWT_EXPIRATION
        });

        // 6. Trả về kết quả kèm Token
        const userData = new ResponseUser(user); 
        
        return res.status(200).json({
            message: 'Đăng nhập thành công',
            accessToken: accessToken, // <--- Trả token về cho Client lưu
            data: userData
        });
}