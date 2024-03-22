export class TalentEntity {
    public name: string;
    public nameJP: string;
    public isAlum: boolean;
    public image: string;

    constructor(name:string, namejp:string, alum:boolean, img:string)
    {
        this.name = name;
        this.nameJP = namejp;
        this.isAlum = alum;
        this.image = img;
    }
}

export default TalentEntity;