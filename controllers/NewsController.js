import db from "../models";
import { buildSearchQuery } from "../utils/buildSearchQuery";

export async function getNews(req, res) {
    const { search = '' } = req.query;
    const { page, pageSize, offset } = req.pagination;

    const whereClause = buildSearchQuery(search, ['name', 'image', 'content']);

    const [newsList, totalNews] = await Promise.all([
        db.News.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.News.count({
            where: whereClause
        })
    ]);

    if (newsList.length === 0) {
        return res.status(404).json({
            message: `No news found for '${search}'`
        });
    }

    const totalPages = Math.ceil(totalNews / pageSize);
    req.pagination.total = totalNews;
    req.pagination.totalPages = totalPages;
    req.pagination.hasNextPages = page < totalPages;

    return res.status(200).json({
        message: 'Get list news success',
        data: newsList,
        pagination: req.pagination,
    });
}

export async function getNewsById(req, res) {
    const { id } = req.params;

    const news = await db.News.findByPk(id);

    if (!news) {
        return res.status(404).json({
            message: 'News not found'
        });
    }

    return res.status(200).json({
        message: 'Get news by id success',
        data: news
    });
}


export async function updateNewsById(req, res) {
    const { id } = req.params;

    const [updatedRows] = await db.News.update(req.body, {
        where: { id }
    });

    if (updatedRows > 0) {
        return res.status(200).json({
            message: 'Update news success'
        });
    } else {
        return res.status(404).json({
            message: 'News not found or no changes applied'
        });
    }
}

export async function deleteNewsById(req, res) {
    const { id } = req.params;

    const transaction = await db.sequelize.transaction();

    try {
        await db.NewsDetail.destroy({
            where: { news_id: id },
            transaction: transaction
        });

        const deleted = await db.News.destroy({
            where: { id },
            transaction: transaction
        });

        if (deleted) {
            await transaction.commit();
            return res.status(200).json({
                message: 'Delete news success'
            });
        } else {
            await transaction.rollback();
            return res.status(404).json({
                message: 'News not found'
            });
        }
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({
            message: 'Error when erase news',
            error: error.message
        });
    }

}

export async function addNews(req, res) {

    const transaction = await db.sequelize.transaction();

    try {
        const news = await db.News.create(req.body, { transaction });

        const productIds = req.body.product_ids;
        if (productIds && productIds.length) {
            const validProducts = await db.Product.findAll({
                where: {
                    id: productIds
                }, transaction
            });

            const validProductIds = validProducts.map(product => product.id)

            const filteredProductIds = productIds.filter(id => validProductIds.includes(id))

            const newDetailPromises = filteredProductIds.map(product_id =>
                db.NewsDetail.create({
                    product_id: product_id,
                    news_id: news.id
                }, { transaction })
            );

            await Promise.all(newDetailPromises);
        }

        await transaction.commit();

        return res.status(201).json({
            message: 'Add news success',
            data: news
        });
    } catch (err) {

        await transaction.rollback();
        res.status(500).json({
            message: 'Do not add news',
            error: err.message
        })
    }
}