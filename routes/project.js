
const { Router } = require('express')
const { check } = require('express-validator')


const { getProjects, getProject, createProject, updateProject, deleteProject, uploadFiles, searchProject} = require('../controllers/project')
const { validateFields } = require('../middlewares/validate-fields')

const {ValidateJwt} = require("../middlewares/validate-jwt");


const router = Router()


router.get('/get-projects/:limit?', getProjects)
router.get('/get-project/:id', getProject)
router.post('/create-new-project/',[
    check('title', 'El titulo debe ser de al menos 8 caracteres').not().isEmpty().isLength({ min: 8 }),
<<<<<<< HEAD
=======
    check('type', 'El Subtitulo debe ser de al menos 12 caracteres').not().isEmpty().isLength({ min: 12 }),
>>>>>>> 7df00dbaa146fc1c4a9ebfe39a7e1a5a66c756f3
    check('content', 'El contenido de este proyecto debe ser de al menos 30 caracteres').not().isEmpty().isLength({ min: 30 }),
], validateFields, createProject)
router.put('/update-project/:id', ValidateJwt, updateProject)

router.put('/upload-image/:id', ValidateJwt, uploadFiles)


router.delete('/delete-project/:id',ValidateJwt, deleteProject)

router.get('/search/:search', searchProject)




module.exports = router
