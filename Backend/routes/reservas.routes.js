const express = require('express')
const reservaRouter = express.Router()
const reservaController = require('../controllers/reservas.controller')
const verifyToken = require('../middlewares/authMiddleware')

reservaRouter.post('/', verifyToken, reservaController.crearReserva)
reservaRouter.get('/activas', verifyToken, reservaController.obtenerReservasActivas)
reservaRouter.get('/finalizadas', verifyToken, reservaController.obtenerReservasFinalizadas)
reservaRouter.get('/:reservaId', verifyToken, reservaController.obtenerReservasPorId)
reservaRouter.post('/:reservaId', verifyToken, reservaController.feedBack)

/* reservaRouter.put('/:reservaId', verifyToken, reservaController.cancelarReserva) */

module.exports = reservaRouter