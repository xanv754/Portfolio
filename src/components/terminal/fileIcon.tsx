interface FileIconProps {
    filename: string;
}

function getExtension(filename: string): string {
    const parts = filename.split(".");
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

export default function FileIcon({ filename }: FileIconProps) {
    const extension = getExtension(filename);

    switch (extension) {
        case "txt":
        default:
            return (
                <svg
                    className="inline-block w-4 h-4 text-green shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
                    <path d="M15 2v5h5" />
                    <line x1="8" y1="9" x2="10" y2="9" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="16" y2="17" />
                </svg>
            );
    }
}
