'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock, CheckCircle2, Package, ArrowLeft, Wallet, QrCode } from 'lucide-react';
import CreditCardComponent from '../../Components/Payment/CreditCard/CreditCard';
import PixPayment from '../../Components/Payment/PixPayment/PixPayment';
import '../payment/payment.css';
import './payment-pricing.css';

// Importando os planos da página de pricing
const plans = [
  {
    name: "STANDARD",
    description: "Uma introdução ao mundo refinado da Thornfield, para apreciadores iniciantes.",
    monthlyPrice: 29.90,
    annualPrice: 299.90,
    benefits: [
      "Acesso ao catálogo completo",
      "Newsletter mensal exclusiva",
      "Participação em 2 eventos anuais",
      "Desconto de 5% em compras na loja",
      "1 degustação guiada por ano"
    ],
    cta: "Assinar Agora",
    color: "amber",
    gradient: "from-amber-950/20 to-black/40",
    icon: "/icons-produtos/barril.svg"
  },
  {
    name: "GOLD",
    description: "Nossa experiência curada para os verdadeiros aficionados de whisky single malt.",
    monthlyPrice: 59.90,
    annualPrice: 599.90,
    benefits: [
      "Todos os benefícios do Standard",
      "Acesso a lançamentos exclusivos",
      "Participação em 6 eventos anuais",
      "Desconto de 10% em compras na loja",
      "4 degustações guiadas por ano",
      "Visita anual à destilaria com acompanhante"
    ],
    cta: "Assinar Agora",
    color: "amber",
    gradient: "from-amber-900/20 via-amber-800/10 to-black/40",
    icon: "/icons-whisky/gold-bar-svgrepo-com.svg"
  },
  {
    name: "MASTER RESERVE",
    description: "A experiência definitiva Thornfield, para colecionadores e connoisseurs.",
    monthlyPrice: 129.90,
    annualPrice: 1299.90,
    benefits: [
      "Todos os benefícios do Gold",
      "Acesso a edições limitadas raríssimas",
      "Participação ilimitada em eventos",
      "Desconto de 15% em compras na loja",
      "Degustações privativas mensais",
      "Concierge dedicado para aquisições",
      "2 garrafas exclusivas anualmente"
    ],
    cta: "Assinar Agora",
    color: "amber",
    gradient: "from-amber-950/30 via-amber-900/10 to-black/60",
    icon: "/icons-whisky/coffee-grain-coffee-svgrepo-com.svg"
  }
];

const PaymentPricing = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'pix'>('credit');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [planDetails, setPlanDetails] = useState({
    plan: '',
    billing: '',
    price: ''
  });
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    cpf: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    phone: '',
    cpf: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  useEffect(() => {
    // Verifica se o usuário está logado
    const user = localStorage.getItem('user');
    if (!user) {
      // Salva a URL atual completa para redirecionamento após login
      const currentUrl = window.location.pathname + window.location.search;
      console.log('Usuário não logado na página de pagamento, salvando URL:', currentUrl);
      localStorage.setItem('returnUrl', currentUrl);
      router.push('/pages/Login');
      return;
    } else {
      console.log('Usuário logado na página de pagamento');
    }

    // Recupera os parâmetros da URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get('plan');
      const billing = params.get('billing');
      const price = params.get('price');

      if (!plan) {
        console.log('Nenhum plano selecionado, redirecionando para a página de preços');
        // Se não houver plano selecionado, redireciona para a página de preços
        router.push('/pages/pricing');
        return;
      }

      setPlanDetails({
        plan: plan || '',
        billing: billing || '',
        price: price || ''
      });
      
      // Encontrar o plano correspondente no array de planos
      const foundPlan = plans.find(p => p.name === plan);
      if (foundPlan) {
        setSelectedPlan(foundPlan);
      }
      
      console.log('Detalhes do plano carregados:', { plan, billing, price });
    }
  }, [router]);

  // Função para formatar o telefone no formato brasileiro
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length > 0) {
      if (cleaned.length <= 2) {
        formatted = `(${cleaned}`;
      } else if (cleaned.length <= 6) {
        formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
      } else if (cleaned.length <= 10) {
        formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
      } else {
        formatted = `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
      }
    }

    return formatted;
  };

  // Função para formatar o CPF
  const formatCPF = (value) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length > 0) {
      if (cleaned.length <= 3) {
        formatted = cleaned;
      } else if (cleaned.length <= 6) {
        formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
      } else if (cleaned.length <= 9) {
        formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
      } else {
        formatted = `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
      }
    }

    return formatted;
  };

  // Função para validar CPF
  const validateCPF = (cpf) => {
    const cleaned = cpf.replace(/\D/g, '');
    
    if (cleaned.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleaned)) return false;
    
    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder;
    
    // Primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(9, 10))) return false;
    
    // Segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(10, 11))) return false;
    
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    let error = '';

    // Formatação e validação específica para cada campo
    if (name === 'fullName' || name === 'cardName') {
      if (value.length < 3 && value.length > 0) {
        error = 'O nome deve ter pelo menos 3 caracteres';
      }
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
      if (value.replace(/\D/g, '').length < 10 && value.length > 0) {
        error = 'Telefone inválido';
      }
    } else if (name === 'cpf') {
      formattedValue = formatCPF(value);
      if (value.length > 0 && !validateCPF(value)) {
        error = 'CPF inválido';
      }
    } else if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 0 && !validateCardNumber(formattedValue)) {
        error = 'Número de cartão inválido';
      }
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
      }
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Função para validar o número do cartão
  const validateCardNumber = (cardNumber) => {
    // Remove espaços e caracteres não numéricos
    const cleanNumber = cardNumber.replace(/\D/g, '');
    
    // Verifica se tem uma bandeira reconhecida
    // Visa: começa com 4
    if (/^4/.test(cleanNumber)) {
      return true;
    }
    // Mastercard: começa com 51-55 ou 2221-2720
    else if (/^5[1-5]/.test(cleanNumber) || /^2[2-7]2[0-1]/.test(cleanNumber)) {
      return true;
    }
    // Amex: começa com 34 ou 37
    else if (/^3[47]/.test(cleanNumber)) {
      return true;
    }
    // Elo: começa com 636368, 438935, 504175, 451416, 509048, etc.
    else if (/^(636368|438935|504175|451416|509048|509067|509049|509069|509050|509074|509068|509040|509045|509051|509046|509066|509047|509042|509052|509043|509064|509040)/.test(cleanNumber)) {
      return true;
    }
    // Hipercard: começa com 606282
    else if (/^606282/.test(cleanNumber)) {
      return true;
    }
    
    // Se não for nenhuma bandeira conhecida, retorna falso
    return false;
  };

  const handlePaymentMethodChange = (method: 'credit' | 'debit' | 'pix') => {
    setPaymentMethod(method);
  };

  const handleCvvFocus = () => {
    setIsCardFlipped(true);
  };

  const handleCvvBlur = () => {
    setIsCardFlipped(false);
  };

  const validateForm = () => {
    const errors = {
      fullName: '',
      phone: '',
      cpf: '',
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvv: ''
    };
    let isValid = true;

    // Validação do nome
    if (!formData.fullName) {
      errors.fullName = 'Nome é obrigatório';
      isValid = false;
    } else if (formData.fullName.length < 3) {
      errors.fullName = 'O nome deve ter pelo menos 3 caracteres';
      isValid = false;
    }

    // Validação do telefone
    if (!formData.phone) {
      errors.phone = 'Telefone é obrigatório';
      isValid = false;
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Telefone inválido';
      isValid = false;
    }

    // Validação do CPF
    if (!formData.cpf) {
      errors.cpf = 'CPF é obrigatório';
      isValid = false;
    } else if (!validateCPF(formData.cpf)) {
      errors.cpf = 'CPF inválido';
      isValid = false;
    }

    // Validações específicas para cartão de crédito/débito
    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      if (!formData.cardNumber) {
        errors.cardNumber = 'Número do cartão é obrigatório';
        isValid = false;
      } else if (!validateCardNumber(formData.cardNumber)) {
        errors.cardNumber = 'Número de cartão inválido';
        isValid = false;
      }

      if (!formData.cardName) {
        errors.cardName = 'Nome no cartão é obrigatório';
        isValid = false;
      }

      if (!formData.expiry) {
        errors.expiry = 'Data de expiração é obrigatória';
        isValid = false;
      } else if (formData.expiry.length < 5) {
        errors.expiry = 'Data de expiração inválida';
        isValid = false;
      }

      if (!formData.cvv) {
        errors.cvv = 'CVV é obrigatório';
        isValid = false;
      } else if (formData.cvv.length < 3) {
        errors.cvv = 'CVV inválido';
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simula processamento da assinatura
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Salva a assinatura no localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const subscription = {
        id: Date.now().toString(),
        userId: user.id,
        plan: planDetails.plan,
        billing: planDetails.billing,
        price: planDetails.price,
        startDate: new Date().toISOString(),
        status: 'active'
      };

      localStorage.setItem('thornfield_subscription', JSON.stringify(subscription));
      setPaymentSuccess(true);

      // Redireciona após 3 segundos
      setTimeout(() => {
        router.push('/pages/pricing?success=true');
      }, 3000);
    } catch (error) {
      console.error('Erro ao processar assinatura:', error);
      setIsLoading(false);
    }
  };

  // Usar os benefícios do plano selecionado do array de planos
  const getPlanBenefits = (planName) => {
    const foundPlan = plans.find(p => p.name === planName);
    return foundPlan ? foundPlan.benefits : [];
  };

  if (paymentSuccess) {
    return (
      <div className="payment-container">
        <div className="payment-content success">
          <CheckCircle2 size={64} className="success-icon animate-pulse flex justify-center mx-auto" />
          <h1>Pagamento Realizado com Sucesso!</h1>
          <p>Sua assinatura do plano {planDetails.plan} foi confirmada com sucesso.</p>
          <p className="redirect-message">Redirecionando para a página de planos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-content mt-[100px]">
        <div className="payment-header">
          <CreditCard size={24} className="payment-icon" />
          <h1>Pagamento</h1>
        </div>

        <div className="order-summary">
          <div className="summary-header">
            <Package size={20} />
            <h2>Resumo do Pedido</h2>
          </div>

          <div className="order-items">
            <div className="order-item">
              <img src={selectedPlan?.icon || "/icons-produtos/barril.svg"} alt={planDetails.plan} className="item-image" />
              <div className="item-details">
                <h3>Plano {planDetails.plan}</h3>
                <p>Período: {planDetails.billing === 'monthly' ? 'Mensal' : 'Anual'}</p>
                <p className="item-price">R$ {planDetails.price?.replace('.', ',')}</p>
              </div>
            </div>
          </div>

          <div className="plan-benefits">
            <h3>Benefícios Incluídos:</h3>
            <ul>
              {getPlanBenefits(planDetails.plan).map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>R$ {planDetails.price?.replace('.', ',')}</span>
            </div>
            <div className="total-row final">
              <span>Total:</span>
              <span>R$ {planDetails.price?.replace('.', ',')}</span>
            </div>
          </div>
        </div>

        <div className="payment-methods">
          <div
            className={`payment-method ${paymentMethod === 'credit' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodChange('credit')}
          >
            <CreditCard size={20} />
            <span>Cartão de Crédito</span>
          </div>
          <div
            className={`payment-method ${paymentMethod === 'debit' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodChange('debit')}
          >
            <Wallet size={20} />
            <span>Cartão de Débito</span>
          </div>
          <div
            className={`payment-method ${paymentMethod === 'pix' ? 'selected' : ''}`}
            onClick={() => handlePaymentMethodChange('pix')}
          >
            <QrCode size={20} />
            <span>PIX</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="fullName">Nome Completo</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nome completo"
              required
              className={formErrors.fullName ? 'error' : ''}
            />
            {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Telefone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
                required
                className={formErrors.phone ? 'error' : ''}
              />
              {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="000.000.000-00"
                required
                className={formErrors.cpf ? 'error' : ''}
              />
              {formErrors.cpf && <span className="error-message">{formErrors.cpf}</span>}
            </div>
          </div>

          {paymentMethod === 'pix' ? (
            <PixPayment 
              value={parseFloat(planDetails.price || '0')} 
              onSuccess={handleSubmit} 
              formData={formData}
              formErrors={formErrors}
              validateForm={validateForm}
            />
          ) : (
            <>
              <CreditCardComponent
                cardNumber={formData.cardNumber}
                cardName={formData.cardName}
                expiry={formData.expiry}
                cvv={formData.cvv}
                isFlipped={isCardFlipped}
                paymentType={paymentMethod === 'credit' ? 'credit' : paymentMethod === 'debit' ? 'debit' : undefined}
              />

              <div className="form-group">
                <label htmlFor="cardNumber">Número do Cartão</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  className={formErrors.cardNumber ? 'error' : ''}
                />
                {formErrors.cardNumber && <span className="error-message">{formErrors.cardNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cardName">Nome no Cartão</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="Nome como está no cartão"
                  required
                  className={formErrors.cardName ? 'error' : ''}
                />
                {formErrors.cardName && <span className="error-message">{formErrors.cardName}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Data de Expiração</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                    className={formErrors.expiry ? 'error' : ''}
                  />
                  {formErrors.expiry && <span className="error-message">{formErrors.expiry}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    onFocus={handleCvvFocus}
                    onBlur={handleCvvBlur}
                    placeholder="123"
                    maxLength={3}
                    required
                    className={formErrors.cvv ? 'error' : ''}
                  />
                  {formErrors.cvv && <span className="error-message">{formErrors.cvv}</span>}
                </div>
              </div>
            </>
          )}

          <div className="security-info">
            <Lock size={16} />
            <span>Pagamento 100% Seguro</span>
          </div>

          {paymentMethod !== 'pix' && (
            <button
              type="submit"
              className="payment-button"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Confirmar Pagamento'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentPricing;