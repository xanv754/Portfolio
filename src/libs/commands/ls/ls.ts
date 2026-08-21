import { FILES } from "../../../constants/terminal";
import type { LsInterface } from "./command";

export class LsCommand implements LsInterface {
    getListFiles(): string[] {
        return Object.values(FILES);
    }
}