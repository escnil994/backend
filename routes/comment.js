
const { Router } = require('express')


const { getComments, getComment, createComment, autorizeComment, deleteComment } = require('../controllers/comment')


const router = Router()


router.get('/get-comments', getComments)
router.get('/get-comment/:id', getComment)
router.post('/create-new-comment/', createComment)
router.put('/autorize-comment/:id', autorizeComment)
router.delete('/delete-comment/:id', deleteComment)



module.exports = router