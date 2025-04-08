'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './PixPayment.css';

interface PixPaymentProps {
  value: number;
  onSuccess: () => void;
}

const PixPayment: React.FC<PixPaymentProps> = ({ value, onSuccess }) => {
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [pixCopiaECola, setPixCopiaECola] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePixQRCode = () => {
    setLoading(true);

    // Simulando dados do PIX (em um caso real, isso viria do backend)
    const pixData = {
      // Dados do PIX seguindo o padrão BR Code
      payloadFormatIndicator: "01",
      pointOfInitiationMethod: "11",
      merchantAccountInformation: {
        gui: "br.gov.bcb.pix",
        chave: "123e4567-e89b-12d3-a456-426655440000", // Chave PIX do comerciante
        description: "Pagamento Thornfield"
      },
      merchantCategoryCode: "0000",
      transactionCurrency: "986", // BRL
      transactionAmount: value.toFixed(2),
      merchantName: "THORNFIELD STORE",
      merchantCity: "SAO PAULO",
      postalCode: "01452002",
      transactionId: "THORNFIELD" + Date.now(),
      crc16: "0000" // Em um caso real, isso seria calculado
    };

    // Em um caso real, isso seria gerado no backend
    const pixString = `00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266554400005204000053039865802BR5913THORNFIELD6009SAO PAULO62070503***63046104`;
    
    setPixCopiaECola(pixString);
    setQrCodeGenerated(true);
    setLoading(false);

    // Simula verificação de pagamento
    setTimeout(() => {
      onSuccess();
    }, 5000);
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCopiaECola);
  };

  return (
    <div className="pix-payment">
      {!qrCodeGenerated ? (
        <div className="pix-initial">
          <div className="pix-value">
            <h3>Valor a pagar:</h3>
            <p className="amount">R$ {value.toFixed(2)}</p>
          </div>
          <button
            className="generate-pix-button"
            onClick={generatePixQRCode}
            disabled={loading}
          >
            {loading ? 'Gerando...' : 'Gerar QR Code PIX'}
          </button>
        </div>
      ) : (
        <div className="pix-qr-container">
          <div className="qr-code-wrapper">
            <QRCodeSVG
              value={pixCopiaECola}
              size={200}
              level="H"
              includeMargin={true}
              className="qr-code"
            />
          </div>
          
          <div className="pix-info">
            <p className="pix-amount">Valor: R$ {value.toFixed(2)}</p>
            <button className="copy-pix-button" onClick={copyPixCode}>
              Copiar código PIX
            </button>
          </div>

          <div className="pix-instructions">
            <h3>Como pagar com PIX:</h3>
            <ol>
              <li>Abra o app do seu banco</li>
              <li>Escolha pagar com PIX</li>
              <li>Escaneie o QR Code ou cole o código</li>
              <li>Confirme as informações</li>
              <li>Digite sua senha</li>
            </ol>
          </div>

          <div className="pix-status">
            <p>Aguardando pagamento...</p>
            <div className="loading-indicator"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PixPayment; 