const fs = require('fs').promises;
const path = require('path');
const lockfile = require('proper-lockfile');

class DatabaseError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const logOperation = async (operation, details) => {
    const logFile = './data/audit.log';
    const logEntry = `${new Date().toISOString()} - ${operation}: ${JSON.stringify(details)}\n`;
    await fs.appendFile(logFile, logEntry, 'utf8');
};

const ensureDirectory = async (dirPath) => {
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (err) {
        throw new DatabaseError(`Error ensuring directory: ${err.message}`, 'DIR_ERROR');
    }
};

const incrementIndex = async (indexFile) => {
    let release;
    try {
        release = await lockfile.lock(indexFile);
        const currentIndex = parseInt(await fs.readFile(indexFile, 'utf8'), 10) || 0;
        const newIndex = currentIndex + 1;
        await fs.writeFile(indexFile, newIndex.toString(), 'utf8');
        return newIndex;
    } finally {
        if (release) release();
    }
};

const getIndex = async (collection, store = './data/') => {
    const collectionPath = path.join(store, collection);
    const indexFile = path.join(collectionPath, '.indx');

    try {
        const currentIndex = parseInt(await fs.readFile(indexFile, 'utf8'), 10);
        return currentIndex;
    } catch {
        return 0;
    }
};

const validateIndex = async (collection, store = './data/') => {
    const collectionPath = path.join(store, collection);
    const files = await fs.readdir(collectionPath);
    const maxId = files
        .filter(file => file.endsWith('.json'))
        .map(file => parseInt(file.replace('.json', ''), 10))
        .reduce((max, id) => Math.max(max, id), 0);

    const indexFile = path.join(collectionPath, '.indx');
    await fs.writeFile(indexFile, maxId.toString(), 'utf8');
    return maxId;
};

const validateJson = (data) => {
    if (typeof data !== 'object' || Array.isArray(data) || data === null) {
        throw new DatabaseError('Invalid data format: Only JSON objects are allowed', 'VALIDATION_ERROR');
    }
};

const transaction = async (operations) => {
    const logs = [];
    try {
        for (const op of operations) {
            logs.push(await op());
        }
        return logs;
    } catch (err) {
        for (const log of logs.reverse()) {
            // Implement rollback logic if needed
        }
        throw err;
    }
};

const dbCreateCollection = async (collection, store = './data/') => {
    const collectionPath = path.join(store, collection);

    await ensureDirectory(collectionPath);

    const indexFile = path.join(collectionPath, '.indx');
    try {
        await fs.access(indexFile);
    } catch {
        await fs.writeFile(indexFile, '0', 'utf8');
    }

    return collectionPath;
};

const dbInsert = async (dataInsert, collection, store = './data/') => {
    validateJson(dataInsert);

    const collectionPath = await dbCreateCollection(collection, store);
    const indexFile = path.join(collectionPath, '.indx');

    const id = await incrementIndex(indexFile);
    const filePath = path.join(collectionPath, `${id}.json`);

    await fs.writeFile(filePath, JSON.stringify(dataInsert), 'utf8');
    await logOperation('INSERT', { collection, id, filePath });

    return { id, filePath };
};

const dbUpdate = async (dataInsert, id, collection, store = './data/') => {
    validateJson(dataInsert);

    const filePath = path.join(store, collection, `${id}.json`);

    try {
        await fs.access(filePath);

        const currentData = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        const updatedData = Array.isArray(currentData) ? [...currentData, dataInsert] : [currentData, dataInsert];

        await fs.writeFile(filePath, JSON.stringify(updatedData), 'utf8');
        await logOperation('UPDATE', { collection, id, filePath });

        return { id, filePath };
    } catch (err) {
        throw new DatabaseError(`Error updating file: ${err.message}`, 'UPDATE_ERROR');
    }
};

const dbGetData = async (id, collection, store = './data/') => {
    const filePath = path.join(store, collection, `${id}.json`);

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        await logOperation('GET_DATA', { collection, id, filePath });
        return JSON.parse(data);
    } catch (err) {
        throw new DatabaseError(`Error reading data: ${err.message}`, 'READ_ERROR');
    }
};

const dbDeleteData = async (id, collection, store = './data/') => {
    const filePath = path.join(store, collection, `${id}.json`);

    try {
        await fs.unlink(filePath);
        await logOperation('DELETE', { collection, id, filePath });
        return { id, deleted: true };
    } catch (err) {
        throw new DatabaseError(`Error deleting data: ${err.message}`, 'DELETE_ERROR');
    }
};

const dbGetIndex = async (collection, store = './data/') => {
    const collectionPath = path.join(store, collection);

    try {
        const files = await fs.readdir(collectionPath);
        await logOperation('GET_INDEX', { collection });
        return files.filter(file => file !== '.indx').map(file => path.basename(file, '.json'));
    } catch (err) {
        throw new DatabaseError(`Error getting index: ${err.message}`, 'INDEX_ERROR');
    }
};

const dbGetLatestId = async (collection, store = './data/') => {
    const collectionPath = path.join(store, collection);
    const indexFile = path.join(collectionPath, '.indx');

    try {
        const id = await fs.readFile(indexFile, 'utf-8');
        await logOperation('GET_LATEST_ID', { collection, id });
        return parseInt(id, 10);
    } catch (err) {
        throw new DatabaseError(`Error getting latest ID: ${err.message}`, 'LATEST_ID_ERROR');
    }
};

module.exports = {
    dbCreateCollection,
    dbInsert,
    dbUpdate,
    dbGetData,
    dbDeleteData,
    dbGetIndex,
    dbGetLatestId,
    getIndex,
    validateIndex,
    transaction
};
