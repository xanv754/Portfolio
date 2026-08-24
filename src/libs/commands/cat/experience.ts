import type { CatInterface } from "./command";

export class CatExperience implements CatInterface {
    readFile(): string {
        return `
        Cuento con sólida experiencia en Python, con un enfoque orientado a objetos,
        así como en desarrollo web (HTML, CSS, JavaScript).

        Me desempeñé como programadora en la Coordinación de Gestión Productor Red de Datos (CGPRD)
        de la Compañía Anónima Nacional de Teléfonos de Venezuela (CANTV), donde desarrollé sistemas
        de automatización de procesos y generación de reportes de tráfico para distintos equipos de red.

        Durante esta experiencia adquirí experiencia práctica con Docker, consultas a equipos de red
        mediante el protocolo SNMP, y manejo de bases de datos relacionales (PostgreSQL) y no
        relacionales (MongoDB).
        `;
    }
}