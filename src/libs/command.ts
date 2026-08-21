import type { CommandInterface } from "./commands/interface";
import { ErrorCommand } from "./commands/error/command";
import { CatBaseCommand } from "./commands/cat/command";
import { LsBaseCommand } from "./commands/ls/command";

export class Command {
    private output!: CommandInterface;
    private input: string;

    constructor(input: string) {
        this.input = input;
        this.execute();
    }

    public getOutput(): string | string[] {
        return this.output.getOutput();
    }

    private execute(): void {
        try {
            let command = this.input.split(" ")[0];
            let parameter = this.input.split(" ")[1];

            if (command === "cat" && parameter)
                this.output = new CatBaseCommand(parameter);
            else if (command.startsWith("ls"))
                this.output = new LsBaseCommand(command);
            else 
                throw new Error(`${command}: Command not found`);

        } catch (error) {
            console.error(error);
            this.output = new ErrorCommand();
        }
    }

}