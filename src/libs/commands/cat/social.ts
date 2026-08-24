import type { CatInterface } from "./command";

export class CatSocialNetworks implements CatInterface {
    readFile(): string {
        return `
        Github: https://github.com/xanv754
        Linkedin: https://www.linkedin.com/in/angyee-mar%C3%ADn-vera-85a78740a/
        `;
    }
}
