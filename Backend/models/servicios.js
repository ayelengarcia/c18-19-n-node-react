const mongoose = require('mongoose')

// TODO: Modificar categoria, fecha y hora. A categorias limitarle 3 o 4 cadenas de string segun las categorias y a fecha y hora buscar una opcion de mongoose con Date. para que solo se pasen fechas u horas.
const ServicioSchema = new mongoose.Schema({
    servicioID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    disponible: { type: Boolean, default: true },
    fechasDisponibles: {
        type: [Date],
    },
    hora: {
        type: String,
        validate: {
            validator: function (v) {
                // Valida que el string tenga el formato HH:MM (24 horas)
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} no es una hora válida! Debe tener el formato HH:MM`
        },
    },
    categoria: { type: String, required: true, enum: ["oficina", "sala", "evento"] }
})

module.exports = mongoose.model('Servicio', ServicioSchema);