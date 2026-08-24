import type { CatInterface } from "./command";

export class CatHelp implements CatInterface {
    readFile(): string {
        return `
        Para leer un archivo usa el comando \`cat\` seguido del nombre del archivo.
        Ejemplo: cat sobreMi.txt

        Usa \`ls\` para ver la lista de archivos disponibles.
        `;
    }
}
