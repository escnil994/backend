const { newUser, loginUser, revalidateToken } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')


const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()


router.post('/new', [
    check('name', 'Name is required').not().isEmpty().isLength({min: 10}),
    check('email', 'El email es obligatorio').isEmail(),
    check( 'password', 'Password is required').isLength({min:6}),
    validateFields
], newUser)

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check( 'password', 'Password is required').isLength({min:6})
], loginUser )

router.get('/renew', revalidateToken)


module.exports = router