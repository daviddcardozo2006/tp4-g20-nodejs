import { Router } from 'express'
import { getMateriaAll, getMateriaById, createMateria, updateMateria, deleteMateria } from '../controllers/materia.controller'

const rutas = Router()

rutas.get('/', getMateriaAll)
rutas.get('/:id', getMateriaById)
rutas.post('/', createMateria)
rutas.put('/:id', updateMateria)
rutas.delete('/:id', deleteMateria)

export default rutas
