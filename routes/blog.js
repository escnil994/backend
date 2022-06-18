
const { Router } = require('express')


const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/blog')


const router = Router()


router.get('/get-post', getPosts)
router.get('/get-post/:id', getPost)
router.post('/create-new-post/', createPost)
router.put('/update-post/:id', updatePost)
router.delete('/delete-post/:id', deletePost)



module.exports = router

