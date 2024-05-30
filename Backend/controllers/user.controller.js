const Usuario = require('../models/user')

const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}).exec()
    res.json(usuarios)
}

const obtenerUsuarioPorId = async (req, res) => {
    const usuario = await Usuario.findOne({ usuarioId: req.params.usuarioId }).exec()

    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' })
    }
}

const eliminarUsuario = async (req, res) => {
    const usuarioAEliminar = await Usuario.deleteOne({ usuarioId: req.params.usuarioId }).exec()

    if (!usuarioAEliminar) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    } else {
        return res.status(200).json({ error: 'Usuario eliminado correctamente' })
    }
}

const editarUsuario = async (req, res) => {
    const usuarioAEditar = await Usuario.findOne({ usuarioId: req.params.usuarioId }).exec()
    const updateParams = req.body;

    try{
        if(!usuarioAEditar) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado'})
        }

        for (const key in updateParams){
            if(updateParams.hasOwnProperty(key)){
                usuarioAEditar[key] = updateParams[key]
            }
        }

        await usuarioAEditar.save();

        res.json(usuarioAEditar);
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario', error);
        res.status(500).json({ mensaje: 'Error interno del servidor'});
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    eliminarUsuario,
    editarUsuario
}