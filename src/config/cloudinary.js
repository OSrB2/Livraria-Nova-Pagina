require('dotenv').config();

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Método que vai executar o upload no cloudinary.
// Esperar uma promessa.
// Configurar o tipo de resultado que queremos.

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (cloudinaryReturn) => {
        resolve({
          imageUrl: cloudinaryReturn.url,
        });
      },
      {
        folder: folder,
        resource_type: 'auto',
      }
    );
  });
};
