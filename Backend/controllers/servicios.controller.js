// const generarFechas = require('../helpers/generarFechas');

// TODO: mirar comentario en trello sprint 4

const Servicio = require('../models/servicios')
const Usuario = require('../models/user')


const crearServicio = async (req, res) => {
  const { titulo, descripcion, imagen, fecha, hora, categoria, usuarioId } =
    req.body;

  if (!titulo || !descripcion || !imagen || !fecha || !hora || !categoria || !usuarioId) {
    return res.status(400).json({
      error:
        "Se requiere el _id del usuario, titulo, descripcion, imagen, fecha, hora y categoria para crear un servicio",
    });
  }
  // Buscar el propietario que crea el servicio
  const usuarioAEditar = await Usuario.findOne({ _id: usuarioId });
  if (!usuarioAEditar) {
    return res.status(400).json({ error: 'No se encontró al usuario' });
}
  // Crear servicio nuevo:
  const nuevoServicio = new Servicio({
    titulo: titulo,
    descripcion: descripcion,
    imagen: imagen,
    fecha: fecha,
    hora: hora,
    categoria: categoria,
  });
  await nuevoServicio.save();

  // Agrego el nuevo servicio a la lista del propietario:
  usuarioAEditar.listaServicios.push(nuevoServicio);

  // Guardo en la db los datos:
  await usuarioAEditar.save();

  // Devuelvo el nuevo servicio:
  res.status(201).json(nuevoServicio);
};

// const crearServicio = async (req, res) => {
//     const { titulo, descripcion, imagen, categoria, hora, rangoFechas } = req.body

//     if (!titulo || !descripcion || !imagen || !categoria || !hora) {
//         return res.status(400).json({ error: 'Se requiere titulo, descripcion, imagen, categoria y hora para crear un servicio' })
//     }

//     let fechasDisponibles = [];
//     if (rangoFechas && rangoFechas.inicio && rangoFechas.fin) {
//         fechasDisponibles = generarFechas(rangoFechas.inicio, rangoFechas.fin);
//     }

//     console.log(fechasDisponibles);

//     // Crear servicio nuevo:
//     const nuevoServicio = new Servicio({ titulo: titulo, descripcion: descripcion, imagen: imagen, categoria: categoria, hora: hora, fechasDisponibles: fechasDisponibles })
//     await nuevoServicio.save();

//     // Devuelvo el nuevo servicio:
//     res.status(201).json(nuevoServicio)
// }

const obtenerServicios = async (req, res) => {
    const servicios = await Servicio.find({}).exec()
    res.json(servicios)
}

const obtenerServicioPorCategoria = async (req, res) => {
    const servicios = await Servicio.findOne({ categoria: req.params.categoria }).exec()

    if (servicios) {
        res.json(servicios)
    } else {
        res.status(404).json({ error: 'Categoria del servicio no encontrada' })
    }
}

const obtenerServicioPorId = async (req, res) => {
  const servicio = await Servicio.findOne({ _id: req.params.id }).exec()

  if (servicio) {
      res.json(servicio)
  } else {
      res.status(404).json({ error: 'Servicio no encontrado' })
  }
}

const eliminarServicio = async (req, res) => {
    const servicioAEliminar = await Servicio.deleteOne({ servicioId: req.params.servicioId }).exec()

    if (!servicioAEliminar) {
        return res.status(404).json({ error: 'Servicio no encontrado' })
    } else {
        return res.status(200).json({ error: 'Servicio eliminado correctamente' })
    }
}

module.exports = {
    crearServicio,
    obtenerServicios,
    obtenerServicioPorCategoria,
    obtenerServicioPorId,
    eliminarServicio
}