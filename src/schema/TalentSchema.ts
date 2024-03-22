import { model, Schema } from "mongoose";
import TalentEntity from "../entity/TalentEntity";

const TalentSchema = new Schema<TalentEntity>({
    name: { type:String, required:true, trim:true, unique:true, immutable:true },
    nameJP: { type:String, required:true, trim:true, unique:true, immutable:true },
    isAlum: { type:Boolean, required:true, trim:true },
    image: { type:String, required:true, trim:true }
},
{ versionKey:false });

export default model("Talent",TalentSchema,"Talent");