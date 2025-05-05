import Joi from 'joi';
// import bcrypt from 'bcryptjs';

class InsertUserRequest {
    constructor(data) {
        this.email = data.email;
        this.password = this.encryptPassword(data.password);
        this.name = data.name;
        this.role = data.role;
        this.avatar = data.avatar;
        this.phone = data.phone;
    }
    encryptPassword(password) {
        return 'password'
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