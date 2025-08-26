import type { CatInterface } from "./command";

export class CatExperience implements CatInterface {
    readFile(): string {
        return `
        Tengo sólidos conocimientos en Python, con un enfoque 100% orientado a objetos. 
        Gracias a mis conocimientos en Python y en desarrollo web (HTML, CSS, JavaScript), 
        me desempeñé como programadora en la Coordinación de Gestión Productor Red de Datos (CGPRD) 
        de la Compañía Anónima Nacional de Teléfonos de Venezuela (CANTV).

        En este rol, desarrollé sistemas para la automatización de procesos 
        y la generación de reportes de tráfico de distintos equipos de red. 
        Durante esta experiencia también adquirí habilidades en el uso de Docker, 
        en la ejecución de consultas a equipos de red mediante protocolos SNMP, 
        así como en el manejo de bases de datos relacionales (PostgreSQL) 
        y no relacionales (MongoDB).
        `;
    }
}