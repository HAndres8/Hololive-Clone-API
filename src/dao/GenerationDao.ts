import { Response } from "express";
import TalentSchema from "../schema/TalentSchema";
import GenerationSchema from "../schema/GenerationSchema";
import BranchSchema from "../schema/BranchSchema";

class GenerationDao {
    // obtain all generations with their talents
    protected static async getGenerations(res:Response):Promise<any> {
        try{
            const data = await GenerationSchema.find()
            .sort({ name:1 })
            .populate({
                path: "talentsGeneration",
                select: "name nameJP",
                options: {sort: { isActive:1 }}
            })
            .exec();

            // First talents, then alums
            return res.status(200).json(data);
        }catch(error){
            return res.status(400).json({ response:'Generations could not be found' });
        }
    }

    // create one generation
    protected static async createGenerations(params:any, res:Response):Promise<any> {
        const exist = await GenerationSchema.findOne(params);

        if(exist){
            return res.status(400).json({ response:'The generation alredy exist' });
        }

        const myGeneration = new GenerationSchema(params);
        myGeneration.save()
        .then(() => {
            return res.status(200).json({ response:"Generation created", generation:myGeneration });
        })
        .catch(() => {
            return res.status(400).json({ response:"Error creating generation" });
        });
    }

    // delete one generation
    protected static async deleteGenerations(id:any, res:Response):Promise<any> {
        try{
            const del = await GenerationSchema.findByIdAndDelete(id).exec();

            if(!del){
                return res.status(400).json({ response:'Generation could not be found' });
            }

            // Removes the relation
            await BranchSchema.updateMany({"generationsBranch": id},
                                          {$pull: {"generationsBranch": id } });
            // Eliminate all affiliated talents
            await TalentSchema.deleteMany({_id: del.talentsGeneration}).exec();

            return res.status(200).json({ response:'Generation deleted', deleted:del });
        }catch(error){
            return res.status(400).json({ response:'Generation could not be eliminated' });
        }
    }

    // update one generation
    protected static async updateGenerations(id:any, params:any, res:Response):Promise<any> {
        try{
            const upd = await GenerationSchema.findByIdAndUpdate(id, params, {new:true}).exec();

            if(upd){
                return res.status(200).json({ response:'Generation updated', updated:upd });
            }else{
                return res.status(400).json({ response:'Generation could not be found' });
            }
        }catch(error){
            return res.status(400).json({ response:'Generation could not be updated' });
        }
    }

    // search for a generation based on name
    protected static async searchGeneration(name:any, res:Response):Promise<any> {
        try{
            const data = await GenerationSchema.findOne({ "name": name })
            .populate({
                path: "talentsGeneration",
                options: {sort: { isActive:1 }}
            })
            .exec();

            if(!data){
                return res.status(400).json({ response:'The generation does not exist' });
            }

            return res.status(200).json(data);
        }catch(error){
            return res.status(400).json({ response:'Generation could not be found' });
        }
    }
};

export default GenerationDao;