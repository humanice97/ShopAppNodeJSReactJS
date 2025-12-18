import db from "../models";
import { buildSearchQuery } from "../utils/buildSearchQuery";

// Lấy danh sách banner, có hỗ trợ tìm kiếm và phân trang
export async function getBanner(req, res) {
    const { search = '' } = req.query;
    const { page, pageSize, offset } = req.pagination;

    const whereClause = buildSearchQuery(search, ['name', 'image']);

    const [banners, totalBanners] = await Promise.all([
        db.Banner.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.Banner.count({
            where: whereClause
        })
    ]);

    if (banners.length === 0) {
        return res.status(404).json({
            message: `No banners found for '${search}'`
        });
    }

    const totalPages = Math.ceil(totalBanners / pageSize);
    req.pagination.total = totalBanners;
    req.pagination.totalPages = totalPages;
    req.pagination.hasNextPages = page < totalPages;

    return res.status(200).json({
        message: 'Get list banner success',
        data: banners,
        pagination: req.pagination,
    });
}

// Lấy banner theo id
export async function getBannerById(req, res) {
    const { id } = req.params;

    const banner = await db.Banner.findByPk(id);

    if (!banner) {
        return res.status(404).json({
            message: 'Banner not found'
        });
    }

    return res.status(200).json({
        message: 'Get banner by id success',
        data: banner
    });
}

// Thêm mới banner
export async function addBanner(req, res) {
    const banner = await db.Banner.create(req.body);

    return res.status(201).json({
        message: 'Add banner success',
        data: banner
    });
}

// Cập nhật banner theo id
export async function updateBannerById(req, res) {
    const { id } = req.params;

    const [updatedRows] = await db.Banner.update(req.body, {
        where: { id }
    });

    if (updatedRows > 0) {
        return res.status(200).json({
            message: 'Update banner success'
        });
    } else {
        return res.status(404).json({
            message: 'Banner not found or no changes applied'
        });
    }
}

// Xóa banner theo id
export async function deleteBannerById(req, res) {
    const { id } = req.params;

    const deleted = await db.Banner.destroy({
        where: { id }
    });

    if (deleted) {
        return res.status(200).json({
            message: 'Delete banner success'
        });
    } else {
        return res.status(404).json({
            message: 'Banner not found'
        });
    }
}