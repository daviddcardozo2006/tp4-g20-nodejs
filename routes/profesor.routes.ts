import { Router } from 'express';
import {
  getProfesorAll,
  getProfesorById,
  createProfesor,
  updateProfesor,
  deleteProfesor,
} from '../controllers/profesor.controller';
import { validateProfesorMiddleware } from '../middlewares/validar-profesor.middleware';

const rutas = Router();

rutas.get('/', getProfesorAll);
rutas.get('/:legajo', getProfesorById);
rutas.post('/', validateProfesorMiddleware, createProfesor);
rutas.put('/:legajo', validateProfesorMiddleware, updateProfesor);
rutas.delete('/:legajo', validateProfesorMiddleware, deleteProfesor);

export default rutas;
