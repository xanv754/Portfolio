import type { CommandInterface } from "./commands/interface";
import { ErrorCommand } from "./commands/error/command";
import { CatBaseCommand } from "./commands/cat/command";
import { LsBaseCommand } from "./commands/ls/command";
import { PwdBaseCommand } from "./commands/pwd/command";
import { EchoBaseCommand } from "./commands/echo/command";

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
            let trimmedInput = this.input.trim();
            let tokens = trimmedInput.split(/\s+/);
            let command = tokens[0];
            let parameter = tokens[1];
            let remainder = trimmedInput.slice(command.length).trim();

            if (command === "cat" && parameter)
                this.output = new CatBaseCommand(parameter);
            else if (command === "ls")
                this.output = new LsBaseCommand(command);
            else if (command === "pwd")
                this.output = new PwdBaseCommand(command);
            else if (command === "echo")
                this.output = new EchoBaseCommand(remainder);
            else
                throw new Error(`${command}: Command not found`);

        } catch {
            this.output = new ErrorCommand();
        }
    }

}