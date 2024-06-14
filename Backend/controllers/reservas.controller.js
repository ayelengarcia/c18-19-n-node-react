const Reserva = require('../models/reservas');
const Usuario = require('../models/user');
const Servicio = require('../models/servicios');

const crearReserva = async (req, res) => {
    const { servicioId, usuarioId, usuarioReserva, servicioReservado } = req.body;

    if (!servicioId || !usuarioId) {
        return res.status(400).json({ error: 'Se requiere un servicio a reservar y un usuario que reserve' });
    }

    try {
        // Buscar el usuario que realiza la reserva
        const usuarioAEditar = await Usuario.findOne({ _id: usuarioId });
        if (!usuarioAEditar) {
            return res.status(400).json({ error: 'No se encontró al usuario' });
        }

        // Actualizar estado del servicio a no disponible y obtener el servicio actualizado
        const servicio = await Servicio.findByIdAndUpdate(servicioId, { disponible: false }, { new: true });

        // Crear reserva nueva
        const nuevaReserva = new Reserva({ servicioId, usuarioId, usuarioReserva, servicioReservado });
        await nuevaReserva.save();
        console.log('Has hecho la reserva!')
        
        res.status(201).json({
            reservaId: nuevaReserva._id,
            servicioActualizado: servicio,
            mensaje: 'Reserva creada y estado del servicio actualizado correctamente'
        });

        

        // Agregar la nueva reserva a las citas del usuario
        usuarioAEditar.listaReservas.push(nuevaReserva);
        await usuarioAEditar.save();

        // Devolver la nueva reserva
        //res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error('Error al crear reserva:', error);
        res.status(500).json({ error: 'Error al procesar la reserva' });
    }
};

const obtenerReservasActivas = async (req, res) => {
    const activas = await Reserva.find({ estado: 'activa' }).exec();
    res.json(activas);
}

const obtenerReservasFinalizadas = async (req, res) => {
    const finalizadas = await Reserva.find({ estado: 'finalizada' }).exec();
    res.json(finalizadas);
}

const obtenerReservasPorId = async (req, res) => {
    const reserva = await Reserva.findOne({ reservaId: req.params.reservaId }).exec()

    if (reserva) {
        res.json(reserva)
    } else {
        res.status(404).json({ error: 'Reserva no encontrada' })
    }
}

/* const cancelarReserva = async (req, res) => {
    const ReservaACancelar = await Reserva.findOne({ reservaId: req.params.reservaId }).exec()

    if (!ReservaACancelar) {
        return res.status(404).json({ error: 'Reserva no encontrada' })
    } else {
        ReservaACancelar.cancelada = true;

        await ReservaACancelar.save()
        return res.status(200).json({ error: 'Reserva cancelada correctamente' })
    }
} */

const feedBack = async (req, res) => {
    const reservaRealizada = await Reserva.findOne({ reservaId: req.params.reservaId }).exec()

    try {
        if (!reservaRealizada) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' })
        }

        nuevoFeedback = `Feedback de la reserva (${reservaRealizada.reservaId}):\n`;
        nuevoFeedback += `Usuario: ${reservaRealizada.usuarioReserva}\n`;
        nuevoFeedback += `Detalles de la reserva: ${req.body.feedback}\n`;

        reservaRealizada.feedback = nuevoFeedback;
        await reservaRealizada.save()

        res.json(reservaRealizada);
    } catch (error) {
        console.error('Error al devolver feedback de la reserva', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

module.exports = {
    crearReserva,
    obtenerReservasActivas,
    obtenerReservasFinalizadas,
    obtenerReservasPorId,
    feedBack,
}