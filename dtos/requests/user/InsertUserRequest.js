import argon2 from 'argon2';
import Joi from 'joi';
// import bcrypt from 'bcryptjs';

class InsertUserRequest {
    constructor(data) {
        this.email = data.email;
        this.password = null;
        this.name = data.name;
        this.role = data.role;
        this.avatar = data.avatar;
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
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            name: Joi.string().required(),
            role: Joi.number().integer().min(1).required(),
            avatar: Joi.string().uri().allow("").optional(),
            phone: Joi.string().required(),
        });
        return schema.validate(data)
    }
}
export default InsertUserRequest;