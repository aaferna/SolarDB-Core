const fs = require('fs');
const f = require('./modules/functions');

exports.dbCreateCollection = (collection, store = "./data/") => {

    if (!fs.existsSync(store)) {
        fs.mkdirSync(store)
    } 
    if (!fs.existsSync(store + collection)) {
        fs.mkdirSync(store + collection)
    } 

    return store + collection
}

exports.dbInsert = (dataInsert, collection, store = "./data/") => {

    this.dbCreateCollection (collection, store)
    let id = f.crypto()
    let directory = store+collection+"/"+id+".json";
    
        try {
            fs.writeFileSync(directory, JSON.stringify(dataInsert), 'utf8');
            return {
                id: id,
                directory: directory
            }
                
        } catch (err) {
            if (err.code === 'ENOENT') {
                return [ {
                    code: err.code,
                    msj: "El directorio o archivo no existe2",
                } ]
            } else {
            
                return [ {
                    code: err,
                    msj: "ERRO EXEPTION",
                } ]
            }
        }     
    

}

exports.dbUpdate = (dataInsert, id, collection, store = "./data/") => {

    let directory = store+collection+"/"+id+".json";

    try {
            fs.accessSync(directory, fs.F_OK)
            try {
                fs.appendFileSync(directory, "\n"+JSON.stringify(dataInsert));
                return {
                    id: id,
                    directory: directory
                }
            } catch (err) {
                if (err.code === 'ENOENT') {
                    return [ {
                        code: err.code,
                        msj: "El directorio o archivo no existe",
                    } ]
                } else {
                
                    return [ {
                        code: err,
                        msj: "ERRO EXEPTION",
                    } ]
                }
            }
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [ {
                code: err.code,
                msj: "El directorio o archivo no existe",
            } ]
        } else {
        
            return [ {
                code: err,
                msj: "ERRO EXEPTION",
            } ]
        }
    }
        
}

exports.dbGetIndex = (collection = null, store = "./data/") => {

    let directory 
        if( collection === null) { directory = store; } 
        else { directory = store+collection; }

        try {
            let response = fs.readdirSync(directory);
            let arrC = []
            response.forEach(r =>{
                    arrC.push(r.replace(".json", ""))            
            })
            return arrC
        } catch (err) {
            if (err.code === 'ENOENT') {
                return [ {
                    code: err.code,
                    msj: "El directorio o archivo no existe",
                } ]
            } else {
            
                return [ {
                    code: err,
                    msj: "ERRO EXEPTION",
                } ]
            }
        }

    
}

exports.dbGetData = (id, collection, store = "./data/") => {

    let directory = store+collection+"/"+id+".json";

    try {
        let response = fs.readFileSync(directory, 'utf-8').split("\n")
        let arrC = []
        response.forEach(r =>{
                arrC.push(JSON.parse(r))            
        })
        return arrC
    } catch (err) {
        if (err.code === 'ENOENT') {
            return [ {
                code: err.code,
                msj: "El directorio o archivo no existe",
            } ]
          } else {
            return [ {
                code: err,
                msj: "ERRO EXEPTION",
            } ]
          }
    }

}
exports.dbDeleteData = (id, collection, store = "./data/") => {

    let directory = store+collection+"/"+id+".json";

    try {

        fs.unlinkSync(directory);
        return 1

    } catch (err) {
        if (err.code === 'ENOENT') {
            return [ {
                code: err.code,
                msj: "El directorio o archivo no existe",
            } ]
          } else {
            return [ {
                code: err,
                msj: "ERRO EXEPTION",
            } ]
          }
    }

}

