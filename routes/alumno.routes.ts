import { Router } from 'express'
import { getAlumnoAll, getAlumnoById, createAlumno, updateAlumno, deleteAlumno } from '../controllers/alumno.controller'

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.post('/', createAlumno)
rutas.put('/:legajo', updateAlumno)
rutas.delete('/:legajo', deleteAlumno)

export default rutas
