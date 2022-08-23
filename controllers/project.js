const { request, response } = require('express')


const Project = require('../models/project')
const { uploadImage } = require("../utils/cloudinary");
const fs = require("fs-extra");
const { isValidObjectId } = require('mongoose');



const getProjects = async (req, res = response) => {

    try {

        const getProjects = await Project.find()

        if (getProjects) {
            return res.status(500).json({
                ok: false,
                projects: getProjects.length,
                "List of projects": getProjects
            })
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'No se pudieron obtener el listado de projectos'
            })

        }

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Error, talk to the admin'
        })
    }
}

const getProject = async(req = request, res = response) => {

    const { id } = req.params


    try {
        if (isValidObjectId(id)) {

            const projectFound = await Project.findById(id)

            if (!projectFound) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Este project no existe'
                })
            } else {
                return res.status(200).json({
                    ok: true,
                    project: projectFound
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

const createProject = async (req = request, res = response) => {

    const data = req.body


    try {

        data.image = {
            public_id: "portafolio/smqwt4ot8l2vlclfxcjm",
            secure_url: "https://res.cloudinary.com/dorqesogu/image/upload/v1660412426/portafolio/smqwt4ot8l2vlclfxcjm.jpg"
        }


        const newProject = new Project(data)

        const createNewProject = await newProject.save()

        if (createNewProject) {
            return res.status(200).json({
                ok: true,
                project: createNewProject
            })
        } else {
            return res.status(500).json({
                ok: false,
                msg: 'Error no se pudo crear el proyecto'
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: 'Error, talk to the admin'
        })
    }


}

const updateProject = (req = request, res = response) => {

}

const deleteProject = (req = request, res = response) => {

}

const uploadFiles = async (req, res) => {

    const data = req.body

    const { id } = req.params



    if (isValidObjectId(id)) {

        try {



            if (req.files && req.files !== null) {

                const result = await uploadImage(req.files.file.tempFilePath)


                data.image = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                }

                await fs.unlink(req.files.file.tempFilePath)



                const projectToUpdate = await Project.findByIdAndUpdate({_id: id}, data)

                const  proyectoActualizado = await projectToUpdate

                if (proyectoActualizado) {
                    return await res.status(200).json({
                        ok: true,
                        msg: 'project image has been updated',
                        proyectoActualizado
                    })
                }
                else {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Image could not been updated'
                    })
                }
            }
            else {
                return res.status(500).json({
                    ok: false,
                    msg: 'Must select one file at least'
                })
            }


        } catch (error) {
            console.log(error);

            return res.status(400).json({
                ok: false,
                msg: 'Unknown error, talk to the admin'
            })

        }



    } else {

        return res.status(500).json({
            ok: false,
            msg: 'El id no es valido'
        })

    }







}




module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    uploadFiles
}