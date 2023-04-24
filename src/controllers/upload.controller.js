
// // const fs = require('fs');
// // const path = require('path');
// // const { getEmail, updateImg } = require('../services/clientes.service');

// // const upload = async (req, res) => {
// //   const file = req.file;
// //   const email = req.body.usuariotoken.data.userId.email;

// //   const resulEmail = await getEmail(email)

// //   if (resulEmail.email && resulEmail.image === null) {
// //     console.log('so salvar a nova imagem');
// //     if (!file) {
// //       return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
// //     }
  
  
  
// //     const fileName = `${Date.now()}-${path.parse(file.originalname).name}${path.parse(file.originalname).ext}`;
  
// //     fs.rename(file.path, path.join(__dirname, `../uploads/${fileName}`), (error) => {
// //       if (error) {
// //         console.error(error);
// //         return res.status(500).json({ error: 'Erro ao salvar a imagem enviada.' });
// //       }
// //       let img = { message: fileName };
// //       // console.log(`img p salvar no baco ${img.message}`);
  
// //       // console.log(email);

// //       const update = await updateImg(resulEmail.email, `http://localhost:3000/uploads/${img.message}`)
// //       const resUpdate = update.image

// //       return res.status(201).json({ message: resUpdate });
// //     });
// //   }

// // };

// // module.exports = { upload };

// const fs = require('fs');
// const path = require('path');
// const { getEmail, updateImg } = require('../services/clientes.service');

// const renameFile = (oldPath, newPath) => {
//   return new Promise((resolve, reject) => {
//     fs.rename(oldPath, newPath, (error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve();
//       }
//     });
//   });
// };

// const upload = async (req, res) => {
//   const file = req.file;
//   const email = req.body.usuariotoken.data.userId.email;

//   const resulEmail = await getEmail(email);

//   if (resulEmail.email && resulEmail.image === null) {
//     console.log('so salvar a nova imagem');
//     if (!file) {
//       return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
//     }
  
//     const fileName = `${Date.now()}-${path.parse(file.originalname).name}${path.parse(file.originalname).ext}`;
  
//     try {
//       await renameFile(file.path, path.join(__dirname, `../uploads/${fileName}`));
//       let img = { message: fileName };
//       const update = await updateImg(resulEmail.email, `http://localhost:3000/uploads/${img.message}`);
//       const resUpdate = update.image;
//       return res.status(201).json({ message: resUpdate });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Erro ao salvar a imagem enviada.' });
//     }
//   }

//   if (resulEmail.email && resulEmail.image) {
//     fs.unlink(path.join(__dirname, `../uploads/${fileName}`), (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Erro ao excluir o arquivo.' });
//       }
//       const fileName = `${Date.now()}-${path.parse(file.originalname).name}${path.parse(file.originalname).ext}`;
  
//       try {
//         await renameFile(file.path, path.join(__dirname, `../uploads/${fileName}`));
//         let img = { message: fileName };
//         const update = await updateImg(resulEmail.email, `http://localhost:3000/uploads/${img.message}`);
//         console.log(`Arquivo ${fileName} excluído com sucesso.`);
//         const resUpdate = update.image;
//         return res.status(201).json({ message: resUpdate });
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Erro ao salvar a imagem enviada.' });
//       }
//     });
//   }
  

// };

// module.exports = { upload };

const fs = require('fs');
const path = require('path');
const { getEmail, updateImg } = require('../services/clientes.service');

const renameFile = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const upload = async (req, res) => {
  const file = req.file;
  const email = req.body.usuariotoken.data.userId.email;
  let fileName = 'default.jpg';

  const resulEmail = await getEmail(email);

  if (resulEmail.email && resulEmail.image === null) {
    console.log('so salvar a nova imagem');
    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
    }
  
    fileName = `${Date.now()}-${path.parse(file.originalname).name}${path.parse(file.originalname).ext}`;
  
    try {
      await renameFile(file.path, path.join(__dirname, `../uploads/${fileName}`));
      let img = { message: fileName };
      const update = await updateImg(resulEmail.email, `http://localhost:3000/uploads/${img.message}`);
      const resUpdate = `http://localhost:3000/uploads/${fileName}`;
      return res.status(201).json({ message: resUpdate });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao salvar a imagem enviada.' });
    }
  }

  if (resulEmail.email && resulEmail.image) {
    const filePath = path.join(__dirname, `../uploads/${path.basename(resulEmail.image)}`);
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao excluir o arquivo.' });
      }
  
      fileName = `${Date.now()}-${path.parse(file.originalname).name}${path.parse(file.originalname).ext}`;
  
      try {
        await renameFile(file.path, path.join(__dirname, `../uploads/${fileName}`));
        let img = { message: fileName };
        const updateNew = await updateImg(resulEmail.email, `http://localhost:3000/uploads/${img.message}`);
        // console.log(`Arquivo ${fileName} excluído com sucesso.`);
        const imgUpdated = `http://localhost:3000/uploads/${fileName}`
        return res.status(201).json({ message: imgUpdated });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao salvar a imagem enviada.' });
      }
    });
  }
};

module.exports = { upload };
