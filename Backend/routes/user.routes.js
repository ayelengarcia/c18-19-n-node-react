const express = require('express');
const multer = require('multer');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const upload = multer({ dest: 'uploads/' });

userRouter.post('/upload', upload.single('imagen'), async (req, res) => {
    const { userId } = req.body;
    const imagePath = req.file.path; // Aquí tendrías que subir la imagen a un servicio y obtener la URL

    try {
        await User.findByIdAndUpdate(userId, { imagenUrl: imagePath });
        res.send('Imagen subida y URL guardada');
    } catch (err) {
        res.status(500).send('Error subiendo la imagen');
    }
})

userRouter.get('/', verifyToken, userController.obtenerUsuarios);
userRouter.get('/:usuarioId', verifyToken, userController.obtenerUsuarioPorId);
userRouter.put('/:usuarioId', verifyToken, userController.editarUsuario);
userRouter.put('/:usuarioId/resetpassword', verifyToken, userController.resetPassword);
userRouter.delete('/:usuarioId', verifyToken, checkRole(['admin']), userController.eliminarUsuario);

module.exports = userRouter;