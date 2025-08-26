import type { CatInterface } from "./command";

export class CatAboutMe implements CatInterface {
    readFile(): string {
        return `
        Soy una programadora especializada en el desarrollo de software y el análisis de data. 
        Me caracterizo por ser creativa, apasionada por lo que hago y con un profundo interés en aprender 
        tanto nuevas tecnologías, como en mejorar continuamente la forma de diseñar y construir sistemas.
        Soy venezolana, nacida en Caracas. Actualmente tengo 24 años y formo parte de la Iglesia Adventista del Séptimo Día.
        `;
    }
}