import { PATHTERMINAL, NAMETERMINAL } from "../../constants/terminal";
import type { HistoryInterface } from "../../interface/history";

interface HistoryTerminalProps {
    history: HistoryInterface[];
    onFinishOutput: (state: boolean) => void;
}

export default function HistoryTerminal(props: HistoryTerminalProps) {

    return (
        <section className="w-full h-fit">
            {props.history && props.history.map((item: HistoryInterface, index: number) => {
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
                                <p className="text-white pl-2">{item.content}</p>
                            </div>
                        }
                    </section>
                )
            })}
        </section>
    )
}