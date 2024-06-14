const mongoose = require('mongoose')

// TODO: Modificar categoria, fecha y hora. A categorias limitarle 3 o 4 cadenas de string segun las categorias y a fecha y hora buscar una opcion de mongoose con Date. para que solo se pasen fechas u horas.
const ServicioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  servicioID: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: { type: String, required: true },
  disponible: { type: Boolean, default: true },
  // fechasDisponibles: {
  //   type: [Date],
  // },
  fecha: {
    type: String,
    validate: {
      validator: function (v) {
        // Valida que el string tenga el formato DD/MM/AAAA
        const regex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return regex.test(v);
      },
      message: (props) =>
        `${props.value} no es una fecha válida! Debe tener el formato DD/MM/AAAA`,
    },
  },
  hora: {
    type: String,
    validate: {
      validator: function (v) {
        // Valida que el string tenga el formato HH:MM-HH:MM (24 horas)
        const regex = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/;
        if (!regex.test(v)) {
          return false;
        }
        return regex.test(v);
      },
      message: (props) =>
        `${props.value} no es un rango de horas válido! Debe tener el formato HH:MM-HH:MM y la hora de inicio debe ser anterior a la hora de fin`,
    },
  },
  categoria: {
    type: String,
    required: true,
    enum: ["Oficinas", "Salas", "Eventos"],
  },
});

module.exports = mongoose.model('Servicio', ServicioSchema);