import { FILES } from "../../../constants/terminal";
import type { LsInterface } from "./command";

export class LsCommand implements LsInterface {
    getListFiles(): string {
        let filenames: string[] = Object.values(FILES);
        let output: string = "";
        filenames.map((filename: string) => {
            output += filename + "   ";
        })
        return output;
    }
}