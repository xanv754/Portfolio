import type { CatInterface } from "./command";

export class CatAboutMe implements CatInterface {
    readFile(): string {
        return `
        Soy ingeniera de software con experiencia en desarrollo backend y análisis de datos.
        Disfruto resolver problemas complejos, aprender nuevas tecnologías y mejorar continuamente
        la forma en que diseño y construyo sistemas.

        Soy venezolana, nacida en Caracas.
        `;
    }
}
