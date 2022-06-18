const { validationResult } = require("express-validator");



const newUser = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        })
    }




    console.log(req.body);
    return res.json({
        ok: true,
        msg: 'User created'
    })
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