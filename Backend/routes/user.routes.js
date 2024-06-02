const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user.controller')
const verifyToken = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/checkRoleMiddleware')

userRouter.get('/', verifyToken, userController.obtenerUsuarios)
userRouter.get('/:usuarioId', verifyToken, userController.obtenerUsuarioPorId)
userRouter.put('/:usuarioId', verifyToken, userController.editarUsuario)
userRouter.delete('/:usuarioId', verifyToken, checkRole(['admin']), userController.eliminarUsuario)

module.exports = userRouter