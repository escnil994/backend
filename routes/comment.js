
const { Router } = require('express')
const { check } = require('express-validator')


const { getComments, getComment, createComment, autorizeComment, deleteComment } = require('../controllers/comment')
const { validateFields } = require('../middlewares/validate-fields')


const router = Router()


router.get('/get-comments', getComments)
router.get('/get-comment/:id', getComment)
router.post('/create-new-comment/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('name', 'El nombre debe tener al menos 8 caracteres').isLength({min:8}),
    check('email', 'El email es obligatorio').isEmpty(),
    check('email', 'El email debe ser valido').isEmail(),
    check('comment', 'Debe ingresar un comentario con al menos 12 caracteres').isLength({min:12}).not().isEmpty(),
    validateFields
], createComment)
router.put('/autorize-comment/:id', autorizeComment)
router.delete('/delete-comment/:id', deleteComment)



module.exports = router