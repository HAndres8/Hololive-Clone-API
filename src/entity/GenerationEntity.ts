import TalentEntity from "./TalentEntity";

export class GenerationEntity {
    public name: string;
    public talentsGeneration: TalentEntity[];

    constructor(name:string, tale:TalentEntity[])
    {
        this.name = name;
        this.talentsGeneration = tale;
    }
}

export default GenerationEntity;