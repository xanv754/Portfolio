import { FILES } from "../../../constants/terminal";
import type { LInterface } from "./command";

export class LsCommand implements LInterface {
    getListFiles(): string {
        let filenames: string[] = Object.values(FILES);
        let output: string = "";
        filenames.map((filename: string) => {
            output += filename + "   ";
        })
        return output;
    }
}