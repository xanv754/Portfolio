import { PATHTERMINAL, NAMETERMINAL, COMMANDS, FILES } from "../../constants/terminal";
import { useRef } from "react";
import type { KeyboardEvent } from "react";


interface InputTerminalProps {
    onSubmit: (value: string) => void;
}

interface CompletionState {
    prefixTokens: string[];
    suggestions: string[];
    index: number;
    lastValue: string;
}

const FILE_NAMES = Object.values(FILES);

function getPrefixTokens(value: string): string[] {
    const endsWithSpace = /\s$/.test(value);
    const tokens = value.trim().split(/\s+/).filter(Boolean);
    const hasPartialToken = tokens.length > 0 && !endsWithSpace;
    return hasPartialToken ? tokens.slice(0, -1) : tokens;
}

function getSuggestions(value: string): string[] {
    const endsWithSpace = /\s$/.test(value);
    const tokens = value.trim().split(/\s+/).filter(Boolean);

    if (tokens.length === 0 || (tokens.length === 1 && !endsWithSpace)) {
        const partial = tokens[0] ?? "";
        return COMMANDS.filter((command) => command.startsWith(partial));
    }

    if (tokens[0] === "cat") {
        if (tokens.length === 1 && endsWithSpace) return FILE_NAMES;
        if (tokens.length === 2 && !endsWithSpace) {
            return FILE_NAMES.filter((file) => file.startsWith(tokens[1]));
        }
    }

    return [];
}

export default function InputTerminal(props: InputTerminalProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const completionRef = useRef<CompletionState | null>(null);

    const applySuggestion = (prefixTokens: string[], suggestion: string): string => {
        const inputElement = inputRef.current;
        if (!inputElement) return "";

        const newValue = [...prefixTokens, suggestion].join(" ") + " ";
        inputElement.value = newValue;
        inputElement.setSelectionRange(newValue.length, newValue.length);
        return newValue;
    }

    const handleTab = () => {
        const inputElement = inputRef.current;
        if (!inputElement) return;

        const active = completionRef.current;
        if (active && active.suggestions.length > 1 && inputElement.value === active.lastValue) {
            active.index = (active.index + 1) % active.suggestions.length;
            active.lastValue = applySuggestion(active.prefixTokens, active.suggestions[active.index]);
            return;
        }

        const suggestions = getSuggestions(inputElement.value);
        if (suggestions.length === 0) {
            completionRef.current = null;
            return;
        }

        const prefixTokens = getPrefixTokens(inputElement.value);
        const lastValue = applySuggestion(prefixTokens, suggestions[0]);
        completionRef.current = { prefixTokens, suggestions, index: 0, lastValue };
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            handleTab();
            return;
        }

        completionRef.current = null;
        if (event.key !== 'Enter') return;

        const inputElement = inputRef.current;
        if (!inputElement) return;

        if (inputElement.value !== "") props.onSubmit(inputElement.value);
        inputElement.value = '';
        completionRef.current = null;
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