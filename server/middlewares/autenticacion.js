const jwt = require('jsonwebtoken');


//==================
//VERIFICAR TOKEN
//==================

let verificaToken = (req, res, next) => {
    //nombre de headers
    let token = req.get('token'); //authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({

                ok: false,
                err: 'Token no valido'

            });
        }

        req.usuario = decoded.usuario;
        next(); //srive para que continue con la ejecucion del programa

    })


    console.log(token);




}

//==================
//VERIFICAR AdminRole
//==================


let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {

        return res.json({
            ok: false,
            err: {
                message: 'el usuario no es administrador'
            }
        });

    }






}

//==================
//Verifica Token para Imagen
//==================


let verificaTokenImg = (req, res, next) => {

    let token = req.query.token;



    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({

                ok: false,
                err: 'Token no valido'

            });
        }

        req.usuario = decoded.usuario;
        next(); //srive para que continue con la ejecucion del programa

    })


}


module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}