import { readDB, writeDB } from '../utils/jsonDB-manager.util';
import { Request, Response } from 'express';
import { ProfesorModel } from '../models/extras/profesor.model';

const getProfesorAll = async (req: Request, res: Response) => {
  try {
    const profesores = await readDB('profesores');
    return res.status(200).json(profesores);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener los datos de los profesores' });
  }
};

const getProfesorById = async (req: Request, res: Response) => {
  try {
    const profesores = await readDB('profesores');
    const { legajo } = req.params;
    const profesor = profesores.find((p: any) => p.legajo === legajo);

    if (!profesor) {
      return res
        .status(404)
        .json({ error: `No existe el profesor con el legajo ${legajo}` });
    }

    return res.status(200).json(profesor);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        error: `No se pudo obtener el detalle del profesor con legajo ${req.params.legajo}`,
      });
  }
};

const createProfesor = async (req: Request, res: Response) => {
  try {
    // Leemos ambas bases de datos en paralelo
    const [profesores, materias] = await Promise.all([
      readDB('profesores'),
      readDB('materias'),
    ]);

    let nuevo_legajo = 0;

    if (profesores) {
      const legajos = profesores.map((p: any) => p.legajo);
      const maxLegajo = Math.max(...legajos);
      nuevo_legajo = maxLegajo + 1;
    }

    const {
      nombre,
      apellido,
      email,
      titulo,
      materiasDictadas,
      departamento,
      isActive,
    } = req.body;
    // Validar que TODAS las materias dictadas existan
    if (materiasDictadas && materiasDictadas.length > 0) {
      // Filtramos los IDs que NO encontramos en la base de datos de materias
      const materiasInexistentes = materiasDictadas.filter(
        (idMateria: string) =>
          !materias.some((m: any) => m.idMateria === idMateria)
      );

      // Si el arreglo de inexistentes tiene elementos, cortamos la ejecución
      if (materiasInexistentes.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Error: Las siguientes materias no existen en el sistema: ${materiasInexistentes.join(', ')}`,
        });
      }
    }

    // Creamos el nuevo profesor y lo guardamos
    const nuevoProfesor = new ProfesorModel(
      nombre,
      apellido,
      email,
      nuevo_legajo,
      titulo,
      materiasDictadas,
      departamento,
      isActive
    );
    profesores.push(nuevoProfesor.getAllAttributes());
    await writeDB('profesores', profesores);

    return res.status(201).json({
      success: true,
      message: 'Profesor creado correctamente',
      data: nuevoProfesor.getAllAttributes(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error interno: No se pudo crear el profesor',
    });
  }
};

const updateProfesor = async (req: Request, res: Response) => {
  try {
    const { legajo } = req.params;
    const {
      nombre,
      apellido,
      email,
      titulo,
      materiasDictadas,
      departamento,
      isActive,
    } = req.body;

    const [profesores, materias] = await Promise.all([
      readDB('profesores'),
      readDB('materias'),
    ]);

    const index = profesores.findIndex((p: any) => p.legajo === legajo);

    // Validamos que el profesor exista
    if (index === -1) {
      return res
        .status(404)
        .json({ error: `No existe el profesor con el legajo ${legajo}` });
    }

    // Validar que TODAS las materias dictadas existan
    if (materiasDictadas && materiasDictadas.length > 0) {
      // Filtramos los IDs que NO encontramos en la base de datos de materias
      const materiasInexistentes = materiasDictadas.filter(
        (idMateria: string) =>
          !materias.some((m: any) => m.idMateria === idMateria)
      );

      // Si el arreglo de inexistentes tiene elementos, cortamos la ejecución
      if (materiasInexistentes.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Error: Las siguientes materias no existen en el sistema: ${materiasInexistentes.join(', ')}`,
        });
      }
    }

    // Actualizamos el objeto (Unimos el objeto viejo con los datos nuevos)
    profesores[index] = {
      ...profesores[index],

      nombre: nombre !== undefined ? nombre : profesores[index].nombre,
      apellido: apellido !== undefined ? apellido : profesores[index].apellido,
      email: email !== undefined ? email : profesores[index].email,
      titulo: titulo !== undefined ? titulo : profesores[index].titulo,
      materiasDictadas:
        materiasDictadas !== undefined
          ? materiasDictadas
          : profesores[index].materiasDictadas,
      departamento:
        departamento !== undefined
          ? departamento
          : profesores[index].departamento,
      isActive: isActive !== undefined ? isActive : profesores[index].isActive,

      modificacion: new Date().toISOString().split('T')[0],
    };

    await writeDB('profesores', profesores);

    return res.status(200).json({
      success: true,
      message: 'Profesor actualizado correctamente',
      data: profesores[index],
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        error: `No se pudo actualizar el profesor con legajo ${req.params.legajo}`,
      });
  }
};

const deleteProfesor = async (req: Request, res: Response) => {
  try {
    const profesores = await readDB('profesores');
    const { legajo } = req.params;
    const index = profesores.findIndex((p: any) => p.legajo === legajo);

    if (index === -1) {
      return res
        .status(404)
        .json({ error: `No existe el profesor con el legajo ${legajo}` });
    }

    const eliminado = profesores.splice(index, 1)[0]; // splice devuelve un array con los elementos eliminados, como solo eliminamos uno, agarramos el primero (y único) elemento del array con [0]
    await writeDB('profesores', profesores);
    return res
      .status(200)
      .json({
        msg: `Profesor con legajo ${legajo} eliminado`,
        profesor: eliminado,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        error: `No se pudo eliminar el profesor con legajo ${req.params.legajo}`,
      });
  }
};

export {
  getProfesorAll,
  getProfesorById,
  createProfesor,
  updateProfesor,
  deleteProfesor,
};
