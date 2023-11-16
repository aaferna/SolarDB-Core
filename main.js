const fs = require('fs').promises;

const dbCreateCollection = async (collection, store = "./data/") => {
    const collectionPath = store + collection;

    try {
        await fs.mkdir(store);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }

    try {
        await fs.mkdir(collectionPath);
        await fs.writeFile(collectionPath + "/.indx", "0", 'utf8');
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }

    return collectionPath;
};

const dbInsert = async (dataInsert, collection, store = "./data/") => {
    const collectionPath = await dbCreateCollection(collection, store);
    const id = parseInt(await fs.readFile(collectionPath + "/.indx", 'utf-8')) + 1;
    const directory = `${collectionPath}/${id}.sol`;

    await fs.writeFile(collectionPath + "/.indx", id.toString(), 'utf8');

    try {
        await fs.writeFile(directory, JSON.stringify(dataInsert), 'utf8');
        return { id, directory };
    } catch (err) {
        return handleError(err);
    }
};

const dbUpdate = async (dataInsert, id, collection, store = "./data/") => {
    const directory = `${store}${collection}/${id}.sol`;

    try {
        await fs.access(directory, fs.F_OK);

        try {
            await fs.appendFile(directory, `\n${JSON.stringify(dataInsert)}`);
            return { id, directory };
        } catch (err) {
            return handleError(err);
        }
    } catch (err) {
        return handleError(err);
    }
};

const dbGetIndex = async (collection = null, store = "./data/") => {
    const directory = collection === null ? store : `${store}${collection}`;

    try {
        const response = await fs.readdir(directory);
        const arrC = response.filter(r => r !== '.indx').map(r => r.replace(".sol", ""));
        return arrC;
    } catch (err) {
        return handleError(err);
    }
};

const dbGetData = async (id, collection, store = "./data/") => {
    const directory = `${store}${collection}/${id}.sol`;

    try {
        const response = (await fs.readFile(directory, 'utf-8')).split("\n");
        const arrC = response.map(r => JSON.parse(r));
        return arrC;
    } catch (err) {
        return handleError(err);
    }
};

const dbGetDateModify = async (id, collection, store = "./data/") => {
    const directory = `${store}${collection}/${id}.sol`;
    const timestampFile = `${directory}/.timestamp`;

    try {
        const [data, timestamp] = await Promise.all([
            fs.readFile(directory, 'utf-8'),
            fs.readFile(timestampFile, 'utf-8').catch(() => null)
        ]);

        const statsObj = await fs.stat(directory);
        const currentTimestamp = statsObj.mtime.getTime().toString();

        if (timestamp !== currentTimestamp) {
            // Update the timestamp file if the data has been modified
            await fs.writeFile(timestampFile, currentTimestamp, 'utf8');
        }

        return statsObj.birthtime.toUTCString().replace(',', "").split(' ');
    } catch (err) {
        return handleError(err);
    }
};

const dbGetLatestFile = async (collection, store = "./data/") => {
    const directory = `${store}${collection}/`;

    try {
        const id = await fs.readFile(directory + "/.indx", 'utf-8');
        return id;
    } catch (err) {
        return handleError(err);
    }
};

const dbDeleteData = async (id, collection, store = "./data/") => {
    const directory = `${store}${collection}/${id}.sol`;

    try {
        await fs.unlink(directory);
        return 1;
    } catch (err) {
        return handleError(err);
    }
};

const dbDeleteInsert = async (matrixID, id, collection, store = "./data/") => {
    const directory = `${store}${collection}/${id}.sol`;

    try {
        const response = (await fs.readFile(directory, 'utf-8')).split("\n");
        let finsert = true;
        let data;

        if (response[0] !== '') {
            fs.truncateSync(directory, 0);

            for (let i = 0; i < response.length; i++) {
                if (i !== matrixID) {
                    if (finsert) {
                        data = JSON.stringify(JSON.parse(response[i]));
                        finsert = false;
                    } else {
                        data = "\n" + JSON.stringify(JSON.parse(response[i]));
                    }

                    await fs.appendFile(directory, data);
                }
            }

            return {
                id,
                matrixID,
                deleted: true,
                data: JSON.parse((await fs.readFile(directory, 'utf-8')).split("\n"))
            };
        } else {
            return {
                id,
                matrixID,
                deleted: false
            };
        }
    } catch (err) {
        return handleError(err);
    }
};

const dbFlushInsert = async (data, id, collection, store = "./data/") => {
    const directory = `${store}${collection}/${id}.sol`;

    try {
        const response = (await fs.readFile(directory, 'utf-8')).split("\n");

        if (response[0] !== '') {
            fs.truncateSync(directory, 0);
            await fs.appendFile(directory, JSON.stringify(data));

            return {
                id,
                data: JSON.parse((await fs.readFile(directory, 'utf-8')).split("\n"))
            };
        }
    } catch (err) {
        return handleError(err);
    }
};

const handleError = (err) => {
    if (err.code === 'ENOENT') {
        return [{ code: err.code, msj: "El directorio o archivo no existe" }];
    } else {
        return [{ code: err, msj: "ERRO EXEPTION" }];
    }
};

module.exports = {
    dbCreateCollection,
    dbInsert,
    dbUpdate,
    dbGetIndex,
    dbGetData,
    dbGetDateModify,
    dbGetLatestFile,
    dbDeleteData,
    dbDeleteInsert,
    dbFlushInsert
};
