import type { CommandInterface } from "../interface";
import { LsCommand } from "./ls";

export interface LsInterface {
    getListFiles(): string[];
}

export class LsBaseCommand implements CommandInterface {
    private output: LsInterface;

    constructor(command: string) {
        if (command === "ls")
            this.output = new LsCommand();
        else 
            throw new Error(`${command}: Command not found`);
    }

    public getOutput(): string[] {
        return this.output.getListFiles();
    }

}