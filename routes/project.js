
const { Router } = require('express')
const { check } = require('express-validator')


const { getProjects, getProject, createProject, updateProject, deleteProject, uploadFiles } = require('../controllers/project')
const { validateFields } = require('../middlewares/validate-fields')

const {ValidateJwt} = require("../middlewares/validate-jwt");


const router = Router()


router.get('/get-projects/:limit?', getProjects)
router.get('/get-project/:id', getProject)
router.post('/create-new-project/', ValidateJwt,[
    check('title', 'El titulo debe ser de al menos 8 caracteres').not().isEmpty().isLength({ min: 8 }),
    check('content', 'El contenido de este proyecto debe ser de al menos 30 caracteres').not().isEmpty().isLength({ min: 30 }),
], validateFields, createProject)
router.put('/update-project/:id', ValidateJwt, updateProject)

router.put('/upload-image/:id', ValidateJwt, uploadFiles)


router.delete('/delete-project/:id',ValidateJwt, deleteProject)




module.exports = router