export async function getOrderDetails(req, res) {
    res.status(200).json({
        message: 'Get list order detail success'
    });
}

export async function updateOrderDetailById(req, res) {
    res.status(200).json({
        message: 'Update order detail success'
    });
}

export async function deleteOrderDetailById(req, res) {
    res.status(200).json({
        message: 'Delete order detail success'
    });
}

export async function getOrderDetailById(req, res) {
    res.status(200).json({
        message: 'Get order detail by id success'
    });
}

export async function addOrderDetail(req, res) {
    res.status(200).json({
        message: 'Add order detail success'
    });
}
