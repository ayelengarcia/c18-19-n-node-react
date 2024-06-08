const express = require('express')
const passport = require('passport');
const authRouter = express.Router()
const jwt = require('jsonwebtoken')


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
            // Crear el token incluyendo el ID del usuario, para eso ASEGURARNOS DE CAPTURAR EL ID!!! (con lo que puse en body):
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });
            return res.status(200).json({ token });
        });
    })(req, res, next);
});

// Ruta de autenticación con Google
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {

        if (err) {
            console.log('Error en Google callback:', err);
            return res.status(500).json({ error: 'Error en la autenticación con Google' });
        }
        if (!user) {
            console.log('Usario no encontrado:', info);
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        req.login(user, { session: false }, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ error: 'Falló el login' });
            }
            // Crear el token incluyendo el ID del usuario, para eso ASEGURARNOS DE CAPTURAR EL ID!!! (con lo que puse en body):
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });
            //redireciono al inicio del front con el token en la URL porque no supe como manipularlo desde el front
            res.redirect(`${process.env.URL_FRONT}/?token=${token}`);
        });
    })(req, res, next);
});

// Ruta de autenticación con Facebook
authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

authRouter.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', { session: false }, (err, user) => {

        if (err) {
            console.log('Error en Facebook callback:', err);
            return res.status(500).json({ error: 'Error en la autenticación con Facebook' });
        }
        if (!user) {
            console.log('Usario no encontrado:');
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        req.login(user, { session: false }, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ error: 'Falló el login' });
            }
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });

            res.redirect(`${process.env.URL_FRONT}/?token=${token}`);
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