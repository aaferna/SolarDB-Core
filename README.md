



<p align="center">
  <img width="500" src="https://github.com/gusgeek/SolarDB-Core/blob/main/logo.svg">
  <br>
  <br>
  SolarDB es el motor de una base de datos no relacional, pensada para aquellos proyectos que necesiten de una base de datos facil, practica y sin complicaciones de implementacion.
</p>



#


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
        "id": "1",
        "directory": "./data/usuarios/1.sol"
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
    [ '1' ]
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
    let r = solar.dbGetData("1", "usuarios", "./data/")
        // or
    let r = solar.dbGetData("1", "usuarios")
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
    }, "1", "Usuarios","./data2/")

```

Nos respondera 

```js
    {
        id: '1',
        directory: './data2/Usuarios/1.sol'
    }
```
### Tip
Al momento de Actualizar el Index, no se pisaran los datos, si no, que se guardaran como versiones.

# Obtener fecha de Modificacion

Con este metodo podremos obtener la fecha y hora en que se modifico por ultima vez el Index

Indicamos el Index, Coleccion y Store:

```js

    let r = solar.dbGetDateModify("1", "usuarios", "./data/")

```

Nos respondera lo siguiente:

```js
    [ 'Tue', '13', 'Jul', '2021', '21:30:08', 'GMT' ]
```


# Obtener ultimo Index creado / modificado

Con este metodo podremos obtener el ultimo archivo modificado o creado de la Coleccion

Indicamos la Coleccion y Store

```js

    let r = solar.dbGetLatestFile("usuarios", "./data/")

```

Nos respondera un String con el ID del Index

```js
    {
        index: '1',
        date: [ 'Tue', '13', 'Jul', '2021', '21:30:08', 'GMT' ]
    }
```



# Eliminar Indice

 Indicamos el Index, Coleccion y Store. 
 De esta forma Eliminamos el Index:

```js

    let r = solar.dbDeleteData("1", "Usuarios","./data2/")

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
