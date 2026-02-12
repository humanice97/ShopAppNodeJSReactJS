import argon2 from 'argon2';
import Joi from 'joi';
// import { UserRole } from '../../../constants';
// import bcrypt from 'bcryptjs';

class LoginUserRequest {
    constructor(data) {
        this.email = data.email;
        this.password = null;
        this.phone = data.phone;
    }
    async encryptPassword(password) {
        try{
            return await argon2.hash(password)
        } catch (error) {
            console.error('error hash: ', error);
            throw error
        }
    }
    async init(data) {
        this.password = await this.encryptPassword(data.password)
        return this
    }
    static validate(data) {
        const schema = Joi.object({
            email: Joi.string().email().optional(),
            password: Joi.string().min(6).required(),
            phone: Joi.string().optional(),
        });
        return schema.validate(data)
    }
}
export default LoginUserRequest;