const { newUser, loginUser, revalidateToken, getUser, getInfo} = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')


const { Router } = require('express')
const { check } = require('express-validator')
const {ValidateJwt} = require("../middlewares/validate-jwt");

const router = Router()


router.post('/new', [
    check('name', 'Name is required').not().isEmpty().isLength({min: 10}),
    check('email', 'El email es requerido').not().isEmpty().isEmail(),
    check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({min:6}),
    validateFields
], newUser)

router.post('/login', [
    check('email', 'El email es obligatorio').not().isEmpty().isEmail(),
    check( 'password', 'La contraseña es requerida').isLength({min:6}),
    validateFields
], loginUser )

router.get('/renew', ValidateJwt, revalidateToken)

router.get('/get-user/:id', ValidateJwt, getUser )

router.get('/get-info', getInfo)

module.exports = router
