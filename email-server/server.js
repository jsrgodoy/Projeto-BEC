const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jsrgodoy@gmail.com', // Atualize com seu email
    pass: 'gnke usub ddxf aniq' // Atualize com sua senha de app do gmail
  }
});

app.post('/send-email', (req, res) => {
  const { email, subject, text } = req.body;

  const mailOptions = {
    from: 'jsrgodoy@gmail.com', // Atualize com seu email
    to: email,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

