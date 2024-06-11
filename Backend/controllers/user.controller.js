const Usuario = require('../models/user')
const bcrypt = require('bcrypt')

const obtenerUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}).exec()
    res.json(usuarios)
}

//cambio busqueda por _id para que coincida con el token y pueda decodificar en el front.
const obtenerUsuarioPorId = async (req, res) => {
    const usuario = await Usuario.findOne({ _id: req.params.usuarioId }).exec()

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

// TODO: nombre,apellido, edad y telefono NADA MAS.
const editarUsuario = async (req, res) => {
    const usuarioAEditar = await Usuario.findOne({ usuarioId: req.params.usuarioId }).exec()
    const updateParams = req.body;

    try {
        if (!usuarioAEditar) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' })
        }

        for (const key in updateParams) {
            if (updateParams.hasOwnProperty(key)) {
                usuarioAEditar[key] = updateParams[key]
            }
        }

        await usuarioAEditar.save();

        res.json(usuarioAEditar);
    } catch (error) {
        console.error('Error al actualizar el perfil del usuario', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}
const resetPassword = async (req, res) => {
    //agregar api de mailing para confirmar el reset
    const usuarioAEditar = await Usuario.findOne({ usuarioId: req.params.usuarioId }).exec()
    const { usuarioId, contraseñaActual, nuevaContraseña } = req.body;
    console.log(usuarioAEditar)
    try {
        if (!usuarioAEditar) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' })
        }

        const contraseñaValida = await bcrypt.compare(contraseñaActual, usuarioAEditar.password);
        if (!contraseñaValida) {
            return res.status(401).json({ error: 'La contraseña actual es incorrecta' });
        }

        usuarioAEditar.password = nuevaContraseña;

        await usuarioAEditar.save();

        res.status(200).json({ mensaje: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la contraseña del usuario', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    eliminarUsuario,
    editarUsuario,
    resetPassword
}