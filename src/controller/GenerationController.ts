import { Request, Response } from "express";
import GenerationDao from "../dao/GenerationDao";

class GenerationController extends GenerationDao {
    public get(req:Request, res:Response) {
        GenerationController.getGenerations(res);
    }

    public create(req:Request, res:Response) {
        GenerationController.createGenerations(req.body, res);
    }

    public delete(req:Request, res:Response) {
        GenerationController.deleteGenerations(req.params.id, res);
    }

    public update(req:Request, res:Response) {
        GenerationController.updateGenerations(req.params.id, req.body, res);
    }

    public searchOne(req:Request, res:Response) {
        GenerationController.searchGeneration(req.params.name, res);
    }
}

const generationController = new GenerationController();
export default generationController;