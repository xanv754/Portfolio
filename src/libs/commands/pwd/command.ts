import type { CommandInterface } from "../interface";
import { PwdCommand } from "./pwd";

export interface PwdInterface {
    getPath(): string;
}

export class PwdBaseCommand implements CommandInterface {
    private output: PwdInterface;

    constructor(command: string) {
        if (command === "pwd")
            this.output = new PwdCommand();
        else
            throw new Error(`${command}: Command not found`);
    }

    public getOutput(): string {
        return this.output.getPath();
    }

}
