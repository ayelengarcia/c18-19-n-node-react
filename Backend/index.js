const express = require('express');
const cors = require('cors');
const passport = require('./auth/auth');
const userRoutes = require('./routes/user.routes');
const reservasRoutes = require('./routes/reservas.routes');
const serviciosRoutes = require('./routes/servicios.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();
const mongoose = require('mongoose');
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
require('dotenv').config();

const corsOptions = {
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.set('PORT', 3000);
app.use(express.json());
app.use(passport.initialize());

// RUTAS
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/reservas', reservasRoutes);
app.use('/servicios', serviciosRoutes);

// Conexión al puerto 3000
 const port = app.get('PORT')
 app.listen(port, () => {
     console.log(`Servidor escuchando en http://localhost:${port}`);
 })

 main().catch(err => console.log(err));

// Conexión con MongoDB
 async function main() {
     console.log(process.env.MONGO_URI);
     await mongoose.connect(process.env.MONGO_URI);
 }

// const mongoUri =
//   "mongodb+srv://ayelengarcia7:eIXUnjHpOu7NgSKF@clustercoder.t6a33ln.mongodb.net/?retryWrites=true&w=majority";
// const dbName = "BDofiflex"
// const PORT = "3000"

// //Mongo session
// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl: mongoUri,
//       dbName: dbName,
//       mongoOptions: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//       ttl: 60 * 60 * 10000,
//     }),
//     secret: "secretmydbofiflex",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// mongoose.set("strictQuery", false);

// // Conexión con MongoDB
// mongoose
//   .connect(mongoUri, { dbName: dbName })
//   .then(() => {
//     console.log("DB conectada");
//     app.listen(PORT, () => {
//       console.log(`Servidor escuchando en http://localhost:${PORT}`);
//     });
//   })
//   .catch((e) => {
//     console.log("Error al conectar la DB", e);
//   });