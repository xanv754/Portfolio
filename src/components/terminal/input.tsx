import { PATHTERMINAL, NAMETERMINAL } from "../../constants/terminal";
import { useEffect } from "react";


interface InputTerminalProps {
    onSubmit: (value: string) => void;
}


export default function InputTerminal(props: InputTerminalProps) {

    const handlerEnterEvent = () => {
        const inputElement = document.getElementById('inputCommand') as HTMLInputElement;
        if (!inputElement) return;

        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (inputElement.value !== "") props.onSubmit(inputElement.value);
                inputElement.value = '';
            }
        })
    }

    const handlerContainerClick = () => {
        const containerElement = document.getElementById('input-container') as HTMLDivElement;
        if (!containerElement) return;

        containerElement.addEventListener('click', () => {
            const inputElement = document.getElementById('inputCommand') as HTMLInputElement;
            if (!inputElement) return;

            inputElement.focus();
        })
    }

    useEffect(() => {
        handlerContainerClick();
        handlerEnterEvent();
    }, []);

    return (
        <div id="input-container" className="w-full h-full flex flex-row justify-between">
            <div className="w-full flex flex-row gap-2">
                <p className="min-w-fit text-purple-600">{PATHTERMINAL}</p>
                <input id="inputCommand" type="text" className="w-full h-fit focus:outline-none text-white" />
            </div>
            <p className="min-w-fit text-gray">{NAMETERMINAL}</p>
        </div>
    )
}