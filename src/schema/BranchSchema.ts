import { model, Schema, Types } from "mongoose";
import BranchEntity from "../entity/BranchEntity";

const BranchSchema = new Schema<BranchEntity>({
    name: { type:String, required:true, trim:true, unique:true },
    generationsBranch: [{
        generation: { type:Types.ObjectId, ref:"Generation", required:true },
        numGeneration: { type:Number, required:true }                       // Order of generations in its branch
    }],
},
{ versionKey:false });

export default model("Branch",BranchSchema,"Branch");