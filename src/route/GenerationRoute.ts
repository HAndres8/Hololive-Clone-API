import { Router } from "express";
import generationController from "../controller/GenerationController";

class GenerationRoute {
    public ApiRoute: Router;

    constructor() {
        this.ApiRoute = Router();
        this.routesConfig();
    };

    public routesConfig() {
        this.ApiRoute.get("/", generationController.get);
        this.ApiRoute.post("/create", generationController.create);
        this.ApiRoute.delete("/delete/:id", generationController.delete);
        this.ApiRoute.put("/update/:id", generationController.update);

        this.ApiRoute.get("/oneGen/:name", generationController.searchOne);
    };
};

const generationRoute = new GenerationRoute();
export default generationRoute.ApiRoute;