import db from "../models";
import { buildSearchQuery } from "../utils/buildSearchQuery";

// Lấy danh sách thương hiệu, có hỗ trợ tìm kiếm và phân trang
export async function getBrand(req, res) {
    const { search = '' } = req.query;
    const { page, pageSize, offset } = req.pagination;

    const whereClause = buildSearchQuery(search, ['name']);

    const [brands, totalBrands] = await Promise.all([
        db.Brand.findAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        }),
        db.Brand.count({
            where: whereClause
        })
    ]);

    if (brands.length === 0) {
        return res.status(404).json({
            message: `No brands found for '${search}'`
        });
    }

    const totalPages = Math.ceil(totalBrands / pageSize);
    req.pagination.total = totalBrands;
    req.pagination.totalPages = totalPages;
    req.pagination.hasNextPages = page < totalPages;

    return res.status(200).json({
        message: 'Get list brand success',
        data: brands,
        pagination: req.pagination,
    });
}

// Cập nhật thương hiệu theo id
export async function updateBrandById(req, res) {
    const { id } = req.params;
  // Cập nhật danh mục trực tiếp bằng where
  const [updatedRows] = await db.Brand.update(req.body, {
    where: { id }
  });
  // Phản hồi thành công
  if (updatedRows > 0) {
    return res.status(200).json({
      message: 'Update brand success'
    });
  } else {
    // Nếu không có bản ghi nào được cập nhật
    return res.status(404).json({
      message: 'Brand not found or no changes applied'
    });
  }
}

// Xóa thương hiệu theo id
export async function deleteBrandById(req, res) {
    const { id } = req.params;
// Xóa danh mục trực tiếp bằng điều kiện where
  const deleted = await db.Brand.destroy({
    where: { id }
  });

  // Nếu không có bản ghi nào bị xóa (id không tồn tại)
  if (deleted > 0) {
    return res.status(200).json({
      message: 'Delete brand success'
    });
  } else {
    return res.status(404).json({
      message: 'Brand not found'
    });
  };
   
}

// Lấy thông tin thương hiệu theo id
export async function getBrandById(req, res) {
    const { id } = req.params;

    const brand = await db.Brand.findByPk(id);

    if (!brand) {
        return res.status(404).json({
            message: 'Not found a brand'
        });
    }

    return res.status(200).json({
        message: 'Get brand by id success',
        data: brand
    });
}

// Thêm mới thương hiệu
export async function addBrand(req, res) {
    const brand = await db.Brand.create(req.body);

    return res.status(201).json({
        message: 'Add brand success',
        data: brand
    });
}
