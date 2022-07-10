const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../utils/jwt");



const newUser = async(req, res) => {

    const { name, email, password } = req.body


    try {

    const user = await User.findOne( { email } )

    if (user) {
        return res.status(400).json({
            ok: false,
            msg: 'Email is already in use'
        })
    }

    const userDB = new User( req.body )

    const salt = bcrypt.genSaltSync()

    userDB.password = bcrypt.hashSync( password, salt )



    ///Generate JWT
    const token = await generateJWT(userDB.id, name)






    await userDB.save()

    return res.status(201).json({
        ok: true,
        msg: 'usuario creado exitosamente'
    
    })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error talk to admin about it!'
        })
        
    }

    

}

const loginUser = async (req, res) => {

    const { email, password } = req.body
    console.log(req.body)

    try{

        const dbUser = await User.findOne({ email });
        console.log(dbUser)

        if (!dbUser){
            return  res.status(400).json({
                ok: false,
                msg: 'Este usuario no existe'
            })
        }


        const validPassword = bcrypt.compareSync( password, dbUser.password )


        if (!validPassword){
            return  res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            })
        }


        const token = await generateJWT(dbUser.id, dbUser.name)

        return  res.status(200).json({
            ok: true,
            msg: 'Sesión iniciada correctamente',
            token
        })



    }
    catch (e) {
        console.log(e)
        return res.json({
            ok: false,
            msg: 'Error, talk to the admin'
        })

    }


   



}

const revalidateToken = (req, res) => {
    return res.json({
        ok: true,
        msg: 'revalidate token'
    })
}


module.exports = {
    newUser,
    loginUser,
    revalidateToken
}