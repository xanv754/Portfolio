import type { LInterface } from "./command";

export class LBaseCommand implements LInterface {
    getListFiles(): string {
        return "tengo que hacer este comando jajaja";
    }
}