import { Request, Response, NextFunction } from 'express'
import { AlumnoModel } from "../models/alumno.model";

export const validateAlumnoMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error = AlumnoModel.validate(req.body);
  if (error) {
    console.log('Error al validar alumno:', error);
    return res.status(400).json({ error: 'Error al validar alumno: ' + error });
  }
  next();
};

