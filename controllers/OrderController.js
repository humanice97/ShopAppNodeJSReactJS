import { Sequelize } from "sequelize"
import db from "../models"

export async function getOrder(req, res) {
    return res.status(200).json({
        message: 'Get list order success'
    });
}

export async function updateOrderById(req, res) {
    const { id } = req.params
    const [updated] = await db.Order.update(req.body, {
        where: { id }
    });
    if (updated > 0) {
        return res.status(200).json({
            message: 'Update order success'
        })
    } else {
        return res.status(404).json({
            message: 'Not found order or no changes applied'
        })
    }
}

export async function deleteOrderById(req, res) {
    const { id } = req.params
    const [deleted] = await db.Order.destroy({
        where: { id }
    });
    if (deleted > 0) {
        return res.status(200).json({
            message: 'Delete order success'
        })
    } else {
        return res.status(404).json({
            message: 'Not found order'
        })
    }
}

export async function getOrderById(req, res) {
    const { id } = req.params
    const orderSelect = await db.Order.findByPk(id)
    if (!orderSelect) {
        return res.status(404).json({
            message: 'Not found order'
        })
    }

    return res.status(200).json({
        message: 'Found order by id success',
        data: orderSelect
    })
}

export async function addOrder(req, res) {
    const userId = req.body.user_id
    const existingUser = await db.User.findByPk(userId)
    if (!existingUser) {
        return res.status(404).json({
            message: 'Insert order fail because not exists user',
        })
    } 
    const newOrder = await db.Order.create(req.body)
    if (newOrder) {
        return res.status(201).json({
            message: 'Insert order success',
            data: newOrder
        })
    } else {
        res.status(404).json({
            message: 'Insert order fail',
        })
    }
}
