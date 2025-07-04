// api/lead.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body;

  try {
    const resposta = await fetch("https://script.google.com/macros/s/AKfycbz0Fiv0flJeljrutSDF7tsoK24uzb3rXSk0-I9FPrf9c5b8bPk92PlwAITPgskOUAfa/exec", {
      method: "POST",
      body: JSON.stringify({ nome, email, mensagem }),
      headers: {
        "Content-Type": "application/json",
      }
    });

    const resultado = await resposta.json();
    return res.status(200).json(resultado);

  } catch (erro) {
    console.error("Erro ao enviar dados:", erro);
    return res.status(500).json({ error: "Erro interno ao enviar dados ao Google Sheets" });
  }
}
