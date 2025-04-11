import { Sequelize } from "sequelize"
import db from "../models"

export async function getOrder(req, res) {
    res.status(200).json({
        message: 'Get list order success'
    });
}

export async function updateOrderById(req, res) {
    res.status(200).json({
        message: 'Update order success'
    });
}

export async function deleteOrderById(req, res) {
    res.status(200).json({
        message: 'Delete order success'
    });
}

export async function getOrderById(req, res) {
    res.status(200).json({
        message: 'Get order by id success'
    });
}

export async function addOrder(req, res) {
    res.status(200).json({
        message: 'Add order success'
    });
}
