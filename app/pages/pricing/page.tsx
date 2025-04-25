"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import React from "react";
import { plans } from "../../data/planos.json";
import { useRouter } from "next/navigation";
import Footer from "../../Components/Footer/Footer";
import { XCircle, CheckCircle, Users, Gift, Clock, Star, Award, Wine, GlassWater } from "lucide-react";
import "./pricing.css";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("annually");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  
  // Referência para o elemento de fundo com parallax
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Efeito para adicionar o evento de scroll para o parallax
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        // Ajusta a velocidade do parallax (quanto menor o divisor, mais intenso o efeito)
        const translateY = scrollPosition / 2.5;
        parallaxRef.current.style.transform = `scale(1.05) translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Limpa o evento quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check URL for success parameter
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "true") {
        setShowSuccessMessage(true);
        // Hide the message after 5 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      }

      // Check for existing subscription
      const subscription = localStorage.getItem("thornfield_subscription");
      if (subscription) {
        setCurrentSubscription(JSON.parse(subscription));
      }
    }
  }, []);

  // Function to handle navigation to payment page
  const handlePaymentNavigation = (plan, billing, price) => {
    // Verificar se o usuário está logado
    const user = localStorage.getItem('user');
    if (!user) {
      // Se não estiver logado, salvar a URL para redirecionamento após login
      const baseUrl = window.location.origin;
      const params = new URLSearchParams();
      params.append('plan', plan);
      params.append('billing', billing);
      params.append('price', price);
      params.append('type', 'subscription');
      
      const paymentUrl = `${baseUrl}/pages/payment-pricing?${params.toString()}`;
      console.log('Usuário não logado, salvando URL de retorno:', paymentUrl);
      localStorage.setItem('returnUrl', paymentUrl);
      // Redirecionar para a página de login
      router.push('/pages/Login');
      return;
    }
    
    // Verificar se o usuário já possui uma assinatura ativa
    const existingSubscription = localStorage.getItem('thornfield_subscription');
    if (existingSubscription) {
      const subscription = JSON.parse(existingSubscription);
      if (subscription.status === 'active') {
        // Mostrar modal de erro em vez de um alert simples
        setErrorMessage(`Você já possui uma assinatura ativa do plano ${subscription.plan}. Para assinar outro plano, cancele sua assinatura atual na página de perfil.`);
        setShowErrorModal(true);
        return;
      }
    }
    
    // Se estiver logado e não tiver assinatura ativa, redireciona para página de pagamento
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    params.append('plan', plan);
    params.append('billing', billing);
    params.append('price', price);
    params.append('type', 'subscription');
    
    const paymentUrl = `${baseUrl}/pages/payment-pricing?${params.toString()}`;
    console.log('URL de pagamento construída:', paymentUrl);
    
    router.push(paymentUrl);
  };

  // Função para fechar o modal e redirecionar para o perfil
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    router.push('/pages/perfil');
  };

  const planPatterns = [
    "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b45309' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ca8a04' fill-opacity='0.07'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23b45309' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C/svg%3E\")"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      {/* Hero Section com Parallax Aprimorado */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <div 
            ref={parallaxRef}
            className="absolute inset-0 transform scale-105 blur-[2px] parallax-bg"
            style={{
              backgroundImage: 'url("/contract.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'contrast(1.1) brightness(0.7)',
              transform: 'scale(1.05) translateY(0px)',
              transition: 'transform 0.5s ease-out'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black opacity-90"></div>
          <div className="absolute inset-0 bg-black/30 backdrop-filter backdrop-blur-[1px]"></div>
        </div>
        
        {/* Partículas decorativas */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-amber-400 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-amber-500 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-amber-300 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-amber-600 rounded-full animate-ping" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative mt-[100px]  z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 relative">
              <div className="inline-block">
              
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-500/80"></div>
              <span className="text-amber-400/90 text-sm tracking-[0.5em] uppercase font-light">Experiência Premium</span>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-500/80"></div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-serif tracking-wide text-white mb-8 leading-tight">
              <span className="block">Clube de</span>
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent font-light">Assinatura</span>
            </h1>
            
            <p className="text-white/80 text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
              Junte-se à comunidade exclusiva de apreciadores e desfrute de privilégios reservados para verdadeiros conhecedores do whisky single malt.
            </p>
            
            <div className="flex items-center justify-center space-x-6 mt-12">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const plansSection = document.getElementById('plans');
                  if (plansSection) {
                    // Armazena uma referência ao elemento antes do setTimeout
                    const button = e.currentTarget;
                    // Adiciona classe de animação ao botão
                    button.classList.add('animate-button-press');
                    
                    // Remove a classe após a animação terminar
                    setTimeout(() => {
                      button.classList.remove('animate-button-press');
                    }, 300);
                    
                    // Rolagem suave com efeito de easing
                    plansSection.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start'
                    });
                  }
                }}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-white font-medium border border-amber-700/30 shadow-lg shadow-amber-900/30 hover:shadow-amber-900/50 transition-all duration-300 hover:scale-105 transform active:scale-95 active:shadow-inner active:from-amber-700 active:to-amber-900 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-black relative overflow-hidden"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span className="relative z-10">Conheça os Planos</span>
                <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 rounded-full ripple-effect"></span>
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const benefitsSection = document.getElementById('benefits');
                  if (benefitsSection) {
                    // Armazena uma referência ao elemento antes do setTimeout
                    const button = e.currentTarget;
                    // Adiciona classe de animação ao botão
                    button.classList.add('animate-button-press');
                    
                    // Remove a classe após a animação terminar
                    setTimeout(() => {
                      button.classList.remove('animate-button-press');
                    }, 300);
                    
                    // Rolagem suave com efeito de easing
                    benefitsSection.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start'
                    });
                  }
                }}
                className="px-8 py-4 rounded-full bg-black/60 backdrop-blur-sm text-amber-400 font-medium border border-amber-700/20 hover:bg-black/80 hover:border-amber-700/40 transition-all duration-300 active:scale-95 active:bg-black/90 active:text-amber-300 active:border-amber-700/50 active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:ring-offset-2 focus:ring-offset-black relative overflow-hidden"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <span className="relative z-10">Vantagens Exclusivas</span>
                <span className="absolute inset-0 bg-amber-400/10 opacity-0 transition-opacity duration-300 rounded-full ripple-effect"></span>
              </button>
            </div>
            
            
          </div>
        </div>
      </div>
      
      {/* Nova seção de benefícios */}
      <section id="benefits" className="py-28 relative bg-black">
        <div className="absolute  inset-0 bg-[url('/pattern.png')] opacity-5"></div>
        <div className="container  mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="px-4 py-1 bg-amber-900/20 rounded-full border border-amber-600/20 text-amber-400 text-sm font-medium">
                POR QUE ESCOLHER THORNFIELD
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Vantagens Exclusivas</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Desfrute de uma experiência sem igual com benefícios cuidadosamente selecionados para verdadeiros apreciadores.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-amber-900/20 rounded-xl p-8 transition-all duration-300 hover:border-amber-700/40 group shadow-xl hover:shadow-amber-900/5">
              <div className="w-16 h-16 rounded-lg bg-amber-900/20 mb-6 flex items-center justify-center group-hover:bg-amber-900/30 transition-all duration-300">
                <GlassWater className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-amber-400 transition-colors">Degustações Exclusivas</h3>
              <p className="text-white/70 leading-relaxed">
                Acesso prioritário a degustações guiadas por mestres destiladores com os melhores rótulos do mercado.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-gray-900 to-black border border-amber-900/20 rounded-xl p-8 transition-all duration-300 hover:border-amber-700/40 group shadow-xl hover:shadow-amber-900/5">
              <div className="w-16 h-16 rounded-lg bg-amber-900/20 mb-6 flex items-center justify-center group-hover:bg-amber-900/30 transition-all duration-300">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-amber-400 transition-colors">Edições Limitadas</h3>
              <p className="text-white/70 leading-relaxed">
                Reserva garantida de garrafas raras e edições especiais antes do lançamento ao público geral.
              </p>
            </div>
            
            <div className="bg-gradient-to-b from-gray-900 to-black border border-amber-900/20 rounded-xl p-8 transition-all duration-300 hover:border-amber-700/40 group shadow-xl hover:shadow-amber-900/5">
              <div className="w-16 h-16 rounded-lg bg-amber-900/20 mb-6 flex items-center justify-center group-hover:bg-amber-900/30 transition-all duration-300">
                <Users className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-amber-400 transition-colors">Eventos Exclusivos</h3>
              <p className="text-white/70 leading-relaxed">
                Participação em eventos privativos com produtores, blenders e outros entusiastas da cultura do whisky.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seletor de Período Aprimorado */}
      <div className="relative py-24 bg-black">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-amber-500/80 text-sm tracking-widest uppercase mb-3 inline-block">Escolha seu plano</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Planos Pensados para Cada Perfil
            </h2>
            <p className="text-white/70 text-lg font-light max-w-2xl mx-auto">
              Oferecemos opções personalizadas que atendem desde os iniciantes até os mais experientes apreciadores de whisky.
            </p>
          </div>
          
          <div   className="bg-gradient-to-b from-gray-900 to-black border border-amber-900/30 rounded-xl p-8 max-w-2xl mx-auto backdrop-blur-md shadow-2xl">
            <p className="text-amber-400/90 text-base text-center mb-5 font-medium">Escolha a periodicidade que melhor se adapta ao seu estilo</p>
            <div className="flex items-center bg-black/60 p-2 rounded-xl border border-amber-900/20 shadow-inner">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`flex-1 px-8 py-4 rounded-lg text-base font-medium ${
                  billingPeriod === "monthly" 
                    ? "bg-gradient-to-r from-amber-700/40 to-amber-800/40 text-amber-300 shadow-md border border-amber-700/30" 
                    : "text-white/60 hover:text-white/90 hover:bg-amber-900/10"
                } transition-all duration-500`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod("annually")}
                className={`flex-1 px-8 py-4 rounded-lg text-base font-medium ${
                  billingPeriod === "annually" 
                    ? "bg-gradient-to-r from-amber-700/40 to-amber-800/40 text-amber-300 shadow-md border border-amber-700/30" 
                    : "text-white/60 hover:text-white/90 hover:bg-amber-900/10"
                } transition-all duration-500`}
              >
                <span className="flex items-center justify-center gap-2">
                  Anual
                  <span className="text-xs px-2 py-1 bg-amber-600/30 text-amber-300 rounded-full border border-amber-700/30">
                    20% OFF
                  </span>
                </span>
              </button>
            </div>
            
            <div  className="mt-6 text-center text-amber-300/70 text-sm">
              {billingPeriod === "annually" ? 
                "Economize com o pagamento anual e desfrute de benefícios exclusivos" : 
                "Flexibilidade para testar nossa experiência sem compromisso de longo prazo"}
              
            </div>
        
          </div>
        </div>
        <div id="plans"></div>
      </div >

      {/* Planos de Assinatura Aprimorados */}
      <section  className="py-20 bg-gradient-to-b from-black to-gray-950 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[url('/pattern.png')] bg-repeat opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`relative h-full flex flex-col group transform transition-all duration-500 hover:translate-y-[-8px] ${
                  index === 1 ? "md:scale-105 md:z-10" : ""
                }`}
              >
                {/* Fita de destaque para o plano Gold */}
                {index === 1 && (
                  <div className="absolute -top-5 left-0 right-0 mx-auto w-max z-10">
                    <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                      MAIS POPULAR
                    </div>
                  </div>
                )}
                
                <div 
                  className="overflow-hidden rounded-2xl shadow-2xl h-full flex flex-col border border-amber-800/20 group-hover:border-amber-700/30 transition-all duration-500"
                  style={{
                    backgroundImage: `${planPatterns[index]}, linear-gradient(to bottom, ${plan.gradient})`,
                  }}
                >
                  {/* Efeito de brilho superior */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/70 to-transparent"></div>
                  
                  {/* Elemento decorativo no canto */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0L100 0L100 100Z" fill="#b45309"/>
                    </svg>
                  </div>
                  
                  <div className="p-8 md:p-10 flex-1 flex flex-col bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-md">
                    {/* Header do Card */}
                    <div className="border-b border-amber-900/30 pb-8 mb-8">
                      {/* Icon & Name */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-xl border border-amber-700/30 bg-black/60 flex items-center justify-center shadow-lg group-hover:border-amber-600/50 transition-all duration-500 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/60"></div>
                          <Image
                            src={plan.icon}
                            alt={`${plan.name} icon`}
                            width={28}
                            height={28}
                            className="relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif tracking-wider text-white group-hover:text-amber-400 transition-colors duration-500">
                            {plan.name}
                          </h3>
                          <div className="h-px w-12 bg-amber-700/40 mt-2 group-hover:w-full transition-all duration-700"></div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-white/70 text-sm">
                        {plan.description}
                      </p>
                    </div>

                    {/* Conteúdo do Card */}
                    <div className="flex-1 flex flex-col">
                      {/* Price */}
                      <div className="mb-10 bg-gradient-to-b from-black/60 to-black/20 p-6 rounded-xl border border-amber-900/20 group-hover:border-amber-900/30 transition-all duration-500 shadow-inner">
                        <div className="flex items-baseline justify-center">
                          <span className="text-sm text-white/40 mr-1">R$</span>
                          <span className="text-5xl font-light text-white group-hover:text-amber-300 transition-colors duration-500">
                            {billingPeriod === "monthly" 
                              ? plan.monthlyPrice.toFixed(2).replace(".", ",") 
                              : plan.annualPrice.toFixed(2).replace(".", ",")}
                          </span>
                          <span className="text-white/40 text-sm ml-2">
                            {billingPeriod === "monthly" ? "/mês" : "/ano"}
                          </span>
                        </div>
                        {billingPeriod === "annually" && (
                          <div className="text-center mt-3">
                            <p className="text-amber-500/80 text-sm">
                              <span className="inline-block px-2 py-0.5 bg-amber-900/30 rounded-md border border-amber-700/20 text-amber-400/90">
                                Economia de R$ {((plan.monthlyPrice * 12) - plan.annualPrice).toFixed(2).replace(".", ",")}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Benefits */}
                      <div className="flex-1 mb-10">
                        <ul className="space-y-4">
                          {plan.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm group/item">
                              <span className="text-amber-500 mt-0.5 opacity-80 flex-shrink-0">
                                <CheckCircle size={18} />
                              </span>
                              <span className={`text-white/80 group-hover/item:text-amber-100/90 transition duration-300 ${i >= 5 ? "font-medium" : ""}`}>
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Botão CTA */}
                    <div className="mt-auto">
                      <button 
                        onClick={() => {
                          const price = billingPeriod === "monthly" ? plan.monthlyPrice.toFixed(2) : plan.annualPrice.toFixed(2);
                          handlePaymentNavigation(plan.name, billingPeriod, price);
                        }}
                        className="w-full py-4 px-6 rounded-xl group-hover:rounded-lg transition-all duration-500 
                          border border-amber-700/30 bg-gradient-to-r from-amber-800/60 to-amber-700/40 
                          text-amber-200 hover:text-white font-medium tracking-wider uppercase shadow-lg 
                          group-hover:bg-gradient-to-r group-hover:from-amber-700 group-hover:to-amber-600 
                          group-hover:shadow-amber-900/30"
                      >
                        <span className="group-hover:tracking-widest transition-all duration-300">{plan.cta}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Seção de garantia e confiança */}
          <div className="max-w-3xl mx-auto mt-20 text-center">
            <div className="bg-gradient-to-b from-black/80 to-gray-900/40 border border-amber-900/20 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
              <div className="w-16 h-16 rounded-full bg-amber-900/20 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-white mb-4">Garantia de Satisfação</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-2">
                Se você não estiver satisfeito com sua experiência, oferecemos garantia de reembolso nos primeiros 15 dias após a adesão.
              </p>
              <p className="text-amber-400/80 text-xs font-medium">
                Sem compromissos, cancele a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </section>
    
      
      {/* Divisor decorativo */}
      <div className="relative py-12 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-700/30"></div>
            <div className="w-14 h-14 rounded-full border border-amber-700/30 bg-black flex items-center justify-center">
              <Image
                src="/icons-whisky/tumbler-glass-svgrepo-com.svg"
                alt="Divisor"
                width={24}
                height={24}
                className="opacity-70"
              />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-700/30"></div>
          </div>
        </div>
      </div>

      {/* FAQ Section Aprimorada */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950 relative">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-5"></div>
        
        {/* Elemento decorativo */}
        <div className="absolute -left-20 bottom-0 w-80 h-80 opacity-10">
          <Image
            src="/icons-whisky/gold-bar-svgrepo-com.svg"
            alt="Decorative element"
            width={300}
            height={300}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1 bg-amber-900/20 rounded-full border border-amber-600/20 text-amber-400 text-sm font-medium">
              TIRE SUAS DÚVIDAS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Perguntas Frequentes</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Tudo o que você precisa saber sobre nossa assinatura premium
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem 
              question="Como funcionam as degustações exclusivas?" 
              answer="Os membros recebem convites para degustações guiadas em nossos espaços exclusivos. Você será acompanhado por um mestre destilador que conduzirá a experiência sensorial completa, explicando as nuances e histórias por trás de cada whisky selecionado."
            />
            <FaqItem 
              question="Posso cancelar minha assinatura a qualquer momento?" 
              answer="Sim, você pode cancelar sua assinatura a qualquer momento. Para assinaturas anuais, o valor é proporcional ao período utilizado, com uma pequena taxa administrativa. Membros Master Reserve possuem condições especiais detalhadas no contrato."
            />
            <FaqItem 
              question="Como funciona o acesso a edições limitadas?" 
              answer="Membros Gold e Master Reserve recebem acesso prioritário às edições limitadas, com direito de compra antecipada. Membros Master Reserve ainda contam com reserva garantida das edições mais raras e exclusivas da Thornfield."
            />
            <FaqItem 
              question="A visita à destilaria inclui transporte?" 
              answer="As visitas incluem o tour guiado e degustação especial. Membros Gold recebem desconto em hospedagem parceira. Membros Master Reserve contam com traslado local e assessoria para organização completa da viagem, incluindo recomendações exclusivas."
            />
            <FaqItem 
              question="Como são selecionados os whiskies das degustações?" 
              answer="Nossa equipe de especialistas seleciona cuidadosamente os rótulos baseando-se em qualidade, raridade e perfil sensorial. Buscamos oferecer uma experiência diversificada que combina clássicos consagrados e novidades surpreendentes do mercado."
            />
            <FaqItem 
              question="Posso presentear alguém com uma assinatura?" 
              answer="Sim, oferecemos a opção de presente para todos os nossos planos. Você receberá um certificado digital e um kit de boas-vindas físico será enviado ao presenteado. Entre em contato com nosso atendimento para mais detalhes."
            />
          </div>
        </div>
      </section>

      {/* Experiências Exclusivas - Seção Aprimorada */}
      <section className="py-28 bg-black relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'url("/pricing/festival.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(6px) saturate(120%)'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1 bg-amber-900/20 rounded-full border border-amber-600/20 text-amber-400 text-sm font-medium">
              VIVÊNCIAS ÚNICAS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Experiências Memoráveis
            </h2>
            <p className="text-white/70 text-lg font-light max-w-2xl mx-auto">
              Descubra experiências cuidadosamente elaboradas que transcendem a simples degustação,
              criando memórias inesquecíveis em sua jornada no universo do whisky.
            </p>
          </div>

          {/* Gallery - Redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
            {/* Main Featured Experience */}
            <div className="md:col-span-8">
              <div className="h-[500px] relative rounded-2xl overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                <Image 
                  src="/pricing/cidade.png" 
                  fill 
                  alt="Eventos Sazonais" 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-10 z-20 max-w-xl">
                  <div className="inline-block mb-4 px-3 py-1 bg-amber-900/30 backdrop-blur-md rounded-full border border-amber-600/30 text-amber-300 text-xs">
                    EXCLUSIVO MASTER RESERVE
                  </div>
                  <h3 className="text-3xl font-serif text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">Festival Anual de Destilarias</h3>
                  <p className="text-white/80 mb-6">Uma experiência imersiva de três dias com os melhores master blenders do mundo, degustações raras e jantar de gala com harmonização premium.</p>
                  <a href="#plans" className="inline-block px-6 py-3 rounded-full bg-amber-600/80 text-white font-medium hover:bg-amber-600 transition-all duration-300 shadow-lg shadow-amber-900/20">
                    Conheça o Plano
                  </a>
                </div>
              </div>
            </div>
            
            {/* Side Experiences */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="h-[240px] relative rounded-2xl overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                <Image 
                  src="/pricing/cidade.png" 
                  fill 
                  alt="Highland Tours" 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <div className="inline-block mb-2 px-2 py-0.5 bg-amber-900/30 backdrop-blur-md rounded-full border border-amber-600/30 text-amber-300 text-xs">
                    GOLD & MASTER
                  </div>
                  <h3 className="text-xl font-serif text-white group-hover:text-amber-300 transition-colors duration-300">Tours nas Highlands</h3>
                  <p className="text-white/70 text-sm">Visite as destilarias mais emblemáticas da Escócia com guias especializados.</p>
                </div>
              </div>
              
              <div className="h-[240px] relative rounded-2xl overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                <Image 
                  src="/pricing/degustacao.png" 
                  fill 
                  alt="Barris Personalizados" 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <div className="inline-block mb-2 px-2 py-0.5 bg-amber-900/30 backdrop-blur-md rounded-full border border-amber-600/30 text-amber-300 text-xs">
                    TODOS OS PLANOS
                  </div>
                  <h3 className="text-xl font-serif text-white group-hover:text-amber-300 transition-colors duration-300">Degustações Guiadas</h3>
                  <p className="text-white/70 text-sm">Sessões exclusivas com nossos especialistas e convidados renomados.</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <Footer />
    

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-900 to-green-800 backdrop-blur-md text-white px-8 py-4 rounded-xl shadow-2xl z-50 border border-green-700/50 animate-fade-in flex items-center">
          <CheckCircle className="h-6 w-6 text-green-300 mr-3" />
          <div>
            <h4 className="font-medium">Assinatura Confirmada!</h4>
            <p className="text-green-200 text-sm">Bem-vindo à experiência exclusiva Thornfield</p>
          </div>
        </div>
      )}

      {/* Modal de erro para assinatura já existente */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-amber-700/30 rounded-2xl max-w-md w-full p-8 shadow-[0_20px_60px_-15px_rgba(255,191,0,0.3)] animate-fade-in-up">
            <div className="flex items-start mb-6">
              <div className="bg-red-900/30 p-3 rounded-full mr-4 flex-shrink-0">
                <XCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white mb-2">Assinatura Ativa</h3>
                <p className="text-amber-100/70 text-sm leading-relaxed">{errorMessage}</p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleCloseErrorModal}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg font-medium hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-900/20"
              >
                Ir para meu perfil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente FaqItem Aprimorado
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-amber-900/20 rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:border-amber-900/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-8 py-5 flex justify-between items-center bg-gradient-to-r from-gray-900 to-black hover:from-amber-900/10 hover:to-black transition-all duration-300"
      >
        <span className="text-white font-medium">{question}</span>
        <span className={`transform transition-transform duration-500 bg-amber-900/20 rounded-full p-1 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="text-amber-400" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 py-6 bg-black/40 backdrop-blur-sm text-white/80 leading-relaxed border-t border-amber-900/10">
          {answer}
        </div>
      </div>
    </div>
  );
}
