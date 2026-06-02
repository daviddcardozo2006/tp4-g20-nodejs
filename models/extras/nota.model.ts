
export class NotaModel {
    constructor(
        private id: number,
        private legajo: number,
        private idMateria: string,
        private nota: number,
        private fecha: string = new Date().toISOString().split('T')[0],
    ) {}

    // GETTERS
    public getId(): number {
        return this.id
    }

    public getLegajo(): number {
        return this.legajo
    }

    public getIdMateria(): string {
        return this.idMateria
    }

    public getNota(): number {
        return this.nota
    }

    public getFecha(): string {
        return this.fecha
    }

    // SETTERS
    public setNota(nota: number): void {
        this.nota = nota
    }

    // VALIDATION ATTRIBUTES
    public static validate(body: any): string | null {
        if (body.legajo === undefined || typeof body.legajo !== 'number') {
            return 'El legajo es obligatorio y debe ser un número'
        }
        if (!body.idMateria || typeof body.idMateria !== 'string' || body.idMateria.trim() === '') {
            return 'El idMateria es obligatorio y debe ser una cadena de texto no vacía'
        }
        if (body.nota === undefined || typeof body.nota !== 'number') {
            return 'La nota es obligatoria y debe ser un número'
        }
        if (body.nota < 0 || body.nota > 100) {
            return 'La nota debe estar entre 0 y 100'
        }
        return null
    }

    public getAllAttributes(): object {
        return {
            id: this.id,
            legajo: this.legajo,
            idMateria: this.idMateria,
            nota: this.nota,
            fecha: this.fecha
        }
    }
}