// const mime = require('mime-types');

// const validateImageExtension = (req, res, next) => {
//   const file = req.file;
//   const mimeType = mime.lookup(file.originalname);

//   if (!file) {
//     return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
//   }

//   if (!mimeType || !mimeType.startsWith('image/')) {
//     return res.status(400).json({ error: 'O arquivo enviado não é uma imagem.' });
//   }

//   const fileExtension = mime.extension(mimeType);

//   if (!fileExtension) {
//     return res.status(400).json({ error: 'Não foi possível determinar a extensão do arquivo.' });
//   }

//   file.extension = fileExtension;

//   return next();
// };

// module.exports = { validateImageExtension };
// const mime = require('mime-types');
// const fs = require('fs');

// const validateImageExtension = (req, res, next) => {
//   const file = req.file;

//   console.log(req);

//   if (!file) {
//     return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
//   }
  
//   // Check if the file exists before accessing its properties
//   try {
//     fs.accessSync(file.path, fs.constants.F_OK);
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({ error: 'O arquivo enviado não existe.' });
//   }

//   const mimeType = mime.lookup(file.originalname);

//   if (!mimeType || !mimeType.startsWith('image/')) {
//     return res.status(400).json({ error: 'O arquivo enviado não é uma imagem.' });
//   }

//   const fileExtension = mime.extension(mimeType);

//   if (!fileExtension) {
//     return res.status(400).json({ error: 'Não foi possível determinar a extensão do arquivo.' });
//   }

//   file.extension = fileExtension;

//   return next();
// };

// module.exports = { validateImageExtension };
// const mime = require('mime-types');
// const fs = require('fs');

// const validateImageExtension = (req, res, next) => {
//   const file = req.file;

//   if (!file) {
//     return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
//   }

//   const mimeType = mime.lookup(file.originalname);

//   if (!mimeType || !mimeType.startsWith('image/')) {
//     return res.status(400).json({ error: 'O arquivo enviado não é uma imagem.' });
//   }

//   const fileExtension = mime.extension(mimeType);

//   if (!fileExtension) {
//     return res.status(400).json({ error: 'Não foi possível determinar a extensão do arquivo.' });
//   }

//   file.extension = fileExtension;

//   return next();
// };

// module.exports = { validateImageExtension };

const path = require('path');
const fs = require('fs');

const validateImageExtension = (req, res, next) => {
  const file = req.file;
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const extension = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
      }
      return res.status(400).json({ error: 'Tipo de arquivo não permitido.' });
    });
  } else {
    next();
  }
};

module.exports = { validateImageExtension };


