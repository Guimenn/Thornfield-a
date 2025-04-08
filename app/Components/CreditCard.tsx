'use client';

import React from 'react';
import { CreditCard as CardIcon, Mastercard, Visa } from 'lucide-react';
import './CreditCard.css';

interface CreditCardProps {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  isFlipped: boolean;
}

const CreditCard: React.FC<CreditCardProps> = ({
  cardNumber,
  cardName,
  expiry,
  cvv,
  isFlipped
}) => {
  // Formata o número do cartão em grupos de 4
  const formatCardNumber = (number: string) => {
    const formatted = number.padEnd(16, '•').match(/.{1,4}/g);
    return formatted ? formatted.join(' ') : '';
  };

  // Identifica a bandeira do cartão
  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    
    // Visa: começa com 4
    if (/^4/.test(cleanNumber)) {
      return 'visa';
    }
    // Mastercard: começa com 51-55 ou 2221-2720
    else if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]2[0-1]/.test(cleanNumber)) {
      return 'mastercard';
    }
    // Amex: começa com 34 ou 37
    else if (/^3[47]/.test(cleanNumber)) {
      return 'amex';
    }
    // Elo: começa com 636368, 438935, 504175, 451416, 509048, 509067, 509049, 509069, 509050, 509074, 509068, 509040, 509045, 509051, 509046, 509066, 509047, 509042, 509052, 509043, 509064, 509040
    else if (/^(636368|438935|504175|451416|509048|509067|509049|509069|509050|509074|509068|509040|509045|509051|509046|509066|509047|509042|509052|509043|509064|509040)/.test(cleanNumber)) {
      return 'elo';
    }
    // Hipercard: começa com 606282
    else if (/^606282/.test(cleanNumber)) {
      return 'hipercard';
    }
    return 'default';
  };

  const cardType = getCardType(cardNumber);

  const renderCardLogo = () => {
    switch (cardType) {
      case 'visa':
        return <div className="card-brand visa">VISA</div>;
      case 'mastercard':
        return <div className="card-brand mastercard">MASTERCARD</div>;
      case 'amex':
        return <div className="card-brand amex">AMEX</div>;
      case 'elo':
        return <div className="card-brand elo">ELO</div>;
      case 'hipercard':
        return <div className="card-brand hipercard">HIPERCARD</div>;
      default:
        return <CardIcon className="card-logo" size={32} />;
    }
  };

  return (
    <div className={`credit-card-wrapper ${isFlipped ? 'is-flipped' : ''}`}>
      <div className="credit-card">
        <div className="credit-card-inner">
          {/* Frente do cartão */}
          <div className="credit-card-front">
            <div className={`card-background ${cardType}`}>
              <div className="card-chip">
                <div className="chip-line"></div>
                <div className="chip-line"></div>
                <div className="chip-line"></div>
                <div className="chip-line"></div>
                <div className="chip-main"></div>
              </div>
              {renderCardLogo()}
              <div className="card-number">
                {formatCardNumber(cardNumber)}
              </div>
              <div className="card-info">
                <div className="card-holder">
                  <div className="card-holder-label">Nome no Cartão</div>
                  <div className="card-holder-name">
                    {cardName || 'NOME NO CARTÃO'}
                  </div>
                </div>
                <div className="card-expires">
                  <div className="expires-label">Validade</div>
                  <div className="expires-value">
                    {expiry || 'MM/AA'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verso do cartão */}
          <div className="credit-card-back">
            <div className={`card-background ${cardType}`}>
              <div className="card-stripe"></div>
              <div className="card-cvv">
                <div className="cvv-label">CVV</div>
                <div className="cvv-value">{cvv}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard; 