const express = require("express")
require("dotenv").config();
const mailingRouter = express.Router()
const nodemailer = require("nodemailer");

//crear endponit de mailing para el resset pass

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.PASS_GMAIL,
  },
});

mailingRouter.post("/", async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const asunto = req.body.asunto;
    const mensaje = req.body.mensaje;

    const result = await transport.sendMail({
      from: "prueba@gmail.com",
      to: email,
      subject: "Mensaje de contacto - Ofiflex",
      html: `
      <div>
        <h3>Mensaje de ${nombre}</h3>
        <p><i>Nombre:</i> ${nombre}</p>
        <p><i>Email:</i> ${email}</p>
        <p><i>Telefono:</i> ${telefono}</p>
        <p><i>Asunto:</i> ${asunto}</p>
        <p><i>Mensaje:</i> <br> ${mensaje}</p>
      </div>
      `,
    });

    console.log(result);
    res.status(200).send("Mensaje enviado");
  } catch (error) {
    console.error(error);
    res.status(500).send("Fallo al enviar el correo electrónico", error);
  }
});

module.exports = mailingRouter;