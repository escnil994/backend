
const { Router } = require('express')


const { getProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/project')


const router = Router()


router.get('/get-projects', getProjects)
router.get('/get-project/:id', getProject)
router.post('/create-new-project/', createProject)
router.put('/update-project/:id', updateProject)
router.delete('/delete-project/:id', deleteProject)



module.exports = router