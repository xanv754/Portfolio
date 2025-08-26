import type { CommandInterface } from "./commands/interface";
import { ErrorCommand } from "./commands/error/command";
import { CatCommand } from "./commands/cat/command";
import { LCommand } from "./commands/l/command";

export class Command {
    private output!: CommandInterface;
    private input: string;

    constructor(input: string) {
        this.input = input;
        this.execute();
    }

    public getOutput(): string {
        return this.output.getOutput();
    }

    private execute(): void {
        try {
            let command = this.input.split(" ")[0];
            let parameter = this.input.split(" ")[1];

            if (command === "cat" && parameter)
                this.output = new CatCommand(parameter);
            else if (command.startsWith("l"))
                this.output = new LCommand(command);
            else 
                throw new Error(`${command}: Command not found`);

        } catch (error) {
            console.error(error);
            this.output = new ErrorCommand();
        }
    }

}