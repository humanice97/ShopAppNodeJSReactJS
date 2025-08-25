import Joi from 'joi';

class UpdateOrderRequest {
    constructor(data) {
        this.user_id = data.user_id;
        this.status = data.status;
        this.note = data.note;
        this.total = data.total
    }
    static validate(data) {
        const schema = Joi.object({
            user_id: Joi.number().integer().optional(),
            status: Joi.number().integer().min(1).optional(),
            note: Joi.string().optional().allow('').optional(),
            total: Joi.number().integer().min(0).optional(),
        });
        return schema.validate(data)
    }
}
export default UpdateOrderRequest;