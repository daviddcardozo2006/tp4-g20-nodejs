export class PersonaModel {
  constructor(
    protected nombre: string,
    protected apellido: string,
    protected email: string
  ) {}

  // nombre
  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  // apellido
  public getApellido(): string {
    return this.apellido;
  }
  public setApellido(apellido: string): void {
    this.apellido = apellido;
  }

  // nombre completo (nombre + apelido)
  public getNombreCompleto(): string {
    return `${this.nombre} ${this.apellido}`;
  }

  // email
  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }

  // VALIDATION ATTRIBUTES
  public static validate(body: any): string | null {
    // Verificamos que el body exista
    if (!body) {
      return 'No se enviaron datos en el cuerpo de la petición (body está vacío).';
    }

    if (!body.nombre || body.nombre.trim() === '') {
      return 'El nombre es obligatorio';
    }
    if (!body.apellido || body.apellido.trim() === '') {
      return 'El apellido es obligatorio';
    }
    if (!body.email || !body.email.includes('@')) {
      return 'El email es obligatorio y debe ser válido';
    }

    return null;
  }

  // devolver todos los atributos en un objeto literal/plano (es como un JSON)
  public getAllAttributes(): object {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
    };
  }
}
