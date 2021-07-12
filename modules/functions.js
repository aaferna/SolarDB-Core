exports.crypto = (cant = 16) => { 
   return require('crypto').randomBytes(cant).toString('hex')
};

exports.getDate = () => {
    const hoy = new Date();
    const today = hoy.toISOString().slice(0, 10);
    const time = hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds();
}
