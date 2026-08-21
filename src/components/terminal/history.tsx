import { PATHTERMINAL, NAMETERMINAL, COMMAND_TYPING_SPEED_MS } from "../../constants/terminal";
import type { HistoryInterface } from "../../interface/history";
import { useEffect, useState } from "react";

interface HistoryTerminalProps {
    history: HistoryInterface[];
    onFinishOutput: (state: boolean) => void;
}

export default function HistoryTerminal(props: HistoryTerminalProps) {

    const lastIndex = props.history.length - 1;
    const lastItem = props.history[lastIndex];
    const isTypingLast = !!lastItem?.animate;

    const [typedLength, setTypedLength] = useState(0);

    useEffect(() => {
        if (!lastItem || !lastItem.animate || typeof lastItem.content !== "string") return;
        const fullText = lastItem.content;

        props.onFinishOutput(false);
        setTypedLength(0);

        let charsShown = 0;
        const interval = setInterval(() => {
            charsShown++;
            setTypedLength(charsShown);
            if (charsShown >= fullText.length) {
                clearInterval(interval);
                props.onFinishOutput(true);
            }
        }, COMMAND_TYPING_SPEED_MS);

        return () => clearInterval(interval);
    }, [props.history.length]);

    return (
        <section className="w-full h-fit">
            {props.history && props.history.map((item: HistoryInterface, index: number) => {
                const isTypingThisItem = index === lastIndex && isTypingLast;
                const content = isTypingThisItem && typeof item.content === "string"
                    ? item.content.slice(0, typedLength)
                    : item.content;
                return (
                    <section key={index}>
                        { item.isCommand ?
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row gap-2">
                                    <p className="text-purple-600">{PATHTERMINAL}</p>
                                    <p id="command" className="text-white">{typeof content === "string" ? content : ""}</p>
                                </div>
                                <p className="text-gray">{NAMETERMINAL}</p>
                            </div>
                        : Array.isArray(content) ?
                            <div className="w-full grid grid-cols-[repeat(2,max-content)] sm:grid-cols-[repeat(3,max-content)] md:grid-cols-[repeat(4,max-content)] gap-x-4 gap-y-0 pl-2">
                                {content.map((file, fileIndex) => (
                                    <p key={fileIndex} className="text-white truncate">{file}</p>
                                ))}
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
