import { readDB, writeDB } from '../utils/jsonDB-manager.util'
import { Request, Response } from 'express'
import { NotaModel } from '../models/extras/nota.model'

const getNotaAll = async (req: Request, res: Response) => {
    try {
        const notas = await readDB('notas')
        return res.status(200).json(notas)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'No se pudieron obtener los datos de las notas' })
    }
}

const getNotaById = async (req: Request, res: Response) => {
    try {
        const notas = await readDB('notas')
        const { id } = req.params
        const nota = notas.find((n: any) => n.id === id)

        if (!nota) {
            return res.status(404).json({ error: `No existe la nota con el ID ${id}` })
        }

        return res.status(200).json(nota)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: `No se pudo obtener el detalle de la nota con ID ${req.params.id}` })
    }
}

const createNota = async (req: Request, res: Response) => {
    try {

        const [notas, materias, alumnos] = await Promise.all([
            readDB('notas'),
            readDB('materias'),
            readDB('alumnos')
        ]);

        let nuevo_id = 0

        if(notas) {
            const ids = notas.map((a: any) => a.id)
            const maxId = Math.max(...ids) 
            nuevo_id = maxId + 1
        }

        const { legajo, idMateria, nota, fecha } = req.body;

        // Validar si la nota ya existe
        const notaExiste = notas.find((n) => n.id === id);
        if (notaExiste) {
            return res.status(400).json({ 
                success: false, 
                message: `Error: Ya existe una nota con el ID ${id}` 
            });
        }

        // Validar que exista la materia asociada a la nota
        const materiaExiste = materias.find((m) => m.idMateria === idMateria);
        if (!materiaExiste) {
            return res.status(400).json({ 
                success: false, 
                message: `Error: No existe una materia con el ID ${idMateria}` 
            });
        }

        // Validar que exista el alumno asociado a la nota
        const alumnoExiste = alumnos.find((a) => a.legajo === legajo);  
        if (!alumnoExiste) {
            return res.status(400).json({ 
                success: false, 
                message: `Error: No existe un alumno con el legajo ${legajo}` 
            });
        }

        // creamos la nueva nota y la guardamos
        const nuevaNota = new NotaModel(id, legajo, idMateria, nota, fecha);
        notas.push(nuevaNota.getAllAttributes());

        await writeDB('notas', notas);

        return res.status(201).json({ success: true, message: 'Nota creada correctamente', nota: nuevaNota });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'No se pudo crear la nota' })
    }
}

const updateNota = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { legajo, idMateria, nota, fecha } = req.body;

        const notas = await readDB('notas');
        const index = notas.findIndex((n: any) => n.id === id);

        // Validamos que la nota exista
        if (index === -1) {
            return res.status(404).json({ error: `No existe la nota con el ID ${id}` });
        }   

        
        // Validamos el nuevo alumno (SOLO si se esta actualizando el legajo)
        if (legajo !== undefined) {
            const alumnos = await readDB('alumnos');
            const alumnoExiste = alumnos.find((a: any) => a.legajo === legajo);  
            if (!alumnoExiste) {
                return res.status(400).json({ error: `No existe un alumno con el legajo ${legajo}` });
            }
        }

        // Validamos la nueva materia (SOLO si se esta actualizando el idMateria)
        if (idMateria !== undefined) {
            const materias = await readDB('materias');
            const materiaExiste = materias.find((m: any) => m.idMateria === idMateria);
            if (!materiaExiste) {
                return res.status(400).json({ error: `No existe una materia con el ID ${idMateria}` });
            }
        }

        // Actualizamos el objeto (Unimos el objeto viejo con los datos nuevos)
        notas[index] = {
            ...notas[index],
            legajo: legajo !== undefined ? legajo : notas[index].legajo,
            idMateria: idMateria !== undefined ? idMateria : notas[index].idMateria,
            nota: nota !== undefined ? nota : notas[index].nota,
            fecha: fecha !== undefined ? fecha : notas[index].fecha
        };

        await writeDB('notas', notas);

        return res.status(200).json({
            success: true,
            message: 'Nota actualizada correctamente',
            data: notas[index]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `No se pudo actualizar la nota con ID ${req.params.id}` });
    }
}

const deleteNota = async (req: Request, res: Response) => {
    try {
        const notas = await readDB('notas')
        const { id } = req.params
        const index = notas.findIndex((n: any) => n.id === id)

        if (index === -1) {
            return res.status(404).json({ error: `No existe la nota con el ID ${id}` })
        }

        const eliminado = notas.splice(index, 1)[0] // splice devuelve un array con los elementos eliminados, como solo eliminamos uno, agarramos el primero (y único) elemento del array con [0]
        await writeDB('notas', notas)
        return res.status(200).json({ msg: `Nota con ID ${id} eliminada`, nota: eliminado })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: `No se pudo eliminar la nota con ID ${req.params.id}` })
    }
}

export { getNotaAll, getNotaById, createNota, updateNota, deleteNota }