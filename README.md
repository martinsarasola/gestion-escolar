## Descripción General
Sistema de gestión escolar que permite administrar alumnos y cursos. Facilita el seguimiento y control de estudiantes mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar alumnos) y la asignación de cursos.

## Tecnologías Utilizadas
- **React + Vite**: Framework principal para el desarrollo frontend
- **Material-UI**: Biblioteca de componentes UI para un diseño consistente y responsive
- **Redux Toolkit**: Manejo del estado global de la aplicación
- **React Router**: Navegación entre diferentes vistas
- **DataGrid**: Componente para visualización de datos tabulares

## Funcionalidades Principales

### Gestión de Alumnos
- Crear nuevos alumnos con validación de campos
- Actualizar información de alumnos existentes
- Eliminar alumnos
- Buscar alumnos por curso o ID

### Gestión de Cursos
- Visualización de cursos disponibles
- Asignación de cursos a alumnos
- Filtrado de alumnos por curso

### Formulario de Alumnos
Campos disponibles:
- Nombre
- Apellido
- Email
- Cursos seleccionados

## Arquitectura

# Estructura del Proyecto

```plaintext
src/
├── components/                 
│   ├── layout/                # Componentes de estructura
│   └── table/                 # Componentes de tablas
│       └── StudentsTable.jsx  # Tabla de estudiantes
│
├── pages/                     
│   ├── alumnos/              # Gestión de alumnos
│   ├── crear-alumno/         # Creación de alumnos
│   ├── cursos/               # Gestión de cursos
│   └── home/                 # Página principal
│
├── services/                  
│   └── services.js           # Servicios API
│
├── store/                     
│   └── store.js              # Configuración Redux
│
├── theme/                     
│   └── theme.js              # Tema personalizado
│
└── App.jsx                    # Componente principal
```

## Operaciones Disponibles
- GET /estudiantes - Obtener todos los estudiantes
- GET /estudiantes/curso/:curso - Filtrar por curso  
- GET /estudiantes/:id - Obtener estudiante por ID
- POST /estudiantes - Crear estudiante
- PUT /estudiantes/:id - Actualizar estudiante 
- DELETE /estudiantes/:id - Eliminar estudiante

## Estructura de Datos
Los estudiantes contienen información como nombre, apellido, email y cursos asignados.

## Configuración
Requiere las siguientes variables de entorno:

```hash
VITE_API_URL=<url_api>
```

## Cómo Ejecutar el Proyecto
### 1. Clonar el repositorio:
```bash
git clone https://github.com/martinsarasola/gestion-escolar.git
```

### 2. Instalar dependencias:
```bash
cd gestion-escolar
npm install
```

### 3. Configurar variables de entorno: Crear archivo .env en la raíz del proyecto:
```bash
VITE_API_URL=url_api
```

### 4. Ejecutar en modo desarrollo:
```bash
npm run dev
```

### 5. Acceder a la aplicación: La aplicación estará disponible en http://localhost:5173

## Capturas de Pantalla
### Pantalla de inicio
![image](https://github.com/user-attachments/assets/0dd7be55-0165-4b06-942b-1a6f45cd01ae)

### Vista de lista de alumnos
![image](https://github.com/user-attachments/assets/6be0a149-0aa5-46a6-82fa-fb8c65e52077)

### Vista de creación de alumnos
![image](https://github.com/user-attachments/assets/3eb79ae2-2f95-4664-9375-9d3d1ccec1f7)

### Vista de cursos disponibles
![image](https://github.com/user-attachments/assets/daac1cbe-892c-4210-8b73-0535cf2b6878)



## Contacto
José Martín Sarasola - martin.sarasola01@hotmail.com Link del Proyecto: https://github.com/martinsarasola/gestion-escolar
