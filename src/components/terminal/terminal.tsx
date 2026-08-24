import type { HistoryInterface } from "../../interface/history";
import { FILES, BOOT_START_DELAY_MS, BOOT_NEXT_LINE_PAUSE_MS } from "../../constants/terminal";
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
        <div id="block" className="flex-1 min-h-0 w-full bg-black px-2 py-2 sm:px-4 sm:py-4">
            <section id="terminal" className="h-full border-2 border-green rounded-md px-2 py-2 overflow-y-auto flex flex-col font-mono">
                { history && <HistoryTerminal history={history} onFinishOutput={handlerFinishOutput} /> }
                { availableInput && <InputTerminal onSubmit={handlerInputCommand} /> }
            </section>
        </div>
    )
}
