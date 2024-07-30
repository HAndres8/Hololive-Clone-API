import { Response } from "express";
import TalentSchema from "../schema/TalentSchema";
import GenerationSchema from "../schema/GenerationSchema";
import BranchSchema from "../schema/BranchSchema";

class BranchDao {
    // obtain all branches with their generations
    protected static async getBranches(res:Response):Promise<any> {
        try{
            const data = await BranchSchema.find()
            .sort({ name:1 })
            .populate({
                path: "generationsBranch",
                select: "name",
                options: {sort: { _id:1 }}
            })
            .exec();

            return res.status(200).json(data);
        }catch(error){
            return res.status(400).json({ response:'Branches could not be found' });
        }
    }

    // create one branch
    protected static async createBranches(params:any, res:Response):Promise<any> {
        const exist = await BranchSchema.findOne(params);

        if(exist){
            return res.status(400).json({ response:'The branch alredy exist' });
        }
        
        const myBranch = new BranchSchema(params);
        myBranch.save()
        .then(() => {
            return res.status(200).json({ response:"Branch created", generation:myBranch });
        })
        .catch(() => {
            return res.status(400).json({ response:"Error creating branch" });
        });
        
    }

    // delete one branch
    protected static async deleteBranches(id:any, res:Response):Promise<any> {
        try{
            const del = await BranchSchema.findByIdAndDelete(id).exec();

            if(!del){
                return res.status(400).json({ response:'Branch could not be found' });
                
            }

            const gen = await GenerationSchema.find({ _id: del.generationsBranch });
            // Array of ids because there are many generations
            const idTal = gen.map(gen => gen.talentsGeneration);
            // Eliminate all affiliated generations
            await GenerationSchema.deleteMany({_id: del.generationsBranch}).exec();
            // Eliminate all affiliated talents
            await TalentSchema.deleteMany({_id: {$in: idTal} }).exec();
            
            return res.status(200).json({ response:'Branch deleted', deleted:del });
        }catch(error){
            return res.status(400).json({ response:'Branch could not be eliminated' });
        }
    }

    // update one branch
    protected static async updateBranches(id:any, params:any, res:Response):Promise<any> {
        try{
            const upd = await BranchSchema.findByIdAndUpdate(id, params, {new:true}).exec();

            if(upd){
                return res.status(200).json({ response:'Branch updated', updated:upd });
            }else{
                return res.status(400).json({ response:'Branch could not be found' });
            }
        }catch(error){
            return res.status(400).json({ response:'Branch could not be updated' });
        }
    }

    // search for a branch based on name
    protected static async searchBranch(name:any, res:Response):Promise<any> {
        try{
            const data = await BranchSchema.findOne({ "name": name })
            .populate({
                path: "generationsBranch",
                select: "name",
                options: {sort: { _id:1 }},
                populate: {
                    path: "talentsGeneration",
                    options: {sort: { isActive:1 }}
                }
            })
            .exec();

            if(!data){
                return res.status(400).json({ response:'The branch does not exist' });
            }

            return res.status(200).json(data);
        }catch(error){
            return res.status(400).json({ response:'Branch could not be found' });
        }
    }
    
    // obtain all branches with their generations and talents
    protected static async allBranches(res:Response):Promise<any> {
        try{
            const data = await BranchSchema.find()
            .sort({ _id:1 })
            .populate({
                path: "generationsBranch",
                select: "name",
                options: {sort: { _id:1 }},
                populate: {
                    path: "talentsGeneration",
                    options: {sort: { isActive:1 }}
                }
            })
            .exec();

            return res.status(200).json(data);
        }catch(error){
            return res.status(400).json({ response:'Branches could not be found' });
        }
    }
};

export default BranchDao;