const { model, Schema, default: mongoose } = require('mongoose')


const projectSchema = Schema({
    title: {
        type: String,
        required: true
    },
<<<<<<< HEAD
=======
    type: {
        type: String,
        required: true
    },
>>>>>>> 7df00dbaa146fc1c4a9ebfe39a7e1a5a66c756f3
    content: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    comments: {
        type: String,
        required: false
    },
    image: {
        public_id: String,
        secure_url: String
    },
    date:  {
        type: Date, default: new Date()
    },
})


module.exports = mongoose.model('Project', projectSchema)

