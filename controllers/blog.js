const { request, response } = require('express')
const fs = require('fs-extra')
const { isValidObjectId } = require('mongoose')
const Post = require('../models/Blog')
const { uploadImage } = require('../utils/cloudinary')




const getPosts = async (req, res) => {

    try {

        const posts = await Post.find()

        if (posts) {
            return res.status(200).json({
                ok: true,
                posts
            })
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'Error al obtener los posts'
            })
        }

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Error, hable con el administrador'
        })
    }

}

const getPost = async (req = request, res = response) => {

    const { id } = req.params


    try {
        if (isValidObjectId(id)) {

            const postFound = await Post.findById(id)

            if (!postFound) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Este post no existe'
                })
            } else {
                return res.status(200).json({
                    ok: true,
                    post: postFound
                })
            }

        } else {
            return res.status(500).json({
                ok: false,
                msg: 'Este identificador no es invalido'
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, favor consultar con administrador'
        })
    }

}

const createPost = async (req = request, res = response) => {

    const data = req.body

    try {

        if (req.files.image) {

            const result = await uploadImage(req.files.image.tempFilePath)

            console.log(result);

            data.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }

            await fs.unlink(req.files.image.tempFilePath)

        }

        const postToSave = new Post(data)



        const postSaved = await postToSave.save()



        if (postSaved) {
            return res.status(200).json({
                ok: true,
                postSaved
            })
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'No se pudo guardar este post'
            })
        }




    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Error desconocido, habla con el administrador'
        })
    }

}


const updatePost = (req = request, res = response) => {

}

const deletePost = async (req = request, res = response) => {
    const { id } = req.params


    try {

        if (isValidObjectId(id)) {

            const postFound = await Post.findById(id)

            if (postFound) {

                const postdeleted = await Post.findByIdAndDelete(id)

                uploadImage.uploader.destroy(postdeleted.public_id);


                if (postdeleted) {
                    return res.status(200).json({
                        ok: true,
                        postdeleted
                    })
                } else {
                    return res.status(200).json({
                        ok: true,
                        msg: 'Error al borrar este Post'
                    })
                }

            } else {
                return res.status(500).json({
                    ok: false,
                    msg: 'Este post no existe'
                })
            }



        } else {
            return res.status(500).json({
                ok: false,
                msg: 'Este identificador no es invalido'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            ok: false,
            msg: 'Error desconocido, hable con el administrador'
        })
    }

}




module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}