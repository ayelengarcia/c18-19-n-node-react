const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models/user')

// Requerimientos para desp verificar el token:
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

// Middlewares de autenticación para registrarse:
passport.use('signup', new localStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'
}, async (req, email, password, done) => {
    const { nombre, apellido, edad, telefono } = req.body;

    try {
        const nuevoUsuario = new User({
            nombre,
            apellido,
            email,
            edad,
            telefono,
            password
        });

        await nuevoUsuario.save();
        return done(null, nuevoUsuario);
    } catch (e) {
        return done(e);
    }
}))

// Middleware de autenticación para el login:
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

// Estrategia Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, async (token, tokenSecret, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = new User({
                googleId: profile.id,
                nombre: profile.displayName,
                email: profile.emails[0].value,
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

// Estrategia Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, async (token, tokenSecret, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });

        if (!user) {
            user = new User({
                facebookId: profile.id,
                nombre: profile.displayName,
                email: profile.emails[0].value,
            });
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = passport;