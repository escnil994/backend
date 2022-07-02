
const jwt = require('jsonwebtoken')

const generateJWT = (id, name) => {

    const payload = { id, name }

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {

            if (error) {
                console.log(error)
                reject(error)
            } else {
                //Everything is OK 
                resolve( token )
            }
        })



    })



}


module.exports = {
    generateJWT
}