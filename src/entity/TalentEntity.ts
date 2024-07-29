export class TalentEntity {
    public name: string;
    public nameJP: string;
    public isActive: boolean;
    public image: string;

    constructor(name:string, namejp:string, img:string, active:boolean)
    {
        this.name = name;
        this.nameJP = namejp;
        this.isActive = active;
        this.image = img;
    }
}

export default TalentEntity;