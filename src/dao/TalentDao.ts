import { Response } from "express";
import TalentSchema from "../schema/TalentSchema";
import GenerationSchema from "../schema/GenerationSchema";

class TalentDao {
    protected static async getTalents(res:Response):Promise<any> {
        try{
            const data = await TalentSchema.find().sort({ name:1 });
            res.status(200).json(data);
        }catch(error){
            res.status(400).json({ response:'Talents could not be found' });
        }
    }

    protected static async createTalents(params:any, res:Response):Promise<any> {
        const alum = params.isAlum;
        const exist = await TalentSchema.findOne(params);

        if(alum){
            res.status(400).json({ response:'An Alum created for the first time is not allowed' });
        }else{
            if(exist){
                res.status(400).json({ response:'The talent alredy exist' });
            }else{
                const myTalent = new TalentSchema(params);
                myTalent.save()
                .then(() => {
                    res.status(200).json({ response:"Talent created", talent:myTalent });
                })
                .catch(() => {
                    res.status(400).json({ response:"Error creating talent" });
                });
            }
        }
    }

    protected static async deleteTalents(id:any, res:Response):Promise<any> {
        try{
            const del = await TalentSchema.findByIdAndDelete(id).exec();

            if(del){
                await GenerationSchema.updateMany({"talentsGeneration": id},
                                                  {$pull: {"talentsGeneration": id } });
                
                res.status(200).json({ response:'Talent deleted', deleted:del });
            }else{
                res.status(400).json({ response:'Talent could not be found' });
            }
        }catch(error){
            res.status(400).json({ response:'Talent could not be eliminated' });
        }
    }

    protected static async updateTalents(id:any, params:any, res:Response):Promise<any> {
        try{
            const upd = await TalentSchema.findByIdAndUpdate(id, params, {new:true}).exec();

            if(upd){
                res.status(200).json({ response:'Talent updated', updated:upd });
            }else{
                res.status(400).json({ response:'Talent could not be found' });
            }
        }catch(error){
            res.status(400).json({ response:'Talent could not be updated' });
        }
    }
};

export default TalentDao;