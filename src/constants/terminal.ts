export const FILES = {
    greeting: "saludo.txt",
    aboutMe: "sobreMi.txt",
    skills: "experiencia.txt",
    socialNetworks: "redes.txt",
    help: "ayuda.txt",
}

export const COMMANDS = ["cat", "clear", "ls", "pwd", "echo"];

export const USERNAME = "xanv754";

export const SHELL_NAME = "zsh";

export const HOME_PATH = `/home/${USERNAME}`;

export const ENV_VARIABLES: Record<string, string> = {
    "$USER": USERNAME,
    "$SHELL": SHELL_NAME,
};

export const PATHTERMINAL = "~ »";

export const NAMETERMINAL = `${USERNAME}@my-space`;

export const COMMAND_TYPING_SPEED_MS = 80;

export const BOOT_START_DELAY_MS = 500;

export const BOOT_NEXT_LINE_PAUSE_MS = 600;