import { readDB, writeDB } from '../utils/jsonDB-manager.util'
import { Request, Response } from 'express'
import { MateriaModel } from '../models/extras/materia.model'

const getMateriaAll = async (req: Request, res: Response) => {
    try {
        const materias = await readDB('materias')
        return res.status(200).json(materias)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'No se pudieron obtener los datos de las materias' })
    }
}

const createMateria = async (req: Request, res: Response) => {
    try {

        const materias = await readDB('materias')
        const { idMateria, nombre, cuatrimestre } = req.body;

        // Nos fijamos que no exista
        const materiaExiste = materias.find((m: any) => m.idMateria === idMateria)
        if (materiaExiste) {
            // Si ya existe, cortamos todo y devolvemos un error 400 (Bad Request)
            return res.status(400).json({ 
                success: false, 
                message: `Error: Ya existe una materia con el ID ${idMateria}` 
            });
        }

        // Si no existe, creamos la nueva materia y la guardamos
        const nuevaMateria = new MateriaModel(idMateria, nombre, cuatrimestre);
        materias.push(nuevaMateria.getAllAttributes());

        await writeDB('materias', materias);
        
        return res.status(201).json({ success: true, message: 'Materia creada correctamente' });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'No se pudo crear la materia' })
    }
}