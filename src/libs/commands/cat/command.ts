import type { CommandInterface } from "../interface";
import { CatGreeting } from "./greeting";
import { CatAboutMe } from "./about";
import { CatExperience } from "./experience";
import { CatSocialNetworks } from "./social";
import { CatHelp } from "./help";
import { CatEmpty } from "./empty";
import { FILES } from "../../../constants/terminal";


export interface CatInterface {
    readFile(): string;
}

export class CatBaseCommand implements CommandInterface {
    private output: CatInterface;

    constructor(file: string) {
        if (file === FILES.greeting) 
            this.output = new CatGreeting();
        else if (file === FILES.aboutMe)
            this.output = new CatAboutMe();
        else if (file === FILES.skills)
            this.output = new CatExperience();
        else if (file === FILES.socialNetworks)
            this.output = new CatSocialNetworks();
        else if (file === FILES.help)
            this.output = new CatHelp();
        else
            this.output = new CatEmpty(file);
    }

    public getOutput(): string {
        return this.output.readFile();
    }
}