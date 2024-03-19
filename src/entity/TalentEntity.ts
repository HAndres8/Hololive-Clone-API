export class TalentEntity {
    public name: string;
    public nameJP: string;
    public isAlum: boolean;
    public url: string;

    constructor(name:string, namejp:string, alum:boolean, url:string)
    {
        this.name = name;
        this.nameJP = namejp;
        this.isAlum = alum;
        this.url = url;
    }
}

export default TalentEntity;