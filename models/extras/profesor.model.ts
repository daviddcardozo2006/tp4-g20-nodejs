import { PersonaModel } from "../persona.model";

export class ProfesorModel extends PersonaModel {
    constructor(
        nombre: string,
        apellido: string,
        email: string,
        private legajo: number,
        private titulo: string,
        private materiasDictadas: string[] = [], // Por defecto arranca sin materias
        private departamento: string,
        private fechaAlta: string = new Date().toISOString().split('T')[0],
        private modificacion: string = new Date().toISOString().split('T')[0],
        private isActive: boolean = true
    ) {
        super(nombre, apellido, email)
    }

    // GETTERS
    public getLegajo(): number {
        return this.legajo
    }

    public getTitulo(): string {
        return this.titulo
    }

    public getMateriasDictadas(): string[] {
        return this.materiasDictadas
    }

    public getDepartamento(): string {
        return this.departamento
    }

    public getFechaAlta(): string {
        return this.fechaAlta
    }

    public getModificacion(): string {
        return this.modificacion
    }

    public getIsActive(): boolean {
        return this.isActive
    }

    // SETTERS
    public setTitulo(titulo: string): void {
        this.titulo = titulo
    }

    public setMateriasDictadas(materias: string[]): void {
        this.materiasDictadas = materias
    }

    public setDepartamento(departamento: string): void {
        this.departamento = departamento
    }

    public setIsActive(valor: boolean): void {
        this.isActive = valor
    }

    // VALIDATION ATTRIBUTES

    public static override validate(body: any): string | null {
        // Validacion Persona
        const errorPersona = PersonaModel.validate(body);
        if (errorPersona) {
            return errorPersona;
        }

        // Validacion Profesor
        if (!body.legajo || typeof body.legajo !== 'number') {
            return 'El legajo es obligatorio y debe ser un número';
        }
        if (!body.titulo || typeof body.titulo !== 'string' || body.titulo.trim() === '') {
            return 'El título es obligatorio';
        }
        if (!body.departamento || typeof body.departamento !== 'string' || body.departamento.trim() === '') {
            return 'El departamento es obligatorio';
        }
        if (body.materiasDictadas !== undefined) {

            // Validar que materiasDictadas sea un arreglo
            if (!Array.isArray(body.materiasDictadas)) {
                return 'materiasDictadas debe ser una lista (arreglo)';
            }

            // Validar que cada elemento de materiasDictadas sea un texto no vacío
            const sonTodosTextos = body.materiasDictadas.every((item: any) => typeof item === 'string' && item.trim() !== '');
            if (!sonTodosTextos) {
                return 'Todas las materias en la lista deben ser textos no vacíos';
            }
        }
        return null;
    }

    public override getAllAttributes(): object {
        return {
            legajo: this.legajo,
            ...super.getAllAttributes(),
            titulo: this.titulo,
            materiasDictadas: this.materiasDictadas,
            departamento: this.departamento,
            fechaAlta: this.fechaAlta,
            modificacion: this.modificacion,
            isActive: this.isActive
        }
    }
}
