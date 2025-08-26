import type { CommandInterface } from "../interface";
import { LBaseCommand } from "./l";
import { LsCommand } from "./ls";

export interface LInterface {
    getListFiles(): string;
}

export class LCommand implements CommandInterface {
    private output: LInterface;

    constructor(command: string) {
        if (command === "l") 
            this.output = new LBaseCommand();
        else if (command === "ls")
            this.output = new LsCommand();
        else 
            throw new Error(`${command}: Command not found`);
    }

    public getOutput(): string {
        return this.output.getListFiles();
    }

}