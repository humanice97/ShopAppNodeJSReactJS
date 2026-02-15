import Joi from 'joi';

class InsertProductRequest {
    constructor(data) {
        this.name = data.name;
        this.price = data.price;
        this.old_price = data.old_price;
        this.image = data.image;
        this.description = data.description;
        this.specification = data.specification;
        this.buy_turn = data.buy_turn;
        this.quantity = data.quantity;
        this.sku = data.sku;
        this.brand_id = data.brand_id;
        this.category_id = data.category_id;
    }
    static validate(data) {
        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().positive().required(),
            old_price: Joi.number().positive(),
            image: Joi.allow("").optional(),
            description: Joi.string().optional(),
            specification: Joi.string().required(),
            buy_turn: Joi.number().integer().min(0),
            quantity: Joi.number().integer().min(0),
            sku: Joi.string().optional(),
            brand_id: Joi.number().integer().required(),
            category_id: Joi.number().integer().required(),
        });
        return schema.validate(data)
    }
}
export default InsertProductRequest;