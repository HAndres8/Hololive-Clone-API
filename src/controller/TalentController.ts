import { Request, Response } from "express";
import TalentDao from "../dao/TalentDao";

class TalentController extends TalentDao {
    public get(req:Request, res:Response) {
        TalentController.getTalents(res);
    }

    public create(req:Request, res:Response) {
        TalentController.createTalents(req.body, res);
    }

    public delete(req:Request, res:Response) {
        TalentController.deleteTalents(req.params.id, res);
    }

    public update(req:Request, res:Response) {
        TalentController.updateTalents(req.params.id, req.body, res);
    }
}

const talentController = new TalentController();
export default talentController;