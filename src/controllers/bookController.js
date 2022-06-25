const { Books } = require('../database/models');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const imagesFolder = 'images/';

const BookController = {
  async create(req, res) {
    const file = req.files[0];
    const uploadPath = await cloudinary.uploads(file.path, 'books');
    fs.unlinkSync(file.path);

    const newBook = await Books.create({
      ...req.body,
      // Forma de upload na aplicação.
      // images: imagesFolder + file.filename,
      images: uploadPath.imageUrl,
    });
    return res.status(201).json({ dados: newBook });
  },
};

module.exports = BookController;
