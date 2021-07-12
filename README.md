


> El directorio no es necesario declararlo si se usa el de defecto, es el "./data/", este se puede reemplazar por uno personalizado pero debera ser un directorio absoluto

# Crear Store

## Creo Coleccion en troncal original
```js
    let r = dbCreateCollection ("Metronica")
```

## Especifico Troncal de Store y su Coleccion

```js
    let r = dbCreateCollection ("Metronica", "./data/")
```

Usando la consulta anterior obtenemos 
: ./data/Metronica

# Inserto datos en DB

```js
    let r = dbInsert({
                nombre: "Agustin",
                edad: 28
            }, "usuarios")

    console.log(r)
```

# Obtener Indices

Respondera un Array con objetos segun corresponda, puede ser el indice del Store que estra llamado segun lo nombre como el indice de colecciones

### Obtener Index de una coleccion

```js
    let r = dbGetIndex("usuarios", "/data2/")

    // or

    let r = dbGetIndex("usuarios")
```

### Obtener Colecciones de un Store especifico

```js
    let r = dbGetIndex(null, "/data2/")

// Sin especificar directorio, se obtiene las Colecciones de /data

    let r = dbGetIndex()
```

# Obtener Datos de un Indice

Debe especificar el Indice que quiere obtener, Coleccion y Store. El Store, si no se indica, se tomara el predeterminado

```js
    let r = dbGetData("53a9697fc3350a083f5f4daeb6da1cf9", "usuarios", "./data/")
    // or
    let r = dbGetData("53a9697fc3350a083f5f4daeb6da1cf9", "usuarios")
```
