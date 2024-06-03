const express = require('express')
const servicioRouter = express.Router()
const servicioController = require('../controllers/servicios.controller')
const verifyToken = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/checkRoleMiddleware')

servicioRouter.post('/',verifyToken, checkRole(["propietario"]), servicioController.crearServicio)
servicioRouter.get('/', verifyToken, servicioController.obtenerServicios)
servicioRouter.get('/:categoria', verifyToken, servicioController.obtenerServicioPorCategoria)
servicioRouter.delete('/:servicioID', verifyToken, servicioController.eliminarServicio)

module.exports = servicioRouter