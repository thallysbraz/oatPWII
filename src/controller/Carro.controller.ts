import { Request, Response } from "express";
import Carro from "../database/schema/Carro";

class CarroController {

    async findAllCarros(request: Request, response: Response) {
        try {
            const carros = await Carro.find();
            return response.json(carros);
        } catch (error) {
            response.status(500).send({
                error: "List carros failed",
                message: error
            })
        }
    }
    async create(request: Request, response: Response) {
        try {
            const { name, marca, modelo, id } = request.body
            const carroExists = await Carro.findOne({ id });
            if (carroExists) {
                return response.status(500).send({
                    error: "Registration failed",
                    message: "Carro already exists"
                })
            }
            const carro = await Carro.create({ id, name, marca, modelo });
            return response.json(carro)
        } catch (error) {
            response.status(500).send({
                error: "Registration failed",
                message: error
            })
        }
    }
    async updateCarro(request: Request, response: Response) {
        try {
            const { name, marca, modelo } = request.body;

            const carroUpdate = await Carro.findOneAndUpdate({ name, marca, modelo });
            return response.json(carroUpdate)
        } catch (error) {
            response.status(500).send({
                error: "Update failed",
                message: error
            })
        }
    }
    async deleteCarro(request: Request, response: Response) {
        try {
            const { id, name, marca, modelo } = request.body;
            const carro = Carro.findOne({ name, marca, modelo });
            if (!carro) {
                return response.status(500).send({
                    error: "Delete failed",
                    message: "carro not exists"
                })
            }
            await Carro.deleteOne({ id, name, marca, modelo }).exec();

            return response.status(200).json({ message: "carro deletado" });
        } catch (error) {
            response.status(500).send({
                error: "Delete failed",
                message: error
            })
        }
    }
}
export default new CarroController;