import { Router } from "express";
import UserController from "./controller/User.controller";
import CarroController from "./controller/Carro.controller";
import AuthController from "./controller/AuthController";

const routes = Router();

routes.post("/auth", AuthController.authenticate);

routes.get("/user", UserController.findAllUser);
routes.post("/user", UserController.create);
routes.patch("/user", UserController.updateUser);
routes.delete("/user", UserController.deleteUser);

routes.get("/carro", CarroController.findAllCarros);
routes.post("/carro", CarroController.create);
routes.patch("/carro", CarroController.updateCarro);
routes.delete("/carro", CarroController.deleteCarro);

export default routes;