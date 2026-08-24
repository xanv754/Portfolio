import { ENV_VARIABLES } from "../../../constants/terminal";
import type { EchoInterface } from "./command";

const WRAPPING_QUOTES_REGEX = /^(["'])([\s\S]*)\1$/;

export class EchoCommand implements EchoInterface {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    getText(): string {
        const match = this.text.match(WRAPPING_QUOTES_REGEX);
        const content = match ? match[2] : this.text;
        return this.expandVariables(content);
    }

    private expandVariables(text: string): string {
        return Object.entries(ENV_VARIABLES).reduce(
            (result, [variable, value]) => result.split(variable).join(value),
            text
        );
    }
}
