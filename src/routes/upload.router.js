// const Router = require('express').Router;

// const controller = require('../controllers/upload.controller');
// const { validateImageExtension } = require('../middlewares/imageUpload');


// const rota = Router();

// // rota.post('/',validateImageExtension, controller.upload);
// rota.post('/:uploads', validateImageExtension, controller.upload);


// module.exports = rota;
/////////////////////////////////////////////////////
// const router = require('express').Router();
// const multer = require('multer');
// const uploadController = require('../controllers/upload.controller');
// const imageUploadMiddleware = require('../middlewares/imageUpload');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads/'));
//   },
//   filename: (req, file, cb) => {
//     const fileExtension = file.originalname.split('.').pop();
//     const fileName = `${file.originalname}-${Date.now()}`;

//     cb(null, `${fileName}.${fileExtension}`);
//   },
// });

// const upload = multer({ storage });

// router.post('/', imageUploadMiddleware.validateImageExtension, upload.single('file'), uploadController.upload);

// module.exports = router;

/////////////////////////////////////////////////////////////////////////////////////////////
// const router = require('express').Router();
// const multer = require('multer');
// const path = require('path');
// const uploadController = require('../controllers/upload.controller');
// const imageUploadMiddleware = require('../middlewares/imageUpload');
// const verifyToken = require('../middlewares/validtoken');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../uploads/'));
//     },
//     filename: (req, file, cb) => {
//         const fileName = path.parse(file.originalname).name;
//         const fileExtension = path.parse(file.originalname).ext;
//         const timestamp = Date.now();
//         const newFileName = `${timestamp}-${fileName}${fileExtension}`;

//         cb(null, newFileName);
//     },
// });

// const upload = multer({ storage });

// router.post('/', upload.single('file'),verifyToken, imageUploadMiddleware.validateImageExtension, uploadController.upload);
// module.exports = router;

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
router.post('/',verifyToken, upload.single('file'), validateImageExtension, uploadController.upload);

module.exports = router;

