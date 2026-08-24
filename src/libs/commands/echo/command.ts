import type { CommandInterface } from "../interface";
import { EchoCommand } from "./echo";

export interface EchoInterface {
    getText(): string;
}

export class EchoBaseCommand implements CommandInterface {
    private output: EchoInterface;

    constructor(text: string) {
        this.output = new EchoCommand(text);
    }

    public getOutput(): string {
        return this.output.getText();
    }

}
