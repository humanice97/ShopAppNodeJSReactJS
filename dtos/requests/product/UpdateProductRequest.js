import Joi from 'joi';

class UpdateProductRequest {
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
            name: Joi.string().optional(),
            price: Joi.number().positive().optional(),
            old_price: Joi.number().positive().optional(),
            image: Joi.string().allow("").optional(),
            description: Joi.string().optional(),
            specification: Joi.string().optional(),
            buy_turn: Joi.number().integer().min(0).optional(),
            quantity: Joi.number().integer().min(0).optional(),
            sku: Joi.string().optional(),
            brand_id: Joi.number().integer().optional(),
            category_id: Joi.number().integer().optional(),
        });
        return schema.validate(data)
    }
}
export default UpdateProductRequest;