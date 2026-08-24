export interface Project {
    id: string;
    name: string;
    description: string;
    repo: string;
    image?: string;
}

export const PROJECTS: Project[] = [
    {
        id: "convx",
        name: "ConvX",
        description: "Transformador de archivos de gran tamaño .csv a .xlsx.",
        repo: "https://github.com/xanv754/ConvX",
        image: "/projects/convx.png",
    },
    {
        id: "sharkdown",
        name: "Sharkdown",
        description: "Convertidor sencillo de manuscritos a markdown utilizando IA.",
        repo: "https://github.com/xanv754/sharkdown",
        image: "/projects/sharkdown.png",
    },
    {
        id: "exceltablekit",
        name: "ExcelTableKit",
        description: "Personalizador rápido de estilos para tablas sencillas en Excel.",
        repo: "https://github.com/xanv754/ExcelTableKit",
        image: "/projects/exceltablekit.png",
    },
    {
        id: "interface-change-monitor",
        name: "Interface Change Monitor",
        description: "Herramienta de monitoreo y seguimiento de cambios en las interfaces de red utilizando el protocolo SNMP.",
        repo: "https://github.com/xanv754/Interface-Change-Monitor",
        image: "/projects/icm.png",
    },
];
