import db, { Sequelize } from "../models";

export async function getNewsDetail(req, res) {
    const { page, pageSize, offset } = req.pagination;

    const [details, total] = await Promise.all([
        db.NewsDetail.findAll({
            limit: pageSize,
            offset: offset,
            // include: [{ model: db.News }, { model: db.Product }]
        }),
        db.NewsDetail.count()
    ]);

    const totalPages = Math.ceil(total / pageSize);
    req.pagination.total = total;
    req.pagination.totalPages = totalPages;
    req.pagination.hasNextPages = page < totalPages;

    return res.status(200).json({
        message: 'Get list news detail success',
        data: details,
        pagination: req.pagination,
    });
}

export async function getNewsDetailById(req, res) {
    const { id } = req.params;

    const detail = await db.NewsDetail.findByPk(id, {
        include: [{ model: db.News }, { model: db.Product }]
    }
    );

    if (!detail) {
        return res.status(404).json({
            message: 'News detail not found'
        });
    }

    return res.status(200).json({
        message: 'Get news detail by id success',
        data: detail
    });
}

export async function addNewsDetail(req, res) {
    const { product_id, news_id } = req.body

    const productExists = await db.Product.findByPk(product_id);
    if (!productExists) {
        return res.status(404).json({
            message: 'Product is not exists'
        });
    }
    const newsExists = await db.News.findByPk(news_id);
    if (!newsExists) {
        return res.status(404).json({
            message: 'News is not exists'
        });
    }

    const duplicateExists = await db.NewsDetail.findOne({
        where: {news_id , product_id}
    })
    if (duplicateExists) {
        return res.status(409).json({
            message: 'Relationship of product and news has exists'
        });
    }

    const detail = await db.NewsDetail.create({ product_id, news_id });

    return res.status(201).json({
        message: 'Add news detail success',
        data: detail
    });
}

export async function updateNewsDetailById(req, res) {
    const { id } = req.params;
    const { product_id, news_id } = req.body

    const productExists = await db.Product.findByPk(product_id);
    if (!productExists) {
        return res.status(404).json({
            message: 'Product is not exists'
        });
    }
    const newsExists = await db.News.findByPk(news_id);
    if (!newsExists) {
        return res.status(404).json({
            message: 'News is not exists'
        });
    }

    const existingDuplicate = await db.NewsDetail.findOne({
        where: {
            product_id,
            news_id,
            // Tìm xem có ai ngoài id đang sử dụng không
            id: {[Sequelize.Op.ne]: id}
        }
    })

    if (existingDuplicate) {
       return res.status(409).json({
            message: 'Relationship of product and news has exists in another record'
        })
    }

    const [updatedRows] = await db.NewsDetail.update(req.body, {
        where: { id }
    });

    if (updatedRows > 0) {
        return res.status(200).json({
            message: 'Update news detail success'
        });
    } else {
        return res.status(404).json({
            message: 'News detail not found or no changes applied'
        });
    }
}

export async function deleteNewsDetailById(req, res) {
    const { id } = req.params;

    const deleted = await db.NewsDetail.destroy({
        where: { id }
    });

    if (deleted > 0) {
        return res.status(200).json({
            message: 'Delete news detail success'
        });
    } else {
        return res.status(404).json({
            message: 'News detail not found'
        });
    }
}