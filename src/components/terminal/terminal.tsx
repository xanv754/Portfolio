import type { HistoryInterface } from "../../interface/history";
import { FILES } from "../../constants/terminal";
import HistoryTerminal from "./history";
import InputTerminal from "./input";
import { Command } from "../../libs/command";
import { useState, useEffect } from "react";


export default function Terminal() {

    const [availableInput, setAvailableInput] = useState<boolean>(false);
    const [history, setHistory] = useState<HistoryInterface[]>([]);

    const handlerHistory = (isCommand: boolean, content: string) => {
        setHistory((prevHistory) => [
            ...prevHistory, 
            { isCommand: isCommand, content: content }
        ]);
    }

    const handlerInputCommand = (input: string) => {
        if (input == "clear") {
            setHistory([]);
        } else {
            let command = new Command(input);
            handlerHistory(true, input);
            handlerHistory(false, command.getOutput());
        }
    }

    const handlerFinishOutput = (state: boolean) => {
        setAvailableInput(state);
    }

    const startTerminal = () => {
        let greetingCommand = `cat ${FILES.greeting}`;
        let cat = new Command(greetingCommand);
        let catOutput = cat.getOutput();
        let lsCommand = `ls`;
        let ls = new Command(lsCommand);
        let lsOutput = ls.getOutput();

        setTimeout(() => { handlerHistory(true, greetingCommand); }, 700);
        setTimeout(() => { handlerHistory(false, catOutput); }, 1400);
        setTimeout(() => { handlerHistory(true, lsCommand); }, 2100);
        setTimeout(() => { handlerHistory(false, lsOutput); }, 2800);
        setTimeout(() => { handlerFinishOutput(true); }, 3500);
    }

    useEffect(() => {
        startTerminal();
    }, [])

    return (
        <div id="block" className="w-full h-screen bg-black px-4 py-4">
            <section id="terminal" className="h-full border-2 border-green rounded-md px-2 py-2 overflow-y-auto flex flex-col">
                { history && <HistoryTerminal history={history} onFinishOutput={handlerFinishOutput} /> }
                { availableInput && <InputTerminal onSubmit={handlerInputCommand} /> }
            </section>
        </div>
    )
}