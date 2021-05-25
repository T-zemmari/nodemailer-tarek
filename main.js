require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const Port = process.env.PORT || 3001;

app.use(express.json());



app.post('/send-email', async (req, res) => {

    let transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    let espacio = '  enviado desde :                '
    let mailData = {

        from: req.body.email,
        to: 'tarek.zemmari@gmail.com',
        subject: req.body.subject,
        email: req.body.email,
        text: req.body.text + espacio + req.body.from
    }


    try {

        let response = await transporter.sendMail((mailData), (err, data) => {
            if (err) {
                console.log("error", err)
            } else {
                console.log("mensaje enviado")
            }
        });
        res.status(200).json({ status: 'success', response })

    } catch (err) {
        res.status(500).json({ err: messaje.err })
    }


})









app.listen(Port, () => {
    console.log(
        `Server Listening at ${Port}`
    )
})