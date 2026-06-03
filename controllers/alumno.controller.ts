import { readDB, writeDB } from '../utils/jsonDB-manager.util';
import { Request, Response } from 'express';
import { AlumnoModel } from '../models/alumno.model';

const getAlumnoAll = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB('alumnos');
    return res.status(200).json(alumnos);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'No se pudieron obtener los datos de los alumnos' });
  }
};

const getAlumnoById = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB('alumnos');

    const legajoNumerico = parseInt(req.params.legajo as string, 10);
    if (isNaN(legajoNumerico)) {
      return res
        .status(400)
        .json({ error: 'El legajo debe ser un número válido' });
    }

    const { legajo } = req.params;
    const alumno = alumnos.find((a: any) => a.legajo === legajoNumerico);

    if (!alumno) {
      return res
        .status(404)
        .json({ error: `No existe el alumno con el legajo ${legajoNumerico}` });
    }

    return res.status(200).json(alumno);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: `No se pudo obtener el detalle del alumno con legajo ${req.params.legajo}`,
    });
  }
};

const createAlumno = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB('alumnos');

    let nuevo_legajo = 0;

    if (alumnos) {
      const legajos = alumnos.map((a: any) => a.legajo);
      const maxLegajo = Math.max(...legajos);
      nuevo_legajo = maxLegajo + 1;
    }

    const { nombre, apellido, email, isActive } = req.body;
    const nuevoAlumno = new AlumnoModel(
      nombre,
      apellido,
      email,
      nuevo_legajo,
      isActive
    );

    alumnos.push(nuevoAlumno.getAllAttributes());

    await writeDB('alumnos', alumnos);

    return res.status(201).json(nuevoAlumno);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'No se pudo crear el alumno' });
  }
};

const updateAlumno = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB('alumnos');

    const legajoNumerico = parseInt(req.params.legajo as string, 10);
    if (isNaN(legajoNumerico)) {
      return res
        .status(400)
        .json({ error: 'El legajo debe ser un número válido' });
    }

    const index = alumnos.findIndex((a: any) => a.legajo === legajoNumerico);

    if (index === -1) {
      return res
        .status(404)
        .json({ error: `No existe el alumno con el legajo ${legajoNumerico}` });
    }

    const fecha = new Date().toISOString().split('T')[0];
    const { nombre, apellido, email, isActive } = req.body;
    alumnos[index] = {
      // Datos viejos
      ...alumnos[index],

      // Si pusieron datos nuevos, los actualizamos, sino dejamos los viejos
      nombre: nombre !== undefined ? nombre : alumnos[index].nombre,
      apellido: apellido !== undefined ? apellido : alumnos[index].apellido,
      email: email !== undefined ? email : alumnos[index].email,
      isActive: isActive !== undefined ? isActive : alumnos[index].isActive,

      // actualizamos la fecha de modificación
      modificacion: fecha,
    };

    await writeDB('alumnos', alumnos);

    return res.status(200).json(alumnos[index]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: `No se pudo actualizar el alumno con legajo ${req.params.legajo}`,
    });
  }
};

const deleteAlumno = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB('alumnos');

    const legajoNumerico = parseInt(req.params.legajo as string, 10);
    if (isNaN(legajoNumerico)) {
      return res
        .status(400)
        .json({ error: 'El legajo debe ser un número válido' });
    }

    const index = alumnos.findIndex((a: any) => a.legajo === legajoNumerico);

    if (index === -1) {
      return res
        .status(404)
        .json({ error: `No existe el alumno con el legajo ${legajoNumerico}` });
    }

    const eliminado = alumnos.splice(index, 1)[0]; // splice devuelve un array con los elementos eliminados, como solo eliminamos uno, agarramos el primero (y único) elemento del array con [0]
    await writeDB('alumnos', alumnos);

    return res.status(200).json({
      msg: `Alumno con legajo ${legajoNumerico} eliminado`,
      alumno: eliminado,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: `No se pudo eliminar el alumno con legajo ${req.params.legajo}`,
    });
  }
};

export {
  getAlumnoAll,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno,
};
