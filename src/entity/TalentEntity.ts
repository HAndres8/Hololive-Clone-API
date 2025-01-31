export class TalentEntity {
    public name: string;
    public nameJP: string;
    public image: string;
    public isActive: boolean;
    public isAffiliate: boolean;

    constructor(name:string, namejp:string, img:string, active:boolean, affiliate:boolean)
    {
        this.name = name;
        this.nameJP = namejp;
        this.image = img;
        this.isActive = active;
        this.isAffiliate = affiliate;
    }
}

export default TalentEntity;