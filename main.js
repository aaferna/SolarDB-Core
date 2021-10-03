const fs = require('fs');
const f = require('./modules/functions');

exports.dbCreateCollection = (collection, store = "./data/") => {

    if (!fs.existsSync(store + collection)) {
        fs.mkdirSync(store + collection)
        fs.writeFileSync(store+collection+"/.indx", "0", 'utf8');
    } 
    
    return store + collection
}

exports.dbInsert = (dataInsert, collection, store = "./data/") => {

    this.dbCreateCollection (collection, store)
    let id = parseInt(fs.readFileSync(store+collection+"/.indx", 'utf-8')) + 1
    let directory = store+collection+"/"+id+".sol";
    fs.writeFileSync(store+collection+"/.indx", id.toString(), 'utf8');

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

    let directory = store+collection+"/"+id+".sol";

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
                if(r !== '.indx'){
                    arrC.push(r.replace(".sol", ""))            
                }
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

    let directory = store+collection+"/"+id+".sol";
    

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

exports.dbGetDateModify = (id, collection, store = "./data/") => {

    let directory = store+collection+"/"+id+".sol";

    try {
        statsObj = fs.statSync(directory)
        return statsObj.birthtime.toUTCString().replace(',', "").split(' ')
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

exports.dbGetLatestFile = (collection, store = "./data/") => {

    let directory = store+collection+"/";

    try {

        let id = fs.readFileSync(directory+"/.indx", 'utf-8')

        return id

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

    let directory = store+collection+"/"+id+".sol";

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

