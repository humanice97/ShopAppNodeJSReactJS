import Joi from 'joi';

class UpdateNewsRequest {
    constructor(data) {
        this.name = data.name;
        this.image = data.image;
        this.content = data.content;
    }
    static validate(data) {
        const schema = Joi.object({
            name: Joi.string().optional().allow(null),
            image: Joi.string().uri().optional().allow('', null),
            content: Joi.string().optional().allow(null),
        });
        return schema.validate(data)
    }
}
export default UpdateNewsRequest;