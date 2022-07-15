const { request, response  } = require('express')


const Project = require('../models/project')
const {uploadImage} = require("../utils/cloudinary");
const fs = require("fs-extra");



const getProjects = async(req, res = response) => {

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

const getProject = (req = request, res = response) => {

}

const createProject = async(req = request, res = response) => {

    const  data = req.body

    try {

        if (req.files && req.files !== null) {

            const result = await uploadImage(req.files.image.tempFilePath)


            data.image = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }

            await fs.unlink(req.files.image.tempFilePath)

        }


        const newProject = new Project(data)

        const createNewProject = await newProject.save()

        if (createNewProject) {
            return res.status(200).json({
                ok: true,
                project: createNewProject
            })
        }else{
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




module.exports ={
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}