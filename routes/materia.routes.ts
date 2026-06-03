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
rutas.get('/:idMateria', getMateriaById);
rutas.post('/', validateMateriaMiddleware, createMateria);
rutas.put('/:idMateria', validateMateriaMiddleware, updateMateria);
rutas.delete('/:idMateria', validateMateriaMiddleware, deleteMateria);

export default rutas;
