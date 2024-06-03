const express = require('express')
const passport = require('passport');
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
/* const User = require('../models/user')
const bcrypt = require('bcrypt') */

// Ruta de registro
authRouter.post('/register', (req, res, next) => {
    passport.authenticate('signup', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        res.status(201).json({ message: 'Registro exitoso', user });
    })(req, res, next);
});


// Ruta de login
authRouter.post('/login', (req, res, next) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: 'Falló el login' });
        }
        if (!user) {
            return res.status(401).json({ error: info.message || 'Usuario no encontrado' });
        }

        req.login(user, { session: false }, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ error: 'Falló el login' });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });
            return res.status(200).json({ token });
        });
    })(req, res, next);
});

// Ruta de autenticación con Google
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user) => {
        if (err || !user) {
            return res.redirect('/login');
        }

        req.login(user, { session: false }, (loginErr) => {
            if (loginErr) {
                return res.redirect('/login');
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });

            return res.redirect(`/?token=${token}`);
        });
    })(req, res, next);
});

// Ruta de autenticación con Facebook
authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

authRouter.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', { session: false }, (err, user) => {
        if (err || !user) {
            return res.redirect('/login'); // Redirige al login en caso de error
        }

        req.login(user, { session: false }, (loginErr) => {
            if (loginErr) {
                return res.redirect('/login');
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });

            return res.redirect(`/?token=${token}`); // Redirige a la página principal con el token
        });
    })(req, res, next);
});

module.exports = authRouter;

// ANTES ERA ASI (SIN UTILIZAR PASSPORT PARA AUTENTICAR):
/* authRouter.post('/register', async (req, res) => {
    try {
        const { email, password, nombre, apellido, edad, telefono } = req.body

        const user = new User({ email, password: password, nombre: nombre, apellido: apellido, edad: edad, telefono: telefono })
        await user.save()
        res.status(201).json({ message: 'Usuario registrado correctamente' })
    } catch (error) {
        res.status(400).json({ error: 'Falló el registro de usuario' })
    }
}) */

/* // User login
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Fallo en la autenticación' })
        }
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        })
        res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Falló el login' })
    }
})
 */