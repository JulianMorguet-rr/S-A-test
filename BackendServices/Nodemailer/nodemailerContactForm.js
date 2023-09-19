const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import das CORS-Paket

const app = express(); 

const whitelist = ['http://localhost:3000', 'http://localhost:3333']; // Füge hier deine erlaubten Ursprünge hinzu | aktuell nur Astro Frontend und Sanity Backend

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use(cors(corsOptions)); // Verwende CORS Middleware

app.use(express.json()); // Verwende JSON 

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'morguet@rr-pr.com',
        pass: 'JMrrprgcs51!'
    }
});


app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;
    console.log('name: ', name);
    console.log('email: ', email);
    console.log('message: ', message);

    const mailOptions = {
        from: 'morguet@rr-pr.com',
        to: email,
        subject: 'Custom Email from Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

});


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});