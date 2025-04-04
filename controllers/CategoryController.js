export async function getCategories(req, res) {
    res.status(200).json({
        message: 'Get list category success'
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
    res.status(200).json({
        message: 'Get category by id success'
    });
}

export async function addCategory(req, res) {
    res.status(200).json({
        message: 'Add category success'
    });
}
