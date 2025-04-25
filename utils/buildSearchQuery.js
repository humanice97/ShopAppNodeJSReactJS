import { Sequelize } from "sequelize"
const { Op } = Sequelize;

export function buildSearchQuery(search = '', fields = []) {
    if (!search || search.trim() === '') return {};

    return {
        [Op.or]: fields.map(field => ({
            [field]: {
                [Op.like]: `%${search}%`
            }
        }))
    };
}
