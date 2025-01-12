



<p align="center">
  <img width="500" src="https://github.com/aaferna/SolarDB-Core/blob/main/logo.svg">
  <br>
</p>


##  Introducción
Este sistema permite gestionar colecciones y datos almacenados en archivos locales mediante Node.js. Es ideal para aplicaciones ligeras o prototipos que no requieren una base de datos completa.


## 1. Instalación

### **Requisitos Previos**
- Node.js instalado en tu sistema.
- Una carpeta base donde se almacenarán los datos (`./data/` por defecto).

### **Instalación de Dependencias**
Ejecuta el siguiente comando para instalar el paquete necesario:
```bash
npm install proper-lockfile
```



## 2. Funciones Disponibles**

### **2.1 Creación de Colección**
**Función:** `dbCreateCollection(collection, store)`
- **Descripción:** Crea una nueva colección (directorio) para almacenar datos.
- **Parámetros:**
  - `collection` (string): Nombre de la colección.
  - `store` (string): Ruta base para almacenar los datos (opcional, por defecto `./data/`).
- **Ejemplo:**
  ```javascript
  await dbCreateCollection('usuarios');
  ```



### **2.2 Inserción de Datos**
**Función:** `dbInsert(dataInsert, collection, store)`
- **Descripción:** Inserta un nuevo dato en una colección.
- **Parámetros:**
  - `dataInsert` (object): Objeto JSON que se desea insertar.
  - `collection` (string): Nombre de la colección.
  - `store` (string): Ruta base para almacenar los datos (opcional).
- **Ejemplo:**
  ```javascript
  const nuevoUsuario = { nombre: 'Juan', edad: 30 };
  const resultado = await dbInsert(nuevoUsuario, 'usuarios');
  console.log(resultado);
  // { id: 1, filePath: './data/usuarios/1.json' }
  ```



### **2.3 Actualización de Datos**
**Función:** `dbUpdate(dataInsert, id, collection, store)`
- **Descripción:** Actualiza un dato existente añadiendo nueva información al archivo.
- **Parámetros:**
  - `dataInsert` (object): Objeto JSON con los nuevos datos.
  - `id` (number): ID del dato a actualizar.
  - `collection` (string): Nombre de la colección.
  - `store` (string): Ruta base para almacenar los datos (opcional).
- **Ejemplo:**
  ```javascript
  const actualizacion = { ciudad: 'Santiago' };
  const resultado = await dbUpdate(actualizacion, 1, 'usuarios');
  console.log(resultado);
  // { id: 1, filePath: './data/usuarios/1.json' }
  ```



### **2.4 Obtención de Datos**
**Función:** `dbGetData(id, collection, store)`
- **Descripción:** Obtiene los datos de un archivo específico.
- **Parámetros:**
  - `id` (number): ID del dato.
  - `collection` (string): Nombre de la colección.
  - `store` (string): Ruta base para almacenar los datos (opcional).
- **Ejemplo:**
  ```javascript
  const usuario = await dbGetData(1, 'usuarios');
  console.log(usuario);
  // { nombre: 'Juan', edad: 30, ciudad: 'Santiago' }
  ```



### **2.5 Eliminación de Datos**
**Función:** `dbDeleteData(id, collection, store)`
- **Descripción:** Elimina un archivo de datos específico.
- **Parámetros:**
  - `id` (number): ID del dato a eliminar.
  - `collection` (string): Nombre de la colección.
  - `store` (string): Ruta base para almacenar los datos (opcional).
- **Ejemplo:**
  ```javascript
  const resultado = await dbDeleteData(1, 'usuarios');
  console.log(resultado);
  // { id: 1, deleted: true }
  ```



### **2.6 Validación del Índice**
**Función:** `validateIndex(collection, store)`
- **Descripción:** Sincroniza el índice de la colección con los datos existentes.
- **Parámetros:**
  - `collection` (string): Nombre de la colección.
  - `store` (string): Ruta base para almacenar los datos (opcional).
- **Ejemplo:**
  ```javascript
  await validateIndex('usuarios');
  ```



### **2.7 Transacciones**
**Función:** `transaction(operations)`
- **Descripción:** Ejecuta un conjunto de operaciones como una transacción. Si ocurre un error, permite revertir los cambios.
- **Parámetros:**
  - `operations` (array): Arreglo de funciones asíncronas a ejecutar.
- **Ejemplo:**
  ```javascript
  await transaction([
      () => dbInsert({ nombre: 'Pedro' }, 'usuarios'),
      () => dbUpdate({ ciudad: 'Lima' }, 1, 'usuarios')
  ]);
  ```


## **3. Logs de Auditoría**
Todas las operaciones generan entradas en el archivo `audit.log`, ubicado en `./data/`. Cada entrada incluye:
- Fecha y hora.
- Tipo de operación.
- Detalles de la operación (colección, ID, etc.).


## **4. Notas Finales**
- Asegúrate de que la carpeta base (`./data/`) sea accesible por la aplicación.
- Los datos se almacenan en formato JSON y cada archivo representa un registro.
- Usa `validateIndex` periódicamente para evitar inconsistencias en el índice.

**¿Dudas o problemas? ¡Estoy para ayudarte!** 🚀




<p align="center">
  <br>
  <bR>
    <img src="https://img.shields.io/aaferna/downloads/aaferna/SolarDB-Core/total">  
    <img src="https://img.shields.io/aaferna/v/release/aaferna/SolarDB-Core">  
    <img src="https://img.shields.io/aaferna/release-date/aaferna/SolarDB-Core">  
    <img src="https://img.shields.io/aaferna/languages/code-size/aaferna/SolarDB-Core">
    <img src="https://img.shields.io/npm/dt/solardb-core?label=NPM%20Downloads">
  <br><br>
  <strong>:pencil2: con :heart:</strong>
</p>
