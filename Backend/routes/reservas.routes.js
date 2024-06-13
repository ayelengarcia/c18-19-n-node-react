const express = require('express')
const reservaRouter = express.Router()
const reservaController = require('../controllers/reservas.controller')
const verifyToken = require('../middlewares/authMiddleware')

reservaRouter.post("/", verifyToken, reservaController.crearReserva);
reservaRouter.get('/', verifyToken, reservaController.obtenerReservas)
reservaRouter.get('/:reservaId', verifyToken, reservaController.obtenerReservasPorId)
reservaRouter.put('/:reservaId', verifyToken, reservaController.cancelarReserva)
reservaRouter.post('/:reservaId', verifyToken, reservaController.feedBack)

module.exports = reservaRouter