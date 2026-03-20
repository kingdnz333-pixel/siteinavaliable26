const { Resend } = require('resend');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: "https://siteinavaliable26-j7vq.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ success: false });
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['kingdnz333@gmail.com', 'casaurbanacoworking@gmail.com'],
      reply_to: email,
      subject: 'Novo contato - ${name}',
      html: `
        <h2>Novo contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Mensagem:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.json({ success: true });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ success: false });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor rodando' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post("/send", async (req, res) => {
  console.log("CHEGOU NO BACKEND");
  console.log("BODY:", req.body);

  return res.json({ success: true });
});