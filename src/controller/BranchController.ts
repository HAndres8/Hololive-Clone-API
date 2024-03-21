import { Request, Response } from "express";
import BranchDao from "../dao/BranchDao";

class BranchController extends BranchDao {
    public get(req:Request, res:Response) {
        BranchController.getBranches(res);
    }

    public create(req:Request, res:Response) {
        BranchController.createBranches(req.body, res);
    }

    public delete(req:Request, res:Response) {
        BranchController.deleteBranches(req.params.id, res);
    }

    public update(req:Request, res:Response) {
        BranchController.updateBranches(req.params.id, req.body, res);
    }

    public searchOne(req:Request, res:Response) {
        BranchController.searchBranch(req.params.name, res);
    }

    public searchAll(req:Request, res:Response) {
        BranchController.allBranches(res);
    }
}

const branchController = new BranchController();
export default branchController;