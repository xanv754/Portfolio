export interface ProjectDescription {
    es: string;
    en: string;
}

export interface Project {
    id: string;
    name: string;
    description: ProjectDescription;
    repo: string;
    image?: string;
}

export const PROJECTS: Project[] = [
    {
        id: "convx",
        name: "ConvX",
        description: {
            es: "Transformador de archivos de gran tamaño .csv a .xlsx.",
            en: "Large .csv to .xlsx file converter.",
        },
        repo: "https://github.com/xanv754/ConvX",
        image: "/projects/convx.png",
    },
    {
        id: "sharkdown",
        name: "Sharkdown",
        description: {
            es: "Convertidor sencillo de manuscritos a markdown utilizando IA.",
            en: "Simple AI-powered manuscript-to-markdown converter.",
        },
        repo: "https://github.com/xanv754/sharkdown",
        image: "/projects/sharkdown.png",
    },
    {
        id: "exceltablekit",
        name: "ExcelTableKit",
        description: {
            es: "Librería para Python enfocada en ayudar a personalizador rápido de estilos para tablas sencillas en Excel.",
            en: "Quick style customizer for simple Excel tables.",
        },
        repo: "https://github.com/xanv754/ExcelTableKit",
        image: "/projects/exceltablekit.png",
    },
    {
        id: "interface-change-monitor",
        name: "Interface Change Monitor",
        description: {
            es: "Herramienta de monitoreo y seguimiento de cambios en las interfaces de red utilizando el protocolo SNMP.",
            en: "Network interface change monitoring and tracking tool using the SNMP protocol.",
        },
        repo: "https://github.com/xanv754/Interface-Change-Monitor",
        image: "/projects/icm.png",
    },
    {
        id: "bcv-rate-tracker",
        name: "BCV Rate Tracker",
        description: {
            es: "Scraper programado que recopila las tasas de cambio oficiales del BCV (Banco Central de Venezuela) (USD, EUR, CNY, TRY, RUB) y persiste el historial de registros en PostgreSQL, con observabilidad a nivel de ejecución e inserciones idempotentes.",
            en: "Scheduled scraper that collects official BCV (Banco Central de Venezuela) exchange rates (USD, EUR, CNY, TRY, RUB) and persists historical records to PostgreSQL, with run-level observability and idempotent inserts.",
        },
        repo: "https://github.com/xanv754/bcv-rate-tracker",
        image: "/projects/bcv-rate-tracker.png",
    },
];
