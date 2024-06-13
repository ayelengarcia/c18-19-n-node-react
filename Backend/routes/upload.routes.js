const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const uploadRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(), // Usar almacenamiento en memoria para obtener el buffer
  limits: {
    fileSize: 3000000 // 3 megas
  },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return callback(new Error('Por favor subir una foto en formato PNG, JPEG ó JPG'));
    }
    callback(null, true);
  }
});

uploadRouter.post('/upload', verifyToken, checkRole(["usuario", "propietario"]), upload.single('avatar'), async (req, res) => {
  try {
    const file = req.file;
    const usuarioId = req.userId;
    const token = req.body.token;

    console.log(req.body);
    console.log(usuarioId);
    console.log("token:", token);

    if (!file) {
      return res.status(400).send({ error: 'No hay un archivo subido' });
    }

    const base64Image = file.buffer.toString('base64');
    const imagenUrl = `data:${file.mimetype};base64,${base64Image}`;

    res.status(200).json({ message: 'Imagen subida exitosamente', imagenUrl: User.imagenUrl });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Middleware para manejar los errores mejor:
uploadRouter.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send({ error: 'Su foto no debe pesar más de 3MB' });
    }
  } else if (err) {
    return res.status(400).send({ error: err.message });
  }
  next();
});

module.exports = uploadRouter;