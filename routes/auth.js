<<<<<<< HEAD
const { newUser, loginUser, revalidateToken, getUser, changePassword, resetPassword} = require('../controllers/auth')
=======
const { newUser, loginUser, revalidateToken, getUser, getInfo} = require('../controllers/auth')
>>>>>>> 7df00dbaa146fc1c4a9ebfe39a7e1a5a66c756f3
const { validateFields } = require('../middlewares/validate-fields')


const { Router, request } = require('express')
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

<<<<<<< HEAD
router.post('/change-password', ValidateJwt, [
    check( 'password', 'La contraseña es requerida').isLength({min:6}), 
    check('password1', 'La contraseña es requerida').isLength({min: 6}),
    validateFields
], changePassword )

router.put('/reset-password/:id', [
    check('password1', 'La contraseña es requerida').isLength({min: 6}),
    validateFields
], resetPassword )

module.exports = router
=======
router.get('/get-info', getInfo)

module.exports = router
>>>>>>> 7df00dbaa146fc1c4a9ebfe39a7e1a5a66c756f3
