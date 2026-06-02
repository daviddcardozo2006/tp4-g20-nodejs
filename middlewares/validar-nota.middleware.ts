import { Request, Response, NextFunction } from 'express'
import { NotaModel } from "../models/extras/nota.model";

export const validateNotaMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error = NotaModel.validate(req.body);
  if (error) {
    console.log('Error al validar nota:', error);
    return res.status(400).json({ error: 'Error al validar nota: ' + error });
  }
  next();
};