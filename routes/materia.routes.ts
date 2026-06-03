import { Router } from 'express';
import {
  getMateriaAll,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria,
} from '../controllers/materia.controller';
import { validateMateriaMiddleware } from '../middlewares/validar-materia.middleware';

const rutas = Router();

rutas.get('/', getMateriaAll);
rutas.get('/:id', validateMateriaMiddleware, getMateriaById);
rutas.post('/', validateMateriaMiddleware, createMateria);
rutas.put('/:id', validateMateriaMiddleware, updateMateria);
rutas.delete('/:id', validateMateriaMiddleware, deleteMateria);

export default rutas;
