import Joi from 'joi';

class UpdateBannerRequest {
    constructor(data) {
        this.name = data.name;
        this.image = data.image;
        this.status = data.status;
    }

    static validate(data) {
        const schema = Joi.object({
            name: Joi.string().optional(),
            image: Joi.string().uri().allow('', null).optional(),
            status: Joi.number().integer().valid(0, 1).optional()
        });

        return schema.validate(data);
    }
}

export default UpdateBannerRequest;
