



<p align="center">
  <img width="500" src="https://github.com/gusgeek/SolarDB-Core/blob/main/logo.svg">
  <br>
  <br>
  SolarDB es el motor de una base de datos no relacional, pensada para aquellos proyectos que necesiten de una base de datos facil, practica y sin complicaciones de implementacion.
</p>



#


<p align="center">
  <br><br>
  <strong>
    Este proyecto se encuentra en fase experimental, puede sufrir cambios
  </strong>
  <br><br>
</p>

# Instalacion

Podra realizarlo mediante NPM con el siguiente comando

```
    npm i solardb-core
```
Luego de esto, es necesario invocar el mismo desde el proyecto con la siguiente linea

```js
    const solar = require("solardb-core")
```


- El directorio no es necesario declararlo si se usa el de defecto, es el "./data/", este se puede reemplazar por uno personalizado pero debera ser un directorio absoluto

# Crear Store

## Creo Coleccion en directorio principal
```js
    let r = solar.dbCreateCollection ("Metronica")
```

## Especifico directorio de Store y su Coleccion

```js
    let r = solar.dbCreateCollection ("Metronica", "./data/")
```

Usando la consulta anterior obtenemos 

`./data/Metronica`

# Inserto datos en DB

```js
    let r = solar.dbInsert({
        nombre: "Agustin",
        edad: 28
    }, "usuarios")

```

Usando la consulta anterior obtenemos 

```json
    {
        "id": "c6a7f55fbf97e0de9478c6f4fd7e6c2b",
        "directory": "./data/usuarios/c6a7f55fbf97e0de9478c6f4fd7e6c2b.json"
    }
```

# Obtener Indices

Respondera un Array con objetos segun corresponda, puede ser el indice del Store que estra llamado segun lo nombre como el indice de colecciones

## Obtener Index de una Coleccion

```js
    let r = solar.dbGetIndex("usuarios", "/data2/")

        // OR

    let r = solar.dbGetIndex("usuarios")
```

Usando la consulta anterior obtenemos

```js
    [ 'b313a8e691ac02753fcd9ae4136ef0cc' ]
```

## Obtener Colecciones de un Store especifico

```js
    let r = solar.dbGetIndex(null, "/data2/")

        // Sin especificar directorio, se obtiene las Colecciones de /data

    let r = solar.dbGetIndex()
```

Usando la consulta anterior obtenemos

```js
    [ 'usuarios' ]
```
# Obtener Datos de un Indice

 Mediante el metodo de dbGetData obtendremos un array de objetos pertenecientes a las versiones del Index. Podemos realizar filtro de este mediante metodos JS como `.pop()` por ejemplo. Con pop nos quedaremos como resultado, el ultimo registro que exista en el index.


- Debe especificar el Indice que quiere obtener, Coleccion y Store. El Store, si no se indica, se tomara el predeterminado.
- Para poder parsear la respuesta es necesario usar JSON.parse() ya que los elementos se guardan como JSON.stringify()


```js
    let r = solar.dbGetData("53a9697fc3350a083f5f4daeb6da1cf9", "usuarios", "./data/")
        // or
    let r = solar.dbGetData("53a9697fc3350a083f5f4daeb6da1cf9", "usuarios")
```

Usando la consulta anterior obtenemos

```js
    [
        { nombre: 'Agustin', edad: 28 },
        { nombre: 'Agustin', edad: 28, ciudad: 'San Martin' }
    ]
```


# Actualizar Datos de un Indice

 Indicamos el JSON, Index, Coleccion y Store. 
 De esta forma actualizamos el Index:

```js

    let r = solar.dbUpdate({
        nombre: "Agustin",
        edad: 28,
        ciudad: 'San Martin'
    }, "aaa32948fc057d78fc0da13ab03d647c", "Usuarios","./data2/")

```

Nos respondera 

```js
    {
        id: 'aaa32948fc057d78fc0da13ab03d647c',
        directory: './data2/Usuarios/aaa32948fc057d78fc0da13ab03d647c.json'
    }
```
### Tip
Al momento de Actualizar el Index, no se pisaran los datos, si no, que se guardaran como versiones.

# Eliminar Indice

 Indicamos el Index, Coleccion y Store. 
 De esta forma Eliminamos el Index:

```js

    let r = solar.dbDeleteData("aaa32948fc057d78fc0da13ab03d647c", "Usuarios","./data2/")

```

Nos respondera el valor 1 para la eliminacion correcta

# Manejador de Errores

En los casos que se mal indique un Index, Store o Coleccion nos encontraremos con el siguiente error

```js
    [ 
        { 
            code: 'ENOENT',
            msj: 'El directorio o archivo no existe' 
        } 
    ]
```

<p align="center">
  <br>
  <bR>
    <img src="https://img.shields.io/github/downloads/gusgeek/SolarDB-Core/total">  
    <img src="https://img.shields.io/github/v/release/gusgeek/SolarDB-Core">  
    <img src="https://img.shields.io/github/release-date/gusgeek/SolarDB-Core">  
    <img src="https://img.shields.io/github/languages/code-size/gusgeek/SolarDB-Core">
  <br><br>
  <strong>:pencil2: con :heart:</strong>
</p>
