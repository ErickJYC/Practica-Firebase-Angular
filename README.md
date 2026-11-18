# Práctica CRUD de Productos — Angular y Firebase

## Descripción

Aplicación web desarrollada con Angular y Firebase para administrar un inventario de productos mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

Este proyecto corresponde a la práctica individual de la asignatura Programación de Plataformas Web de la Universidad Politécnica Salesiana.

## Tecnologías utilizadas

- Angular 22
- TypeScript
- HTML y CSS
- Firebase Authentication
- Cloud Firestore
- Firebase JavaScript SDK
- Git y GitHub
- Vercel para el despliegue

## Funcionalidades

### Crear productos (CREATE)

Permite registrar nuevos productos mediante un formulario con los campos nombre, precio, stock y categoría.

### Consultar productos (READ)

Recupera los documentos de la colección `productos` de Cloud Firestore y los presenta en una tabla HTML.

### Actualizar productos (UPDATE)

Permite seleccionar un producto, modificar sus datos y guardar los cambios en Firestore.

### Eliminar productos (DELETE)

Permite eliminar productos después de mostrar una ventana de confirmación.

### Autenticación

La aplicación utiliza Firebase Authentication con Google para iniciar y cerrar sesión.

Los visitantes pueden consultar el inventario sin iniciar sesión. Las operaciones de modificación requieren autenticación y están restringidas mediante las reglas de seguridad de Firestore.

## Modelo de datos

La colección de Cloud Firestore se llama `productos`.

| Campo | Tipo | Descripción |
|---|---|---|
| nombre | string | Nombre del producto |
| precio | number | Precio del producto |
| stock | number | Cantidad disponible |
| categoria | string | Categoría del producto |

Cada documento posee un identificador único generado por Firestore o asignado al crearlo desde la consola.

## Estructura principal

```text
src/
└── app/
    ├── components/
    │   └── productos/
    │       ├── productos.ts
    │       ├── productos.html
    │       └── productos.css
    ├── services/
    │   └── producto.ts
    ├── firebase.ts
    ├── app.ts
    └── app.html
```

## Configuración de Firebase

1. Crear un proyecto en Firebase Console.
2. Habilitar Cloud Firestore.
3. Crear la colección `productos`.
4. Habilitar el proveedor Google en Firebase Authentication.
5. Registrar una aplicación web en Firebase.
6. Configurar las credenciales públicas de la aplicación en `src/app/firebase.ts`.
7. Configurar las reglas de Firestore para permitir consultas y restringir las operaciones de escritura a los usuarios autorizados.
8. Agregar el dominio donde se despliegue la aplicación a los dominios autorizados de Firebase Authentication, según corresponda.

La aplicación utiliza el SDK de Firebase para JavaScript.

## Instalación y ejecución local

### Requisitos

- Node.js y npm
- Angular CLI
- Proyecto Firebase configurado

### Instalar dependencias

```bash
npm install
```

### Ejecutar la aplicación

```bash
npx ng serve -o
```

La aplicación estará disponible en:

http://localhost:4200

## Compilación

Para generar la versión de producción:

```bash
npm run build
```

Los archivos compilados se generan en el directorio de salida configurado por Angular.

## Validaciones

El formulario verifica que:

- El nombre no esté vacío.
- La categoría no esté vacía.
- El precio sea un número válido y no sea negativo.
- El stock sea un número entero y no sea negativo.

Además, la aplicación solicita confirmación antes de eliminar un producto.

## Pruebas realizadas

Se realizaron pruebas de creación, consulta, actualización y eliminación de productos.

También se comprobaron las validaciones del formulario, la cancelación de una eliminación y la persistencia de los datos de Firestore al recargar la aplicación.

## Despliegue

Plataforma: Vercel.

**URL de la aplicación:** Pendiente de despliegue.

## Repositorio

**GitHub:** Pendiente de publicación.

## Autor

Erick Josue Yunga Chimbo

Universidad Politécnica Salesiana

Asignatura: Programación de Plataformas Web
