import { Request, Response, NextFunction } from 'express';
import { ProfesorModel } from '../models/profesor.model';

export const validateProfesorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = ProfesorModel.validate(req.body);
  if (error) {
    console.log('Error al validar profesor:', error);
    return res
      .status(400)
      .json({ error: 'Error al validar profesor: ' + error });
  }
  next();
};
