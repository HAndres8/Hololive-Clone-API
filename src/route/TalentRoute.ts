import { Router } from "express";
import talentController from "../controller/TalentController";

class TalentRoute {
    public ApiRoute: Router;

    constructor() {
        this.ApiRoute = Router();
        this.routesConfig();
    };

    public routesConfig() {
        this.ApiRoute.get("/", talentController.get);
        this.ApiRoute.post("/create", talentController.create);
        this.ApiRoute.delete("/delete/:id", talentController.delete);
        this.ApiRoute.put("/update/:id", talentController.update);
    };
};

const talentRoute = new TalentRoute();
export default talentRoute.ApiRoute;