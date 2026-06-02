import { PersonaModel } from './persona.model'

export class AlumnoModel extends PersonaModel {
  constructor(
    nombre: string,
    apellido: string,
    email: string,
    private legajo: number,
    private fechaAlta: string,
    private modificacion: string,
    private isActive: boolean
  ) {
    super(nombre, apellido, email)
  }

  public getLegajo(): number {
    return this.legajo
  }

  public getFechaAlta(): string {
    return this.fechaAlta
  }

  public getModificacion(): string {
    return this.modificacion
  }
  public setModificacion(fecha: string): void {
    this.modificacion = fecha
  }

  public getIsActive(): boolean {
    return this.isActive
  }
  public setIsActive(valor: boolean): void {
    this.isActive = valor
  }

  public static validate(body: any): string | null {
    if (!body.legajo || typeof body.legajo !== 'number') {
      return 'El legajo es obligatorio y debe ser un número'
    }
    if (!body.nombre || body.nombre.trim() === '') {
      return 'El nombre es obligatorio'
    }
    if (!body.apellido || body.apellido.trim() === '') {
      return 'El apellido es obligatorio'
    }
    if (!body.email || !body.email.includes('@')) {
      return 'El email es obligatorio y debe ser válido'
    }
    if (body.isActive !== undefined && typeof body.isActive !== 'boolean') {
      return 'isActive debe ser un booleano'
    }
    return null
  }

  public getAllAttributes(): object {
    return {
      legajo: this.legajo,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      fechaAlta: this.fechaAlta,
      modificacion: this.modificacion,
      isActive: this.isActive
    }
  }
}
