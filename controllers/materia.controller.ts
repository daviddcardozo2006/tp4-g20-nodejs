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

const getMateriaById = async (req: Request, res: Response) => {
    try {
        const materias = await readDB('materias')
        const { idMateria } = req.params
        const materia = materias.find((m: any) => m.id === idMateria)

        if (!materia) {
            return res.status(404).json({ error: `No existe la materia con el ID ${idMateria}` })
        }

        return res.status(200).json(materia)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: `No se pudo obtener el detalle de la materia con ID ${req.params.idMateria}` })
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

        return res.status(201).json({ success: true, message: 'Materia creada correctamente', materia: nuevaMateria });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'No se pudo crear la materia' })
    }
}

const updateMateria = async (req: Request, res: Response) => {
    try {
        const materias = await readDB('materias')
        const { idMateria } = req.params
        const index = materias.findIndex((m: any) => m.idMateria === idMateria) 

        if (index === -1) {
            return res.status(404).json({ error: `No existe la materia con el ID ${idMateria}` })
        }   

        const {nombre, cuatrimestre} = req.body;
        materias[index] = {
            ...materias[index],
            nombre: nombre !== undefined ? nombre : materias[index].nombre,
            cuatrimestre: cuatrimestre !== undefined ? cuatrimestre : materias[index].cuatrimestre
        }

        await writeDB('materias', materias)

        return res.status(200).json(materias[index])
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: `No se pudo actualizar la materia con ID ${req.params.idMateria}` })
    }
}

const deleteMateria = async (req: Request, res: Response) => {
    try {
        const materias = await readDB('materias')
        const { idMateria } = req.params
        const index = materias.findIndex((m: any) => m.idMateria === idMateria)

        if (index === -1) {
            return res.status(404).json({ error: `No existe la materia con el ID ${idMateria}` })
        }

        const eliminado = materias.splice(index, 1)[0] // splice devuelve un array con los elementos eliminados, como solo eliminamos uno, agarramos el primero (y único) elemento del array con [0]
        await writeDB('materias', materias)
        return res.status(200).json({ msg: `Materia con ID ${idMateria} eliminada`, materia: eliminado })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: `No se pudo eliminar la materia con ID ${req.params.idMateria}` })
    }
}

export { getMateriaAll, getMateriaById, createMateria, updateMateria, deleteMateria }