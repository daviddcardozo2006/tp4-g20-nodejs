import { Router } from 'express';
import {
  getAlumnoAll,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno,
} from '../controllers/alumno.controller';
import { validateAlumnoMiddleware } from '../middlewares/validar-alumno.middleware';
const rutas = Router();

rutas.get('/', getAlumnoAll);
rutas.get('/:legajo', getAlumnoById);
rutas.post('/', validateAlumnoMiddleware, createAlumno);
rutas.put('/:legajo', validateAlumnoMiddleware, updateAlumno);
rutas.delete('/:legajo', deleteAlumno);

export default rutas;
