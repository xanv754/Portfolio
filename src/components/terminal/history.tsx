import { PATHTERMINAL, NAMETERMINAL, COMMAND_TYPING_SPEED_MS } from "../../constants/terminal";
import type { HistoryInterface } from "../../interface/history";
import { useEffect, useState } from "react";
import FileIcon from "./fileIcon";

interface HistoryTerminalProps {
    history: HistoryInterface[];
    onFinishOutput: (state: boolean) => void;
}

const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const IS_URL_REGEX = /^https?:\/\//;

function renderTextWithLinks(text: string, keyPrefix: string) {
    return text.split(URL_REGEX).map((part, index) =>
        IS_URL_REGEX.test(part)
            ? <a key={`${keyPrefix}-${index}`} href={part} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">{part}</a>
            : <span key={`${keyPrefix}-${index}`}>{part}</span>
    );
}

function renderLines(text: string, keyPrefix: string) {
    return text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line, lineIndex) => (
            <p key={`${keyPrefix}-${lineIndex}`} className="text-white pl-2">{renderTextWithLinks(line, `${keyPrefix}-${lineIndex}`)}</p>
        ));
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

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setTypedLength(fullText.length);
            props.onFinishOutput(true);
            return;
        }

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
                                    <p className="text-accent">{PATHTERMINAL}</p>
                                    <p className="text-white">{typeof content === "string" ? content : ""}</p>
                                </div>
                                <p className="text-gray">{NAMETERMINAL}</p>
                            </div>
                        : Array.isArray(content) ?
                            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(10rem,max-content))] gap-x-4 gap-y-0 pl-2">
                                {content.map((file, fileIndex) => (
                                    <p key={fileIndex} className="text-white flex items-center gap-1.5">
                                        <FileIcon filename={file} />
                                        {file}
                                    </p>
                                ))}
                            </div>
                        :
                            <div className="w-full flex flex-col">
                                {typeof content === "string" ? renderLines(content, `content-${index}`) : content}
                            </div>
                        }
                    </section>
                )
            })}
        </section>
    )
}
