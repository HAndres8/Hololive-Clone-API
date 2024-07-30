import { Response } from "express";
import TalentSchema from "../schema/TalentSchema";
import GenerationSchema from "../schema/GenerationSchema";

class TalentDao {
    // obtain all talents
    protected static async getTalents(res:Response):Promise<any> {
        try{
            const data = await TalentSchema.find().sort({ name:1 });
            return res.status(200).json(data);
        }catch(error){
            return res.status(400).json({ response:'Talents could not be found' });
        }
    }

    // create one talent
    protected static async createTalents(params:any, res:Response):Promise<any> {
        const active = params.isActive;
        const exist = await TalentSchema.findOne(params);

        if(!active){
            return res.status(400).json({ response:'An inactive talent created for the first time is not allowed' });
        }
        if(exist){
            return res.status(400).json({ response:'The talent alredy exist' });
        }

        const myTalent = new TalentSchema(params);
        myTalent.save()
        .then(() => {
            return res.status(200).json({ response:"Talent created", talent:myTalent });
        })
        .catch(() => {
            return res.status(400).json({ response:"Error creating talent" });
        });
        
    }

    // delete one talent
    protected static async deleteTalents(id:any, res:Response):Promise<any> {
        try{
            const del = await TalentSchema.findByIdAndDelete(id).exec();

            if(!del){
                return res.status(400).json({ response:'Talent could not be found' });
            }

            await GenerationSchema.updateMany({"talentsGeneration": id},
                                              {$pull: {"talentsGeneration": id } });

            return res.status(200).json({ response:'Talent deleted', deleted:del });
        }catch(error){
            return res.status(400).json({ response:'Talent could not be eliminated' });
        }
    }

    // update one talent
    protected static async updateTalents(id:any, params:any, res:Response):Promise<any> {
        try{
            const upd = await TalentSchema.findByIdAndUpdate(id, params, {new:true}).exec();
            const gen = await GenerationSchema.findOne({"talentsGeneration": id}).exec();
            const active = params.isActive;
            
            if(!upd){
                return res.status(400).json({ response:'Talent could not be found' });
            }

            if(!active && gen?.name!='staff'){
                GenerationSchema.findOneAndUpdate({name: 'alum'},
                                                    {$push: {"talentsGeneration": id} }).exec();
            }else{
                GenerationSchema.findOneAndUpdate({name: 'alum'},
                                                    {$pull: {"talentsGeneration": id} }).exec();
            }
            return res.status(200).json({ response:'Talent updated', updated:upd });
        }catch(error){
            return res.status(400).json({ response:'Talent could not be updated' });
        }
    }
};

export default TalentDao;