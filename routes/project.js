
const { Router } = require('express')
const { check } = require('express-validator')


const { getProjects, getProject, createProject, updateProject, deleteProject, uploadImage } = require('../controllers/project')
const { validateFields } = require('../middlewares/validate-fields')


const router = Router()


router.get('/get-projects', getProjects)
router.get('/get-project/:id', getProject)
router.post('/create-new-project/', [
    check('title', 'El titulo debe ser de al menos 8 caracteres').not().isEmpty().isLength({ min: 8 }),
    check('subtitle', 'El Subtitulo debe ser de al menos 12 caracteres').not().isEmpty().isLength({ min: 12 }),
    check('content', 'El contenido de este proyecto debe ser de al menos 40 caracteres').not().isEmpty().isLength({ min: 40 }),
], validateFields, createProject)
router.put('/update-project/:id', updateProject)
router.delete('/delete-project/:id', deleteProject)




module.exports = router