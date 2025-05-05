import { Sequelize } from "sequelize"
import db from "../models"

export async function getOrderDetails(req, res) {
    const orderDetails = await db.OrderDetail.findAll()
    return res.status(200).json({
        message: 'Get list order detail success',
        data: orderDetails
    });
}

export async function updateOrderDetailsById(req, res) {
    const { id } = req.params
    const [updated] = await db.OrderDetail.update({
        where: { id }
    })
    if (updated > 0) {
        return res.status(200).json({
            message: 'Update order detail success'
        });
    } else {
        return res.status(404).json({
            message: 'OrderDetail not found or applied'
        });
    }
}

export async function deleteOrderDetailsById(req, res) {
    const { id } = req.params
    const [deleted] = await db.OrderDetail.destroy({
        where: { id }
    })
    if (deleted > 0) {
        return res.status(200).json({
            message: 'Delete order detail success'
        });
    } else {
        return res.status(404).json({
            message: 'OrderDetail not found or applied'
        });
    }
}

export async function getOrderDetailsById(req, res) {
    const { id } = req.params
    const orderDetail = await db.OrderDetail.findByPk(id)
    if (!orderDetail) {
        return res.status(404).json({
            message: 'OrderDetail not found'
        });
    } else {
        return res.status(200).json({
            message: 'Get order detail success',
            data: orderDetail
        });
    }
}

export async function addOrderDetails(req, res) {
    const newOrderDetails = await db.OrderDetail.create(req.body)
    return res.status(201).json({
        message: 'Add order detail success',
        data: newOrderDetails
    });
}
