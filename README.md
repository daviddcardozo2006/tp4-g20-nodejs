# tp4-g20-node.js

API REST desarrollada con Node.js y Express para la gestión de alumnos, con arquitectura organizada por rutas, controladores y modelos

---

## 👥 Equipo de Trabajo

**Grupo N° 20**

**Integrantes:**
- Alejo Simos
- David Cardozo
- Naim Neman
- Severino Tomás
- Ramón Pastré
---

## ⚙️ Metodología de Trabajo (Git y GitHub)

Para la gestión de versiones y el trabajo colaborativo utilizamos un esquema basado en **Git Flow**:
* **`main`**: Contiene el código de producción estable y funcional.
* **`develop`**: Rama de integración donde se unen todas las nuevas funcionalidades antes de pasar a producción.
* **`feature/...`**: Cada integrante trabajó en ramas independientes (ej: `feature/login`, `feature/rutas-usuarios`) que luego se integraron a `develop` mediante Pull Requests.

---

## 📂 Estructura del Proyecto y División de Archivos

### Distribución de Carpetas y Archivos
El proyecto está estructurado de la siguiente manera:

```text
tp4-g20-nodejs/
├── app.js
├── package.json
├── Dockerfile
├── settings.json
├── controllers/
│   └── alumno.controller.js
├── core/
│   └── server.js
├── data/
│   ├── alumnos.json
│   └── extras/
│       ├── sys-materias.json
│       ├── sys-notas.json
│       └── sys-profesores.json
├── models/
│   ├── alumno.model.ts
│   ├── persona.model.ts
│   └── extras/
│       ├── clase.model.ts
│       ├── nota.model.ts
│       └── profesor.model.ts
├── persistence/
│   ├── a.txt
│   └── sys-databse-models/
│       ├── sys-fake-database.model.ts
│       └── sys-log.database.model.ts
└── routes/
	├── alumno.routes.js
	└── extras/
		├── materia.routes.js
		├── nota.routes.js
		└── profesor.routes.js
```

### Organización de responsabilidades
- **`app.js`**: inicializa la aplicación y pone en marcha el servidor.
- **`core/`**: concentra la configuración general del servidor Express.
- **`routes/`**: define los endpoints disponibles de la API.
- **`controllers/`**: contiene la lógica que resuelve cada petición.
- **`models/`**: representa las entidades del dominio y estructuras auxiliares.
- **`data/`**: almacena los archivos JSON utilizados como fuente de datos.
- **`persistence/`**: incluye archivos y modelos vinculados a la persistencia del sistema.

Esta distribución permite separar responsabilidades, mantener el proyecto ordenado y facilitar el trabajo colaborativo entre los integrantes del grupo.


---

## Ejemplos de Estructura de los Archivos JSON

Cada archivo JSON utilizado por el sistema contiene un unico array de objetos del mismo tipo, evitando mezclar distintas estructuras dentro de un mismo archivo.

### `alumnos.json`

```json
[
	{
		"legajo": 10001,
		"nombre": "Mora",
		"apellido": "Garcia",
		"email": "m.garcia@facultad.edu.ar",
		"fechaAlta": "2026-03-02",
		"modificacion": "2026-03-02",
		"isActive": true
	}
]
```

### `materias.json`

```json
[
	{
		"idMateria": "MAT101",
		"nombre": "Matematica I",
		"cuatrimestre": 1
	}
]
```

### `notas.json`

```json
[
	{
		"id": 1,
		"legajo": 10001,
		"idMateria": "MAT101",
		"nota": 9,
		"fecha": "03-04-24"
	}
]
```

### `profesores.json`

```json
[
	{
		"idProfesor": 1,
		"nombre": "Ana",
		"apellido": "Fernandez",
		"email": "a.fernandez@facultad.edu.ar",
		"materia": "MAT101",
		"isActive": true
	}
]
```

---
## Link Deploy en Render
https://tp4-g20-nodejs.onrender.com

---
