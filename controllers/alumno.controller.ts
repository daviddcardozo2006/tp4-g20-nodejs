import fs from 'fs/promises'
import path from 'path'
import { Request, Response } from 'express'
import { AlumnoModel } from '../models/alumno.model'

const dataPath = path.join(__dirname, '../data/alumnos.json')

const readDB = async () => {
  const data = await fs.readFile(dataPath, 'utf8')
  return JSON.parse(data)
}

const writeDB = async (data: any) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8')
}

const getAlumnoAll = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB()
    return res.status(200).json(alumnos)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'No se pudieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB()
    const { legajo } = req.params
    const alumno = alumnos.find((a: AlumnoModel) => a.legajo === parseInt(legajo as string))

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

    const alumnos = await readDB()

    const existe = alumnos.find((a: AlumnoModel) => a.legajo === req.body.legajo)
    if (existe) {
      return res.status(409).json({ error: `Ya existe un alumno con el legajo ${req.body.legajo}` })
    }

    const fecha = new Date().toISOString().split('T')[0]

    const nuevoAlumno = {
      legajo: req.body.legajo,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      fechaAlta: fecha,
      modificacion: fecha,
      isActive: req.body.isActive ?? true
    }

    alumnos.push(nuevoAlumno)
    await writeDB(alumnos)

    return res.status(201).json(nuevoAlumno)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'No se pudo crear el alumno' })
  }
}

const updateAlumno = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB()
    const { legajo } = req.params
    const index = alumnos.findIndex((a: AlumnoModel) => a.legajo === parseInt(legajo as string))

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

    await writeDB(alumnos)

    return res.status(200).json(alumnos[index])
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: `No se pudo actualizar el alumno con legajo ${req.params.legajo}` })
  }
}

const deleteAlumno = async (req: Request, res: Response) => {
  try {
    const alumnos = await readDB()
    const { legajo } = req.params
    const index = alumnos.findIndex((a: AlumnoModel) => a.legajo === parseInt(legajo as string))

    if (index === -1) {
      return res.status(404).json({ error: `No existe el alumno con el legajo ${legajo}` })
    }

    const eliminado = alumnos.splice(index, 1)[0]
    await writeDB(alumnos)

    return res.status(200).json({ msg: `Alumno con legajo ${legajo} eliminado`, alumno: eliminado })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: `No se pudo eliminar el alumno con legajo ${req.params.legajo}` })
  }
}

export { getAlumnoAll, getAlumnoById, createAlumno, updateAlumno, deleteAlumno }
