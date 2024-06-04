const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: Number, require:true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    telefono: { type: Number, require: true, unique: true},
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    googleId: { type: String },
    facebookId: { type: String },
    rol: { type: String, enum: ["usuario", "propietario", "admin"] , default: 'usuario'},
    listaReservas: { type: Array, default: []}
})

// Método para encriptar contraseña (Hook previo a crear un usuario, para hashear la contraseña y formar un usuario más seguro):

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next()
})

// Método para validar contraseña (Función que nos permite comparar la contraseña que esta en la base de datos con la que viene del request):
UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

module.exports = mongoose.model('User', UserSchema)