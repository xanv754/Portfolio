import type { CommandInterface } from "../interface";

export class ErrorCommand implements CommandInterface {
    getOutput(): string {
        return "orden no encontrada";
    }
}