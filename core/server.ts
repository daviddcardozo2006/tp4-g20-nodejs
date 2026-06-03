import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import alumnoRoutes from '../routes/alumno.routes';
import materiaRoutes from '../routes/materia.routes';
import notaRoutes from '../routes/nota.routes';
import profesorRoutes from '../routes/profesor.routes';

class Server {
  public app: Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.middleware();
    this.rutas();
  }

  private middleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  rutas() {
    this.app.use('/alumnos', alumnoRoutes);
    this.app.use('/materias', materiaRoutes);
    this.app.use('/notas', notaRoutes);
    this.app.use('/profesores', profesorRoutes);

    // manejo de errores
    this.app.use((req: Request, res: Response, _next: NextFunction) => {
      return res.status(400).json({ msg: 'Error.' });
    });
    this.app.use(
      (err: any, req: Request, res: Response, _next: NextFunction) => {
        console.error(err.stack);
        return res.status(404).json({ msg: 'Error. Pagina no encontrada' });
      }
    );
    this.app.use(
      (err: any, req: Request, res: Response, _next: NextFunction) => {
        console.error(err.stack);
        return res.status(500).json({ msg: 'Internal Server Error' });
      }
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`La API esta escuchando en el puerto: ${this.port}`);
    });
  }
}

export default Server;
