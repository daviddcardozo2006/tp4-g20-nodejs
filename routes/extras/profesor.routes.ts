import { Router } from 'express';
import {
  getProfesorAll,
  getProfesorById,
  createProfesor,
  updateProfesor,
  deleteProfesor,
} from '../../controllers/profesor.controller';
import { validateProfesorMiddleware } from '../../middlewares/validar-profesor.middleware';

const rutas = Router();

rutas.get('/', getProfesorAll);
rutas.get('/:id', validateProfesorMiddleware, getProfesorById);
rutas.post('/', validateProfesorMiddleware, createProfesor);
rutas.put('/:id', validateProfesorMiddleware, updateProfesor);
rutas.delete('/:id', validateProfesorMiddleware, deleteProfesor);

export default rutas;
