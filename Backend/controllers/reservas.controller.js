const Reserva = require("../models/reservas");
const Usuario = require("../models/user");

// TODO: cambiar el estado de disponible de los servicios de true a false;
// crear la reserva:
const crearReserva = async (req, res) => {
  const { servicioId, usuarioId, usuarioReserva, servicioReservado } = req.body;

  if (!servicioId || !usuarioId) {
    return res
      .status(400)
      .json({
        error: "Se requiere un servicio a reservar y un usuario que reserve",
      });
  }

  // Agarro al usuario para agregar la reserva a su perfil:
  const usuarioAEditar = await Usuario.findOne({ usuarioId: usuarioId }).exec();

  if (!usuarioAEditar) {
    return res.status(400).json({ error: "No se encontró al usuario" });
  }

  // Crear reserva nueva:
  const nuevaReserva = new Reserva({
    servicioId: servicioId,
    usuarioId: usuarioId,
    usuarioReserva: usuarioReserva,
    servicioReservado: servicioReservado,
  });
  await nuevaReserva.save();

  // Agrego la nueva reserva las citas de ambos:
  usuarioAEditar.listaReservas.push(nuevaReserva);

  // Guardo en la db los datos:
  await usuarioAEditar.save();

  // Devuelvo la nueva reserva:
  res.status(201).json(nuevaReserva);
};

const obtenerReservas = async (req, res) => {
  const reservas = await Reserva.find({}).exec();
  res.json(reservas);
};

const obtenerReservasPorId = async (req, res) => {
  const reserva = await Reserva.findOne({
    reservaId: req.params.reservaId,
  }).exec();

  if (reserva) {
    res.json(reserva);
  } else {
    res.status(404).json({ error: "Reserva no encontrada" });
  }
};

const feedBack = async (req, res) => {
  try {
    const reservaRealizada = await Reserva.findOne({
      reservaId: req.params.reservaId,
    }).exec();

    if (!reservaRealizada) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }

    const nuevoFeedback = req.body.feedback;

    reservaRealizada.feedback = nuevoFeedback;
    await reservaRealizada.save();

    res.json(reservaRealizada);
  } catch (error) {
    console.error("Error al devolver feedback de la reserva", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

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

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservasPorId,
  feedBack,
};
