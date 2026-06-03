export class MateriaModel {
  constructor(
    private idMateria: string,
    private nombre: string,
    private cuatrimestre: number
  ) {}

  // GETTERS
  public getIdMateria(): string {
    return this.idMateria;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getCuatrimestre(): number {
    return this.cuatrimestre;
  }

  // SETTERS
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public setCuatrimestre(cuatrimestre: number): void {
    this.cuatrimestre = cuatrimestre;
  }

  // VALIDATION ATTRIBUTES
  public static validate(body: any): string | null {
    if (!body.nombre || body.nombre.trim() === '') {
      return 'El nombre es obligatorio';
    }
    if (
      body.cuatrimestre === undefined ||
      typeof body.cuatrimestre !== 'number'
    ) {
      return 'El cuatrimestre es obligatorio y debe ser un número';
    }
    return null;
  }

  public getAllAttributes(): object {
    return {
      idMateria: this.idMateria,
      nombre: this.nombre,
      cuatrimestre: this.cuatrimestre,
    };
  }
}
