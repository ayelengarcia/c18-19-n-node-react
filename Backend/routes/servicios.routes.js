const express = require('express')
const servicioRouter = express.Router()
const servicioController = require('../controllers/servicios.controller')
const verifyToken = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/checkRoleMiddleware')

// Solo deben agregar producos propietarios y admin
servicioRouter.post('/', verifyToken, checkRole(["propietario", "admin"]), servicioController.crearServicio)
servicioRouter.post('/', verifyToken, checkRole(["propietario"]), servicioController.crearServicio)

//Quito verifyToken para que sean rutas publicas
servicioRouter.get('/', servicioController.obtenerServicios)
servicioRouter.get('/:categoria', servicioController.obtenerServicioPorCategoria)


//El propietario solo deberia poder eliminas sus productos. //El admin todos
servicioRouter.delete(
  "/:servicioID",
  verifyToken,
  checkRole(["propietario", "admin"]),
  servicioController.eliminarServicio
);
// servicioRouter.delete("/:servicioID", verifyToken,servicioController.eliminarServicio);

module.exports = servicioRouter