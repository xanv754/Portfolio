import type { CatInterface } from "./command";

export class CatEmpty implements CatInterface {
    private file: string;

    constructor(file: string) {
        this.file = file;
    }

    readFile(): string {
        return `cat: ${this.file}: No existe el archivo o el directorio`;
    }
}