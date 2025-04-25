import db from "../models"
import { buildSearchQuery } from "../utils/buildSearchQuery";

export async function getCategory(req, res) {
  const { search = '' } = req.query;
  const { page, pageSize, offset } = req.pagination;
  // Dùng thêm hàm helper để tái sử dụng đối với tìm kiếm bằng từ khóa
  const whereClause = buildSearchQuery(search, ['name']);
 // Dùng promise để thực hiện 2 truy vấn song song để cải thiện hiệu suất thay vì dùng await từng cái một
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
    // Đoạn này là trả về lỗi 404 do không tìm thấy loại hàng nào theo từ khóa đã search
  if (categories.length === 0) {
      return res.status(404).json({
          message: `No categories found for '${search}'`
      });
  }
    // Trả thêm dữ liệu về pagination
  const totalPages = Math.ceil(totalCategories / pageSize);
  req.pagination.total= totalCategories;
  req.pagination.totalPages = totalPages;
  req.pagination.hasNextPages = page < totalPages;
    // Nếu tìm thấy loại hàng
  return res.status(200).json({
      message: 'Get list category success',
      data: categories,
      pagination: req.pagination,
  });
}

export async function updateCategoryById(req, res) {
    res.status(200).json({
        message: 'Update category success'
    });
}

export async function deleteCategoryById(req, res) {
    res.status(200).json({
        message: 'Delete category success'
    });
}

export async function getCategoryById(req, res) {
      const { id } = req.params
        const categories = await db.Category.findByPk(id)
        if (!categories) {
            return res.status(404).json({
                message: 'Not found a product'
            });
        }
        return res.status(200).json({
            message: 'Get product by id success',
            data: categories
        })
}

export async function addCategory(req, res) {
      const categories = await db.Category.create(req.body);
      res.status(201).json({
        message: 'Add category success',
        data: categories
      });
  }
  
