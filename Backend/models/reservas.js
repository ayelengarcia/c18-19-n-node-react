const mongoose = require('mongoose')

const ReservaSchema = new mongoose.Schema({
    reservaId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        auto: true,
    },
    servicioId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    usuarioReserva: { type: String, require: true },
    servicioReservado: { type: String, require: true },
    fechaCreacion: { type: mongoose.Schema.Types.Date, auto: true },
    estado: { type: String, enum: ["activa", "realizada"] , default: 'activa' },
    feedback: { type: String, require: false, default: '' }
})

module.exports = mongoose.model('Reserva', ReservaSchema)