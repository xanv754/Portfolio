import { HOME_PATH } from "../../../constants/terminal";
import type { PwdInterface } from "./command";

export class PwdCommand implements PwdInterface {
    getPath(): string {
        return HOME_PATH;
    }
}
