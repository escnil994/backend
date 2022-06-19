const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require('bcryptjs')



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

    await userDB.save()

    return res.status(201).json({
        ok: true,
        name: userDB.name,
        email: userDB.email,
        password: userDB.password
    
    })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error talk to admin about it!'
        })
        
    }

    

}

const loginUser = (req, res) => {

   


    return res.json({
        ok: true,
        msg: 'Logi user'
    })
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