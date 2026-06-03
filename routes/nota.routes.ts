import { Router } from 'express';
import {
  getNotaAll,
  getNotaById,
  createNota,
  updateNota,
  deleteNota,
} from '../controllers/nota.controller';
import { validateNotaMiddleware } from '../middlewares/validar-nota.middleware';

const rutas = Router();

rutas.get('/', getNotaAll);
rutas.get('/:id', validateNotaMiddleware, getNotaById);
rutas.post('/', validateNotaMiddleware, createNota);
rutas.put('/:id', validateNotaMiddleware, updateNota);
rutas.delete('/:id', validateNotaMiddleware, deleteNota);

export default rutas;
