import db from "../models";
import { buildSearchQuery } from "../utils/buildSearchQuery";

// Lấy danh sách danh mục, có hỗ trợ tìm kiếm và phân trang
export async function getCategory(req, res) {
    const { search = '' } = req.query;
    const { page, pageSize, offset } = req.pagination;

    // Dùng thêm hàm helper để tái sử dụng đối với tìm kiếm bằng từ khóa
    const whereClause = buildSearchQuery(search, ['name']);

    // Dùng promise để thực hiện 2 truy vấn song song để cải thiện hiệu suất
    const [categories, totalCategories] = await Promise.all([
        db.Category.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.Category.count({
            where: whereClause
        })
    ]);

    // Trả về lỗi 404 nếu không tìm thấy danh mục nào theo từ khóa đã search
    if (categories.length === 0) {
        return res.status(404).json({
            message: `No categories found for '${search}'`
        });
    }

    // Tính toán và gán thông tin phân trang vào req.pagination
    const totalPages = Math.ceil(totalCategories / pageSize);
    req.pagination.total = totalCategories;
    req.pagination.totalPages = totalPages;
    req.pagination.hasNextPages = page < totalPages;

    // Nếu tìm thấy danh mục thì trả về danh sách
    return res.status(200).json({
        message: 'Get list category success',
        data: categories,
        pagination: req.pagination,
    });
}

// Cập nhật danh mục theo id
export async function updateCategoryById(req, res) {
    const { id } = req.params;

    // Tìm danh mục theo id
    const category = await db.Category.findByPk(id);
    
    if (!category) {
        return res.status(404).json({
            message: 'Category not found'
        });
    }

    // Cập nhật danh mục
    await category.update(req.body);

    return res.status(200).json({
        message: 'Update category success',
        data: category
    });
}

// Xóa danh mục theo id
export async function deleteCategoryById(req, res) {
    const { id } = req.params;

    // Tìm danh mục theo id
    const category = await db.Category.findByPk(id);
    
    if (!category) {
        return res.status(404).json({
            message: 'Category not found'
        });
    }

    // Xóa danh mục
    await category.destroy();

    return res.status(200).json({
        message: 'Delete category success'
    });
}

// Lấy thông tin danh mục theo id
export async function getCategoryById(req, res) {
    const { id } = req.params;

    // Tìm danh mục theo khóa chính (primary key)
    const category = await db.Category.findByPk(id);

    // Nếu không tìm thấy danh mục
    if (!category) {
        return res.status(404).json({
            message: 'Not found a category'
        });
    }

    // Trả về dữ liệu danh mục nếu tìm thấy
    return res.status(200).json({
        message: 'Get category by id success',
        data: category
    });
}

// Thêm mới danh mục
export async function addCategory(req, res) {
    // Tạo danh mục mới từ req.body
    const category = await db.Category.create(req.body);

    // Trả về dữ liệu danh mục vừa thêm
    return res.status(201).json({
        message: 'Add category success',
        data: category
    });
}