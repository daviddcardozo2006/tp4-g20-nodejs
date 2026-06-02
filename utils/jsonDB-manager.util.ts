import fs from 'fs/promises';
import path from 'path';

// Le pasamos el nombre del archivo (ej. 'materias', 'alumnos') para que sirva para todos
export const readDB = async (fileName: string) => {
  const dataPath = path.join(__dirname, `../data/${fileName}.json`);
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Si hay un error al leer el archivo, evitamos que se rompa devolviendo un array vacío
    return []; 
  }
};

export const writeDB = async (fileName: string, data: any) => {
  const dataPath = path.join(__dirname, `../data/${fileName}.json`);
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
};