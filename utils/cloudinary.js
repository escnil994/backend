const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true
  });

  const uploadImage = async (filePath)=>{
    return await cloudinary.uploader.upload(filePath, {
        folder: 'portafolio'
    })
  }

  module.exports = {
    uploadImage

  }