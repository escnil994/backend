const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require('bcryptjs');


const { generateJWT } = require("../utils/jwt");
const {isValidObjectId} = require("mongoose");



const newUser = async(req, res) => {

    const { name, email, password, role } = req.body


    try {

    const user = await User.findOne( { email } )

    if (user) {
        return res.status(500).json({
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
        msg: 'usuario creado exitosamente',
        user: userDB
    
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

    try{

        const dbUser = await User.findOne({ email });

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
            token,
            name: dbUser.name
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

const revalidateToken = async (req, res) => {

    const uid = req.id

    const token = await generateJWT(uid)

    const user = await User.findById(uid)

    if (!user){
        return res.status(404).json({
            ok: false,
            msg: 'User not found'
        })
    }

    return res.status(200).json({
        ok: true,
        msg: 'revalidate token is ok ',
        token,
        user
    })
}


const getUser = async (req, res) => {
    const { id } = req.params

    if (isValidObjectId(id)){
        const user = await User.findById(id)


        if (user){
            return res.status(200).json({
                ok: true,
                name: user.name
            })
        }else{
            return  res.status(404).json({
                ok: false,
                msg: 'User not found!'
            })
        }

    }else{
        return res.status(500).json({
            ok: false,
            msg: 'ID no valido'
        })
    }
}


module.exports = {
    newUser,
    loginUser,
    revalidateToken,
    getUser
}