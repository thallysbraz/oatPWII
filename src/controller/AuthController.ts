import { Request, Response } from "express";
import User from "../database/schema/User";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
    async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = request.body
            const user = await User.findOne({ email });
            if (!user) {
                return response.status(401).send({
                    error: "Authenticate failed",
                    message: "Authenticate failed"
                })
            }
            const passwordMatched = await compare(password, user.password);
            if (!passwordMatched) {
                return response.status(401).send({
                    error: "Authenticate failed",
                    message: "Authenticate failed"
                })
            }
            const token = jwt.sign({ name: user.name }, "secret", { expiresIn: "1d" })
            return response.json({ user, token });
        } catch (error) {
            console.log(error)
            response.status(500).send({
                error: "Erro na autenticação",
                message: error
            })
        }
    }
}
export default new AuthController;