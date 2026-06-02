import { readDB, writeDB } from '../utils/jsonDB-manager.util'
import { Request, Response } from 'express'
import { AlumnoModel } from '../models/alumno.model'


const getAlumnoAll = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB('alumnos')
    return res.status(200).json(alumnos)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'No se pudieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB('alumnos')
    const { legajo } = req.params
    const alumno = alumnos.find((a: AlumnoModel) => a.getLegajo() === parseInt(legajo as string))

    if (!alumno) {
      return res.status(404).json({ error: `No existe el alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(alumno)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: `No se pudo obtener el detalle del alumno con legajo ${req.params.legajo}` })
  }
}

const createAlumno = async (req: Request, res: Response) => {
  try {
    const error = AlumnoModel.validate(req.body)
    if (error) {
      return res.status(400).json({ error })
    }

    const alumnos = await readDB('alumnos')

    const existe = alumnos.find((a: AlumnoModel) => a.getLegajo() === req.body.legajo)
    if (existe) {
      return res.status(409).json({ error: `Ya existe un alumno con el legajo ${req.body.legajo}` })
    }

    const fecha = new Date().toISOString().split('T')[0]

    const nuevoAlumno = new AlumnoModel(
    req.body.nombre, 
    req.body.apellido, 
    req.body.email, 
    req.body.legajo
    )

    alumnos.push(nuevoAlumno.getAllAttributes());
    await writeDB('alumnos', alumnos);

    return res.status(201).json(nuevoAlumno)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'No se pudo crear el alumno' })
  }
}

const updateAlumno = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB('alumnos')
    const { legajo } = req.params
    const index = alumnos.findIndex((a: AlumnoModel) => a.getLegajo() === parseInt(legajo as string))

    if (index === -1) {
      return res.status(404).json({ error: `No existe el alumno con el legajo ${legajo}` })
    }

    const fecha = new Date().toISOString().split('T')[0]

    alumnos[index] = {
      ...alumnos[index],
      ...req.body,
      legajo: alumnos[index].legajo,
      modificacion: fecha
    }

    await writeDB('alumnos', alumnos)

    return res.status(200).json(alumnos[index])
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: `No se pudo actualizar el alumno con legajo ${req.params.legajo}` })
  }
}

const deleteAlumno = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB('alumnos')
    const { legajo } = req.params
    const index = alumnos.findIndex((a: AlumnoModel) => a.getLegajo() === parseInt(legajo as string))

    if (index === -1) {
      return res.status(404).json({ error: `No existe el alumno con el legajo ${legajo}` })
    }

    const eliminado = alumnos.splice(index, 1)[0]
    await writeDB('alumnos', alumnos)

    return res.status(200).json({ msg: `Alumno con legajo ${legajo} eliminado`, alumno: eliminado })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: `No se pudo eliminar el alumno con legajo ${req.params.legajo}` })
  }
}

export { getAlumnoAll, getAlumnoById, createAlumno, updateAlumno, deleteAlumno }
