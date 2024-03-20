import { model, Schema, Types } from "mongoose";
import GenerationEntity from "../entity/GenerationEntity";

const GenerationSchema = new Schema<GenerationEntity>({
    name: { type:String, required:true, trim:true, unique:true, immutable:true },
    talentsGeneration: [{ type:Types.ObjectId, ref:"Talent", required:true }]
},
{ versionKey:false });

export default model("Generation",GenerationSchema,"Generation");