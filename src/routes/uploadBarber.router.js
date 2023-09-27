const express = require('express');
const multer = require('multer');
const path = require('path');
const uploadController = require('../controllers/upload.controller');
const { validateImageExtension } = require('../middlewares/imageUpload');
const verifyToken = require('../middlewares/validtoken');
const router = express.Router();

// Configuração do Multer para armazenar arquivos em disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });


// Rota de upload de imagens
router.post('/',verifyToken, upload.single('file'), validateImageExtension, uploadController.uploadBarber);

module.exports = router;



