import { PATHTERMINAL, NAMETERMINAL } from "../../constants/terminal";
import { useRef } from "react";
import type { KeyboardEvent } from "react";


interface InputTerminalProps {
    onSubmit: (value: string) => void;
}


export default function InputTerminal(props: InputTerminalProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        const inputElement = inputRef.current;
        if (!inputElement) return;

        if (inputElement.value !== "") props.onSubmit(inputElement.value);
        inputElement.value = '';
    }

    const handleContainerClick = () => {
        inputRef.current?.focus();
    }

    return (
        <div id="input-container" className="w-full h-full flex flex-row justify-between" onClick={handleContainerClick}>
            <div className="w-full flex flex-row gap-2">
                <p className="min-w-fit text-purple-600">{PATHTERMINAL}</p>
                <input ref={inputRef} type="text" className="w-full h-fit focus:outline-none text-white" onKeyDown={handleKeyDown} />
            </div>
            <p className="min-w-fit text-gray">{NAMETERMINAL}</p>
        </div>
    )
}