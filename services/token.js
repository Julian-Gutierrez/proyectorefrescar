var jwt = require('jsonwebtoken');

module.exports ={
    encode : async(user) =>{
    const token = jwt.sign({
        _id : user.id,
        nombre : user.nombre,
        correo : user.correo,
        rol : user.rol
    },
    'UnaFraseSecreta',
    {
        expiresIn : 86400
    });
    return token;
    }
}