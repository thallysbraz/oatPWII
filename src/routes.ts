import { Router } from "express";
import UserController from "./controller/User.controller";
import CarroController from "./controller/Carro.controller";
import AuthController from "./controller/AuthController";
import ensureAuthenticate from "./middlewate/ensureAuthenticated";

const routes = Router();

routes.post("/auth", AuthController.authenticate);

routes.get("/user", ensureAuthenticate, UserController.findAllUser);
routes.post("/user", UserController.create);
routes.patch("/user", ensureAuthenticate, UserController.updateUser);
routes.delete("/user", ensureAuthenticate, UserController.deleteUser);

routes.get("/carro", ensureAuthenticate, CarroController.findAllCarros);
routes.post("/carro", ensureAuthenticate, CarroController.create);
routes.patch("/carro", ensureAuthenticate, CarroController.updateCarro);
routes.delete("/carro", ensureAuthenticate, CarroController.deleteCarro);

export default routes;