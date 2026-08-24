import type { CatInterface } from "./command";

export class CatGreeting implements CatInterface {
    readFile(): string {
        return "Bienvenido/a a mi terminal. Me llamo Angyee — usa cat 'ayuda.txt' para aprender a leer los archivos disponibles.";
    }
}
