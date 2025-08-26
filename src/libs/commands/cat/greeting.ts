import type { CatInterface } from "./command";

export class CatGreeting implements CatInterface {
    readFile(): string {
        return "Hola, extraño! Me llamo Angyee";
    }
}