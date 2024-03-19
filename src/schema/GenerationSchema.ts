import { model, Schema, Types } from "mongoose";
import GenerationEntity from "../entity/GenerationEntity";

const GenerationSchema = new Schema<GenerationEntity>({
    name: { type:String, required:true, trim:true, unique:true },
    talentsGeneration: [{
        talent: { type:Types.ObjectId, ref:"Talent", required:true },
        numTalent: { type:Number, required:true }                       // Order of talent in her generation
    }]
},
{ versionKey:false });

export default model("Generation",GenerationSchema,"Generation");