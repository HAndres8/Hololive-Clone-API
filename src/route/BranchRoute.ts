import { Router } from "express";
import branchController from "../controller/BranchController";

class BranchRoute {
    public ApiRoute: Router;

    constructor() {
        this.ApiRoute = Router();
        this.routesConfig();
    };

    public routesConfig() {
        this.ApiRoute.get("/", branchController.get);
        this.ApiRoute.post("/create", branchController.create);
        this.ApiRoute.delete("/delete/:id", branchController.delete);
        this.ApiRoute.put("/update/:id", branchController.update);
        
        this.ApiRoute.get("/oneBranch/:name", branchController.searchOne);
        this.ApiRoute.get("/allBranches", branchController.searchAll);
    }
};

const branchRoute = new BranchRoute();
export default branchRoute.ApiRoute;