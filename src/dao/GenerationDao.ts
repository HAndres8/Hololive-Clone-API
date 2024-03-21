import { Response } from "express";
import TalentSchema from "../schema/TalentSchema";
import GenerationSchema from "../schema/GenerationSchema";
import BranchSchema from "../schema/BranchSchema";

class GenerationDao {
    protected static async getGenerations(res:Response):Promise<any> {
        try{
            const data = await GenerationSchema.find()
            .sort({ name:1 })
            .populate({
                path: "talentsGeneration",
                select: "name nameJP",
                options: {sort: { _id:1, isAlum:1 }}
            })
            .exec();

            // First talents, then alums
            res.status(200).json(data);
        }catch(error){
            res.status(400).json({ response:'Generations could not be found' });
        }
    }

    protected static async createGenerations(params:any, res:Response):Promise<any> {
        const exist = await GenerationSchema.findOne(params);

        if(exist){
            res.status(400).json({ response:'The generation alredy exist' });
        }else{
            const myGeneration = new GenerationSchema(params);
            myGeneration.save()
            .then(() => {
                res.status(200).json({ response:"Generation created", generation:myGeneration });
            })
            .catch(() => {
                res.status(400).json({ response:"Error creating generation" });
            });
        }
    }

    protected static async deleteGenerations(id:any, res:Response):Promise<any> {
        try{
            const del = await GenerationSchema.findByIdAndDelete(id).exec();

            if(del){
                // Removes the relation
                await BranchSchema.updateMany({"generationsBranch": id},
                                              {$pull: {"generationsBranch": id } });
                // Eliminate all affiliated talents
                await TalentSchema.deleteMany({_id: del.talentsGeneration}).exec();
                
                res.status(200).json({ response:'Generation deleted', deleted:del });
            }else{
                res.status(400).json({ response:'Generation could not be found' });
            }
        }catch(error){
            res.status(400).json({ response:'Generation could not be eliminated' });
        }
    }

    protected static async updateGenerations(id:any, params:any, res:Response):Promise<any> {
        try{
            const upd = await GenerationSchema.findByIdAndUpdate(id, params, {new:true}).exec();

            if(upd){
                res.status(200).json({ response:'Generation updated', updated:upd });
            }else{
                res.status(400).json({ response:'Generation could not be found' });
            }
        }catch(error){
            res.status(400).json({ response:'Generation could not be updated' });
        }
    }

    protected static async searchGeneration(name:any, res:Response):Promise<any> {
        try{
            const data = await GenerationSchema.findOne({ "name": name })
            .populate({
                path: "talentsGeneration",
                options: {sort: { _id:1, isAlum:1 }}
            })
            .exec();

            if(data){
                res.status(200).json(data);
            }else{
                res.status(400).json({ response:'The generation does not exist' });
            }
        }catch(error){
            res.status(400).json({ response:'Generation could not be found' });
        }
    }
};

export default GenerationDao;