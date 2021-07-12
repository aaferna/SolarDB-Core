const fs = require('fs');
const f = require('./modules/functions');

const dbCreateCollection = (collection, store = "./data/") => {

    if (!fs.existsSync(store)) {
        fs.mkdirSync(store)
    } 
    if (!fs.existsSync(store + collection)) {
        fs.mkdirSync(store + collection)
    } 

    return store + collection
}

const dbInsert = (dataInsert, collection, store = "./data/") => {

    dbCreateCollection (collection, store)
    let id = f.crypto()
    let directory = store+collection+"/"+id+".json";

    fs.access(directory, fs.F_OK, (err) => {

        if (err) {
            fs.writeFile(directory, JSON.stringify(dataInsert), 'utf8', function(err) {
                if(err) throw err;
            });
        } 

        // else {
        //     fs.appendFile(directory, dataInsert, function (err) {
        //         if (err) throw err;
        //     });
        // }

    })

    return {
        id: id,
        directory: directory
    }
    
}

const dbGetIndex = (collection = null, store = "./data/") => {

    let directory 
        if( collection === null) { directory = store; } 
        else { directory = store+collection; }

    let response = fs.readdirSync(directory);
    let arrC = []
        response.forEach(r =>{
                arrC.push(r.replace(".json", ""))            
        })
    return arrC
}

const dbGetData = (id, collection, store = "./data/") => {

    let directory = store+collection+"/"+id+".json";

    fs.readFile(directory, 'utf-8', (err, data) => {
        if(err) {
          console.log('error: ', err);
        } else {
          console.log(data);
        }
      });

}

let r = dbCreateCollection ("Metronica", "./data/")

console.log(r)