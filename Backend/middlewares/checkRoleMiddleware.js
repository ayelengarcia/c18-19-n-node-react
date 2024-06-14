const Usuario = require('../models/user')

const checkRole = (roles) => async (req, res, next) => {
    let id = req.userId;
    console.log(id);
  
    // Devolver info del usuario de la DB
    const usuario = await Usuario.findOne({ _id: id });
    !roles.includes(usuario.rol)
      ? res.status(403).json("Disculpe, usted no tiene acceso a esta ruta")
      : next();
};

module.exports = checkRole;