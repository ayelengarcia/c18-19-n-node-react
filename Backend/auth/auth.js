const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')

// Requerimientos para desp verificar el token:
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

// Middlewares de autenticación:
// primero vamos a modificar los valores por defecto q espera passport y luego ejecutar una funcion de callback:
passport.use('signup', new localStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
}, async (req, email, password, done) => {
    try {
        const nuevoUsuario = new User({ nombre: nombre, apellido: apellido, email: email, edad: edad, telefono: telefono, password: password })
        await nuevoUsuario.save()
        return done(null, nuevoUsuario)
    } catch (e) {
        return done(e)
    }
}))

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return done(null, false, { message: 'Usuario no encontrado' })
        }

        const validate = await user.isValidPassword(password)

        if (!validate) {
            return done(null, false, { message: 'Usuario o contraseña incorrecta' })
        }

        return done(null, user, { message: 'Ingresaste correctamente a tu OfiFlex!' })
    } catch (e) {
        return done(e)
    }
}))

// Middleware para comprobar el token:

passport.use(new JWTStrategy({
    secretOrKey: 'top-secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(e)
    }
}
))