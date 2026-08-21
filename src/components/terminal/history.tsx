import { PATHTERMINAL, NAMETERMINAL, TYPING_SPEED_MS } from "../../constants/terminal";
import type { HistoryInterface } from "../../interface/history";
import { useEffect, useState } from "react";

interface HistoryTerminalProps {
    history: HistoryInterface[];
    onFinishOutput: (state: boolean) => void;
}

export default function HistoryTerminal(props: HistoryTerminalProps) {

    const lastIndex = props.history.length - 1;
    const lastItem = props.history[lastIndex];
    const isTypingOutput = !!lastItem && !lastItem.isCommand;

    const [typedLength, setTypedLength] = useState(0);

    useEffect(() => {
        if (!lastItem) return;

        if (lastItem.isCommand) {
            props.onFinishOutput(false);
            return;
        }

        props.onFinishOutput(false);
        setTypedLength(0);

        let charsShown = 0;
        const interval = setInterval(() => {
            charsShown++;
            setTypedLength(charsShown);
            if (charsShown >= lastItem.content.length) {
                clearInterval(interval);
                props.onFinishOutput(true);
            }
        }, TYPING_SPEED_MS);

        return () => clearInterval(interval);
    }, [props.history.length]);

    return (
        <section className="w-full h-fit">
            {props.history && props.history.map((item: HistoryInterface, index: number) => {
                const isTypingThisItem = index === lastIndex && isTypingOutput;
                const content = isTypingThisItem ? item.content.slice(0, typedLength) : item.content;
                return (
                    <section key={index}>
                        { item.isCommand ?
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-2">
                                    <p className="text-purple-600">{PATHTERMINAL}</p>
                                    <p id="command" className="text-white">{item.content}</p>
                                </div>
                                <p className="text-gray">{NAMETERMINAL}</p>
                            </div>
                        :
                            <div className="w-full flex flex-wrap">
                                <p className="text-white pl-2">{content}</p>
                            </div>
                        }
                    </section>
                )
            })}
        </section>
    )
}
