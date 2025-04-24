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
      const response = await fetch(scriptUrl, { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
          email,
          name: name,
          interests: interests || []
        }), 
      });

      // Verifica se a requisição foi bem sucedida
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta do Google Script:", response.status, errorText);
        return res.status(response.status).json({ 
          success: false,
          message: `Erro ao comunicar com o serviço de newsletter: ${errorText || response.statusText}`
        });
      }

      // Tenta processar a resposta como JSON
      try {
        const data = await response.json();
        console.log("Resposta do Google Script (JSON):", data);
        // Verifica se o script retornou sucesso
        if (data.success) {
          return res.status(200).json({ 
            success: true,
            message: data.message || 'Inscrição realizada com sucesso!',
            data: data
          });
        } else {
          // Se o script retornou success: false
          console.error("Google Script retornou erro:", data.error);
          return res.status(400).json({ 
            success: false,
            message: data.error || 'Ocorreu um erro no serviço de newsletter.'
          });
        }
      } catch (jsonError) {
        // Se a resposta não for JSON, tenta ler como texto
        console.warn("Resposta do Google Script não é JSON, tentando ler como texto.");
        try {
          const textData = await response.text(); // Precisa clonar ou ler novamente se já tentou json()
          console.log("Resposta do Google Script (Texto):", textData);
          // Considera sucesso se recebeu texto (comportamento legado ou inesperado)
          return res.status(200).json({ 
            success: true, 
            message: textData 
          });
        } catch (textError) {
          console.error("Erro ao ler a resposta como texto:", textError);
          return res.status(500).json({ 
            success: false, 
            message: 'Erro ao processar a resposta do serviço de newsletter.' 
          });
        }
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
  