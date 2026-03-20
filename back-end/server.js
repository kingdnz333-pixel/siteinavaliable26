const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false, error: 'Todos os campos são obrigatórios.' });
  }

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const mailOptions = {
  from: `"${name}" <${email}>`,
  to: process.env.GMAIL_USER,
  replyTo: email,
  subject: "Contato via site Casa Urbana",
  text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`,
  html: `
    <h2>Novo contato</h2>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Telefone:</strong> ${phone}</p>
    <p><strong>Mensagem:</strong><br>${message.replace(/\n/g, "<br>")}</p>
  `
};

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ success: false, error: 'Erro interno ao enviar email.' });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor rodando' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
