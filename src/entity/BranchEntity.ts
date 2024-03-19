import GenerationEntity from "./GenerationEntity";

export class BranchEntity {
    public name: string;
    public generationsBranch: GenerationEntity[];

    constructor(name:string, gen:GenerationEntity[])
    {
        this.name = name;
        this.generationsBranch = gen;
    }
}

export default BranchEntity;