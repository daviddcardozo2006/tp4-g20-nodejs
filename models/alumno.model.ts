import { PersonaModel } from './persona.model'

export class AlumnoModel extends PersonaModel {
  constructor(
    nombre: string,
    apellido: string,
    email: string,
    private legajo: number,
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
  public setModificacion(fecha: string): void {
    this.modificacion = fecha
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

    // Validacion Alumno
    if (!body.legajo || typeof body.legajo !== 'number') {
      return 'El legajo es obligatorio y debe ser un número';
    }
    if (body.isActive !== undefined && typeof body.isActive !== 'boolean') {
      return 'isActive debe ser un booleano';
    }

    return null;
  }

  public override getAllAttributes(): object {
    return {
      legajo: this.legajo,
      ...super.getAllAttributes(),
      fechaAlta: this.fechaAlta,
      modificacion: this.modificacion,
      isActive: this.isActive
    }
  }
}
