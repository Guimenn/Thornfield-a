"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { collection, addDoc, getDocs, query, where, getFirestore } from "firebase/firestore";
import { auth } from "../../firebase";

// Tipos
type FeedbackType = {
  type: "success" | "error" | null;
  message: string | null;
};

type Interest = "Single Malt" | "Bourbon" | "Blends" | "Colecionismo" | "Investimento" | "Harmonização";

// Lista de interesses disponíveis
const INTERESTS: Interest[] = [
  "Single Malt",
  "Bourbon",
  "Blends",
  "Colecionismo",
  "Investimento",
  "Harmonização"
];

// Componente principal
export default function Newsletter() {
  // Estados
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType>({
    type: null,
    message: null
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Firebase
  const db = getFirestore();

  // Verificar se o usuário está logado e preencher os campos
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        // Preencher campos com dados do usuário
        setEmail(user.email || "");
        if (user.displayName) {
          setName(user.displayName);
        }

        // Verificar se o usuário já está inscrito
        try {
          const newsletterRef = collection(db, "newsletter_subscriptions");
          const q = query(newsletterRef, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            setIsSubscribed(true);
          }
        } catch (error) {
          console.error("Erro ao verificar inscrição:", error);
        }
      }
    });

    return () => unsubscribe();
  }, [db]);

  // Handler para alteração de interesses
  const handleInterestChange = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Validação do formulário
  const validateForm = (): boolean => {
    if (!email) {
      showFeedback("error", "Por favor, informe seu email.");
      return false;
    }

    if (!termsAccepted) {
      showFeedback("error", "Você precisa aceitar os termos para prosseguir.");
      return false;
    }

    if (interests.length === 0) {
      showFeedback("error", "Por favor, selecione pelo menos um interesse.");
      return false;
    }

    return true;
  };

  // Exibir feedback
  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setShowModal(true);
  };

  // Fechar modal
  const closeModal = () => setShowModal(false);

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, interests }),
      });
      const result = await response.json();
      if (!response.ok) {
        showFeedback('error', result.message || 'Erro ao enviar dados');
      } else {
        showFeedback('success', result.message);
        setName('');
        setEmail('');
        setInterests([]);
        setTermsAccepted(false);
      }
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      showFeedback('error', 'Erro ao enviar solicitação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0A0501] py-28 relative overflow-hidden">
      <section className="py-16 relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <BackgroundElements />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Coluna de texto */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="md:col-span-1"
              >
                <NewsletterInfo />
              </motion.div>

              {/* Coluna do formulário */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="md:col-span-2"
              >
                {isSubscribed ? (
                  <SubscriptionConfirmed email={email} />
                ) : (
                  <SubscriptionForm
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    interests={interests}
                    handleInterestChange={handleInterestChange}
                    termsAccepted={termsAccepted}
                    setTermsAccepted={setTermsAccepted}
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de feedback */}
      {showModal && (
        <FeedbackModal
          feedback={feedback}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

// Componentes auxiliares
const BackgroundElements = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-black"></div>
    <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-amber-900/10 transform skew-x-12 -translate-x-20"></div>
    <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/blog/texture-dark.png')]"></div>
    <div className="absolute top-20 right-20 w-40 h-40 rounded-full border border-amber-700/20 opacity-60"></div>
    <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full border border-amber-700/20 opacity-40"></div>
  </div>
);

const NewsletterInfo = () => (
  <>
    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
      <span className="text-amber-500">Inscreva-se</span> em nossa Newsletter
    </h2>
    <p className="text-gray-400 mb-6">
      Receba insights exclusivos, dicas de degustação e convites para eventos diretamente em seu email.
    </p>

    <div className="hidden md:block mt-8">
      <FeatureItem
        icon={
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        }
        title="Cobertura Mensal"
        description="Receba novidades mensalmente sobre seus temas favoritos."
      />

      <FeatureItem
        icon={
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        }
        title="Conteúdo Personalizado"
        description="Selecionado com base nos interesses que você escolher."
        className="mt-6"
      />
    </div>
  </>
);

const FeatureItem = ({
  icon,
  title,
  description,
  className = ""
}: {
  icon: React.ReactNode,
  title: string,
  description: string,
  className?: string
}) => (
  <div className={`flex items-center ${className}`}>
    <div className="mr-4">
      <div className="relative w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
          {icon}
        </svg>
      </div>
    </div>
    <div>
      <h5 className="text-base font-medium mb-1">{title}</h5>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

const SubscriptionConfirmed = ({ email }: { email: string }) => (
  <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-8 border border-gray-800 shadow-xl text-center">
    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-green-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </div>
    <h3 className="text-2xl font-serif font-bold mb-2">Você já está inscrito!</h3>
    <p className="text-gray-400 mb-4">
      Obrigado por fazer parte da nossa comunidade. Enviaremos mensalmente para {email} novidades sobre os temas selecionados.
    </p>
    <p className="text-amber-500 text-sm">
      Sua primeira newsletter chegará em breve!
    </p>
  </div>
);

const SubscriptionForm = ({
  name,
  setName,
  email,
  setEmail,
  interests,
  handleInterestChange,
  termsAccepted,
  setTermsAccepted,
  handleSubmit,
  isSubmitting
}: {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  interests: string[];
  handleInterestChange: (interest: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
}) => {
  // Estado para controlar o modal de feedback
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Função para mostrar feedback estilizado
  const showStyledFeedback = (success: boolean, message: string) => {
    setFeedbackMessage(message);
    setIsSuccess(success);
    setShowFeedbackModal(true);
  };

  // Fechar o modal e recarregar se for sucesso
  const handleCloseModal = () => {
    setShowFeedbackModal(false);

    // Se for sucesso, recarrega a página após fechar
    if (isSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  // Função para cadastrar usando modal de feedback
  const cadastrarNewsletter = async () => {
    // Validação básica
    if (!email) {
      showStyledFeedback(false, "Por favor, informe seu email.");
      return;
    }

    if (!termsAccepted) {
      showStyledFeedback(false, "Você precisa aceitar os termos para prosseguir.");
      return;
    }

    if (interests.length === 0) {
      showStyledFeedback(false, "Por favor, selecione pelo menos um interesse.");
      return;
    }

    // Ativar o estado de carregamento
    setIsLoading(true);

    try {
      // Verificar se email já existe e cadastrar
      const db = getFirestore();
      const newsletterRef = collection(db, "newsletter_subscriptions");
      const q = query(newsletterRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      // Verificar se já existe
      if (!querySnapshot.empty) {
        // Email já cadastrado
        showStyledFeedback(false, `Este email ${email} já está inscrito em nossa newsletter.`);
        setIsLoading(false);
        return;
      }

      // Email não cadastrado, vamos adicionar
      await addDoc(collection(db, "newsletter_subscriptions"), {
        name,
        email,
        interests,
        createdAt: new Date(),
        lastEmailSent: null,
        status: "active"
      });

      // Enviar email para a API do Google Script
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, interests }),
        });

        if (!response.ok) {
          console.error('Erro ao enviar email para Google Script');
          showStyledFeedback(false, "Não foi possível enviar a confirmação para seu email. Mas sua inscrição foi registrada com sucesso!");
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Resposta da API:", data);
      } catch (error) {
        console.error('Erro na API:', error);
        showStyledFeedback(false, "Não foi possível enviar a confirmação para seu email. Mas sua inscrição foi registrada com sucesso!");
        setIsLoading(false);
        return;
      }

      // Feedback de sucesso
      showStyledFeedback(true, "Inscrição realizada com sucesso! Enviamos um email de confirmação para " + email + ". Por favor, verifique também sua pasta de spam.");

    } catch (error) {
      console.error("Erro:", error);
      showStyledFeedback(false, "Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente.");
    } finally {
      // Desativar o estado de carregamento independente do resultado
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FormField
          id="name"
          label="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome completo"
          required
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu.email@exemplo.com"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="interests" className="block text-sm font-medium text-gray-400 mb-1">
          Interesses <span className="text-amber-500">*</span> <span className="text-gray-500 text-xs">(Escolha pelo menos um)</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
          {INTERESTS.map((interest) => (
            <div key={interest} className="flex items-center">
              <input
                type="checkbox"
                id={`interest-${interest}`}
                name="interests"
                value={interest}
                checked={interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-amber-500 text-amber-600"
              />
              <label htmlFor={`interest-${interest}`} className="ml-2 text-sm text-gray-300">
                {interest}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-amber-500 text-amber-600"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="text-gray-400">
            Concordo em receber comunicações mensais da Thornfield. Consulte nossa <a href="#" className="text-amber-500 hover:underline">Política de Privacidade</a>.
          </label>
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-gradient-to-r from-amber-700 to-amber-500 text-white font-medium py-3 px-6 rounded-lg hover:from-amber-600 hover:to-amber-400 transition-all duration-300 shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        onClick={cadastrarNewsletter}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span>Processando</span>
            <div className="ml-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </>
        ) : (
          <>
            <span>Assinar Newsletter Mensal</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Nossa newsletter é enviada mensalmente e você pode cancelar sua inscrição a qualquer momento.
      </p>

      {/* Modal de feedback dentro do componente */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div
            className={`max-w-md w-full rounded-xl shadow-2xl p-6 ${isSuccess ? 'bg-gradient-to-br from-amber-900/90 to-amber-800/90' : 'bg-gradient-to-br from-red-900/90 to-red-800/90'
              } backdrop-blur-md border ${isSuccess ? 'border-amber-600/50' : 'border-red-700/50'
              } transform transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {isSuccess ? (
                  <div className="w-12 h-12 rounded-full bg-amber-600/30 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-amber-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-red-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {isSuccess ? 'Sucesso!' : 'Atenção'}
                  </h3>
                  <p className={`text-sm ${isSuccess ? 'text-amber-400' : 'text-red-300'}`}>
                    {isSuccess ? 'Bem-vindo à nossa newsletter' : 'Verifique as informações'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-lg text-gray-200 mb-6">
              {feedbackMessage}
            </p>

            <button
              onClick={handleCloseModal}
              className={`w-full py-3 px-4 rounded-lg ${isSuccess
                  ? 'bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white'
                  : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white'
                } transition-colors font-medium flex items-center justify-center`}
            >
              {isSuccess ? 'Entendi' : 'Tentar novamente'}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                {isSuccess
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                }
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FormField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required: boolean;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const FeedbackModal = ({
  feedback,
  closeModal
}: {
  feedback: FeedbackType;
  closeModal: () => void;
}) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div
      className={`max-w-md w-full rounded-xl shadow-2xl p-6 ${feedback.type === 'success' ? 'bg-green-900/90' : 'bg-red-900/90'
        } backdrop-blur-md border ${feedback.type === 'success' ? 'border-green-700' : 'border-red-700'
        } transform transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          {feedback.type === 'success' ? (
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
          )}
          <h3 className="text-xl font-bold">
            {feedback.type === 'success' ? 'Sucesso!' : 'Atenção!'}
          </h3>
        </div>
        <button
          onClick={feedback.type === 'success' ? () => {
            closeModal();
            window.location.reload();
          } : closeModal}
          className="text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <p className={`${feedback.type === 'success' ? 'text-green-200' : 'text-red-200'} mb-4`}>
        {feedback.message}
      </p>

      <button
        onClick={feedback.type === 'success' ? () => {
          closeModal();
          window.location.reload();
        } : closeModal}
        className={`w-full py-2 px-4 rounded-lg ${feedback.type === 'success'
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
          } transition-colors font-medium`}
      >
        {feedback.type === 'success' ? 'Entendi' : 'Tentar novamente'}
      </button>
    </div>
  </div>
);
