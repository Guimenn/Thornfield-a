export default async function handler(req, res) { 
  if (req.method === 'POST') { 
    const { email, name, interests } = req.body; 
    
    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: 'Email é obrigatório' 
      });
    }
    
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyao_-WkFkfKvsan0mS9EdLT5gwcuT1vZnbX2viMKP2yRLDZ4hy9am_PCpPnqGzaESh/exec"; 

    try { 
      const resposta = await fetch(scriptUrl, { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
          email,
          name: name,
          interests: interests || []
        }), 
      }).then(res => res.json())
      .then(data => console.log("Resposta:", data))
      .catch(error => console.error("Erro:", error));; 

      if (!resposta.ok) {
        console.error("Resposta do Google Script não foi OK:", resposta.status);
        return res.status(500).json({ 
          success: false,
          message: 'Erro ao enviar email de confirmação' 
        });
      }

      try {
        // Tenta fazer parse do JSON
        const dados = await resposta.json();
        return res.status(200).json({ 
          success: true,
          message: 'Email enviado com sucesso',
          data: dados
        });
      } catch (parseError) {
        // Se não conseguir fazer parse, retorna o texto
        const texto = await resposta.text();
        return res.status(200).json({ 
          success: true,
          message: texto 
        });
      }
    } catch (err) {
      console.error("Erro ao enviar para Google Script:", err);
      return res.status(500).json({ 
        success: false,
        message: 'Erro ao enviar newsletter',
        error: err.message
      }); 
    } 
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ 
      success: false,
      message: 'Método não permitido' 
    });
  } 
}
  