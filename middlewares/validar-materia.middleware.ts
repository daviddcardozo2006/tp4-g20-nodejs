import { Request, Response, NextFunction } from 'express';
import { MateriaModel } from '../models/materia.model';

export const validateMateriaMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = MateriaModel.validate(req.body);
  if (error) {
    console.log('Error al validar materia:', error);
    return res
      .status(400)
      .json({ error: 'Error al validar materia: ' + error });
  }
  next();
};
