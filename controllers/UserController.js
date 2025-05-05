import db from "../models";
import ResponseUser from '../dtos/responses/user/ResponseUser'
import InsertUserRequest from "../dtos/requests/user/InsertUserRequest";
export async function updateUserById(req, res) {
    const { id } = req.params;
    const [updatedRows] = await db.User.update(req.body, {
        where: { id }
    });

    if (updatedRows > 0) {
        return res.status(200).json({
            message: 'Update user success'
        });
    } else {
        return res.status(404).json({
            message: 'User not found or no changes applied'
        });
    }
}

export async function addUser(req, res) {
    const existingUser = await db.User.findOne({
        where: { email: req.body.email }
    });
    if (existingUser) {
        return res.status(409).json({
            message: 'Email has been used'
        })
    }
    const user = await db.User.create(new InsertUserRequest(req.body))
    if (user) {
        return res.status(201).json({
            message: 'Add user success',
            data: new ResponseUser(user)
        });
    } else {
        return res.status(404).json({
            message: 'Add user fail',
        });
    }
}