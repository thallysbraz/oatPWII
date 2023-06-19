import { Request, Response } from "express";
import User from "../database/schema/User";

class UserController {

    async findAllUser(request: Request, response: Response) {
        try {
            const users = await User.find();
            return response.json(users);
        } catch (error) {
            response.status(500).send({
                error: "List users failed",
                message: error
            })
        }
    }
    async create(request: Request, response: Response) {
        try {
            const { name, email, password } = request.body
            const userExists = await User.findOne({ email });
            if (userExists) {
                return response.status(500).send({
                    error: "Registration failed",
                    message: "Email already exists"
                })
            }

            const user = await User.create({ name, email, password });
            return response.json(user)
        } catch (error) {
            response.status(500).send({
                error: "Registration failed",
                message: error
            })
        }
    }
    async updateUser(request: Request, response: Response) {
        try {
            const { name, email } = request.body;

            const userUpdate = await User.findOneAndUpdate({ name, email });
            return response.json(userUpdate)
        } catch (error) {
            response.status(500).send({
                error: "Update failed",
                message: error
            })
        }
    }
    async deleteUser(request: Request, response: Response) {
        try {
            const { email } = request.body
            const user = User.findOne({ email });
            if (!user) {
                return response.status(500).send({
                    error: "Delete failed",
                    message: "User not exists"
                })
            }
            await User.deleteOne({ email }).exec();

            return response.status(200).json({ message: "User deletado" });
        } catch (error) {
            response.status(500).send({
                error: "Delete failed",
                message: error
            })
        }
    }
}
export default new UserController;