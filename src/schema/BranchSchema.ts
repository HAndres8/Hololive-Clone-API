import { model, Schema, Types } from "mongoose";
import BranchEntity from "../entity/BranchEntity";

const BranchSchema = new Schema<BranchEntity>({
    name: { type:String, required:true, trim:true, unique:true, immutable:true },
    generationsBranch: [{ type:Types.ObjectId, ref:"Generation", required:true }]
},
{ versionKey:false });

export default model("Branch",BranchSchema,"Branch");