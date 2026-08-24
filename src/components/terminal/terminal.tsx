import type { HistoryInterface } from "../../interface/history";
import { FILES, NAMETERMINAL, BOOT_START_DELAY_MS, BOOT_NEXT_LINE_PAUSE_MS } from "../../constants/terminal";
import HistoryTerminal from "./history";
import InputTerminal from "./input";
import { Command } from "../../libs/command";
import { useState, useEffect, useRef } from "react";

interface BootStep {
    command: string;
    output: string | string[];
}

export default function Terminal() {

    const [availableInput, setAvailableInput] = useState<boolean>(false);
    const [history, setHistory] = useState<HistoryInterface[]>([]);

    const bootScript = useRef<BootStep[]>([]);
    const bootIndex = useRef(0);

    const handlerHistory = (isCommand: boolean, content: string | string[], animate: boolean = false) => {
        setHistory((prevHistory) => [
            ...prevHistory,
            { isCommand: isCommand, content: content, animate: animate }
        ]);
    }

    const handlerInputCommand = (input: string) => {
        if (input.trim() == "clear") {
            setHistory([]);
        } else {
            let command = new Command(input);
            handlerHistory(true, input);
            handlerHistory(false, command.getOutput());
        }
    }

    const runBootCommand = () => {
        const step = bootScript.current[bootIndex.current];
        if (!step) return;
        handlerHistory(true, step.command, true);
    }

    const handlerFinishOutput = (finishedTyping: boolean) => {
        if (!finishedTyping) {
            setAvailableInput(false);
            return;
        }

        const step = bootScript.current[bootIndex.current];
        if (step) handlerHistory(false, step.output);

        bootIndex.current++;
        if (bootIndex.current < bootScript.current.length) {
            setTimeout(runBootCommand, BOOT_NEXT_LINE_PAUSE_MS);
        } else {
            setAvailableInput(true);
        }
    }

    const startTerminal = () => {
        const greetingCommand = `cat ${FILES.greeting}`;
        const greetingOutput = new Command(greetingCommand).getOutput();
        const lsCommand = `ls`;
        const lsOutput = new Command(lsCommand).getOutput();

        bootScript.current = [
            { command: greetingCommand, output: greetingOutput },
            { command: lsCommand, output: lsOutput },
        ];

        setTimeout(runBootCommand, BOOT_START_DELAY_MS);
    }

    useEffect(() => {
        startTerminal();
    }, [])

    return (
        <div id="block" className="flex-1 min-h-0 w-full bg-black/85 px-2 py-2 sm:px-4 sm:py-4">
            <section id="terminal" className="h-full bg-black border-2 border-green rounded-md overflow-hidden flex flex-col font-mono terminal-glow">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-green/40 bg-green/5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-green/70" aria-hidden="true"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gray/70" aria-hidden="true"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40" aria-hidden="true"></span>
                    <span className="ml-2 text-gray text-xs truncate">{NAMETERMINAL}: ~</span>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto px-2 py-2 flex flex-col">
                    { history && <HistoryTerminal history={history} onFinishOutput={handlerFinishOutput} /> }
                    { availableInput && <InputTerminal onSubmit={handlerInputCommand} /> }
                </div>
            </section>
        </div>
    )
}
