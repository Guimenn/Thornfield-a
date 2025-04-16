"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("annually");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);

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
  const goToPayment = (plan, billing, price) => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();
    params.append('plan', plan);
    params.append('billing', billing);
    params.append('price', price);
    params.append('type', 'subscription');
    
    // Try different URL patterns based on the project structure
    const paymentUrl = `${baseUrl}/pages/payment?${params.toString()}`;
    console.log('Navigating to:', paymentUrl);
    window.location.href = paymentUrl;
  };

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
      icon: "/icons-whisky/tumbler-glass-svgrepo-com.svg"
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

  const corporatePlans = [
    {
      name: "BUSINESS",
      description: "Para empresas que buscam experiências premium para clientes e parceiros.",
      price: "Sob consulta",
      benefits: [
        "Kit de boas-vindas para diretoria",
        "Eventos corporativos customizados",
        "Presentes corporativos exclusivos",
        "Degustações in-company",
        "Pacotes para incentivos de equipe"
      ],
      icon: "/icons-whisky/tumbler-glass-svgrepo-com.svg"
    },
    {
      name: "SOMMELIER",
      description: "Formação profissional para estabelecimentos e profissionais da área.",
      price: "Sob consulta",
      benefits: [
        "Treinamento profissional para staff",
        "Consultoria para carta de bebidas",
        "Suporte na compra de estoque",
        "Certificação oficial Thornfield",
        "Eventos temáticos no estabelecimento"
      ],
      icon: "/icons-whisky/cherry-svgrepo-com.svg"
    }
  ];

  const planPatterns = [
    "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b45309' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ca8a04' fill-opacity='0.07'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    "url(\"data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23b45309' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C/svg%3E\")"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      {/* Hero Section com Parallax */}
      <div className="relative h-[90vh] w-full flex items-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/banner.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
             
            </div>
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500"></div>
              <span className="text-amber-500/90 text-sm tracking-[0.5em] font-light">MEMBRESIA</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif tracking-wide text-white mb-8">
              EXPERIÊNCIA THORNFIELD
            </h1>
            <p className="text-white/70 text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
              Junte-se ao nosso exclusivo círculo de apreciadores e desfrute de privilégios reservados apenas para membros da família Thornfield.
            </p>
            <div className="flex justify-center">
              <div className="h-px w-24 bg-amber-700/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de Período */}
      <div className="relative bg-transparent">
        <div className="container mx-auto px-6 -mt-24">
          <div className="bg-black/70 backdrop-blur-lg border border-amber-900/20 rounded-lg p-6 max-w-lg mx-auto flex flex-col items-center shadow-2xl">
            <p className="text-amber-500/80 text-sm tracking-widest uppercase mb-5">Selecione o período de cobrança</p>
            <div className="flex items-center bg-black/60 p-1.5 rounded-md border border-amber-900/20 shadow-inner w-full max-w-sm">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`flex-1 px-6 py-3 rounded text-sm font-medium ${
                  billingPeriod === "monthly" 
                    ? "bg-amber-900/30 text-amber-400 shadow-md" 
                    : "text-white/60 hover:text-white/90"
                } transition-all duration-300`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod("annually")}
                className={`flex-1 px-6 py-3 rounded text-sm font-medium ${
                  billingPeriod === "annually" 
                    ? "bg-amber-900/30 text-amber-400 shadow-md" 
                    : "text-white/60 hover:text-white/90"
                } transition-all duration-300`}
              >
                <span className="flex items-center justify-center gap-2">
                  Anual
                  <span className="text-xs px-2 py-0.5 bg-amber-900/40 text-amber-400/90 rounded-full">
                    20% OFF
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Planos de Assinatura */}
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className="relative rounded-lg overflow-hidden group h-full flex flex-col shadow-2xl"
                style={{
                  backgroundImage: `${planPatterns[index]}, linear-gradient(to bottom, ${plan.gradient})`,
                }}
              >
                {/* Borda superior decorativa */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-amber-700/0 via-amber-500/70 to-amber-700/0"></div>
                
                {/* Elemento decorativo no canto */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0L100 0L100 100Z" fill="#b45309"/>
                  </svg>
                </div>
                
                <div className="p-8 flex-1 flex flex-col border border-amber-900/20 backdrop-blur-md bg-black/60">
                  {/* Header do Card */}
                  <div className="border-b border-amber-900/20 pb-6 mb-6">
                    {/* Icon & Name */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full border border-amber-700/30 bg-black/50 flex items-center justify-center shadow-lg">
                        <Image
                          src={plan.icon}
                          alt={`${plan.name} icon`}
                          width={24}
                          height={24}
                          className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif tracking-wider text-white group-hover:text-amber-400 transition-colors duration-300">
                          {plan.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 text-sm">
                      {plan.description}
                    </p>
                  </div>

                  {/* Conteúdo do Card */}
                  <div className="flex-1 flex flex-col">
                    {/* Price */}
                    <div className="mb-8 bg-black/40 p-4 rounded border border-amber-900/10">
                      <div className="flex items-baseline justify-center">
                        <span className="text-xs text-white/40 mr-1">R$</span>
                        <span className="text-4xl font-light text-white group-hover:text-amber-400 transition-colors duration-300">
                          {billingPeriod === "monthly" 
                            ? plan.monthlyPrice.toFixed(2).replace(".", ",") 
                            : plan.annualPrice.toFixed(2).replace(".", ",")}
                        </span>
                        <span className="text-white/40 text-xs ml-2">
                          {billingPeriod === "monthly" ? "/mês" : "/ano"}
                        </span>
                      </div>
                      {billingPeriod === "annually" && (
                        <p className="text-amber-600/80 text-xs mt-1 text-center">
                          Economia de R$ {((plan.monthlyPrice * 12) - plan.annualPrice).toFixed(2).replace(".", ",")}
                        </p>
                      )}
                    </div>

                    {/* Benefits */}
                    <div className="flex-1">
                      <ul className="space-y-3 mb-8">
                        {plan.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <span className="text-amber-600 mt-0.5 opacity-80">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                              </svg>
                            </span>
                            <span className={`text-white/70 ${i >= 5 ? "font-medium" : ""}`}>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button - All aligned at bottom */}
                  <div className="mt-auto">
                    <button 
                      onClick={() => {
                        const price = billingPeriod === "monthly" ? plan.monthlyPrice.toFixed(2) : plan.annualPrice.toFixed(2);
                        window.location.href = `/pages/payment?isSubscription=true&plan=${encodeURIComponent(plan.name)}&billing=${billingPeriod}&price=${encodeURIComponent(price)}`;
                      }}
                      className="w-full py-3 px-4 rounded border border-amber-700/30 bg-black/50 text-amber-400 hover:bg-amber-900/20 transition-all duration-300 shadow-lg group-hover:border-amber-600 text-sm tracking-widest uppercase"
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisor decorativo */}
      <div className="relative py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-700/30"></div>
            <div className="w-12 h-12 rounded-full border border-amber-700/30 bg-black/30 flex items-center justify-center">
              <Image
                src="/icons-whisky/tumbler-glass-svgrepo-com.svg"
                alt="Divisor"
                width={20}
                height={20}
                className="opacity-60"
              />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-700/30"></div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-white mb-3">Perguntas Frequentes</h2>
            <div className="h-px w-24 bg-amber-700/30 mx-auto"></div>
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
          </div>
        </div>
      </section>

      {/* Experiências Exclusivas - Nova Seção */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'url("/whiskys-fundo/18.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(5px) saturate(120%)'
            }}
          ></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-amber-500"></div>
              <span className="text-amber-500/90 text-sm tracking-[0.5em] font-light">EXPERIÊNCIAS</span>
              <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-amber-500"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              Momentos Inesquecíveis
            </h2>
            <p className="text-white/70 text-lg font-light max-w-2xl mx-auto">
              Desfrute de experiências cuidadosamente elaboradas que vão além da degustação,
              criando memórias que enriquecem sua jornada no mundo do whisky.
            </p>
          </div>

          {/* Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {/* First Column */}
            <div className="flex flex-col gap-6">
              <div className="h-[240px] relative rounded-lg overflow-hidden group shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                <Image 
                  src="/whiskys-fundo/10.png" 
                  fill 
                  alt="Highland Tours" 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-white text-xl font-serif mb-2">Highland Tours</h3>
                  <span className="text-amber-400/80 text-sm">Exclusivo para membros</span>
                </div>
              </div>
              <div className="h-[360px] relative rounded-lg overflow-hidden group shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                <Image 
                  src="/whiskys-fundo/12.png" 
                  fill 
                  alt="Degustações Privativas" 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-white text-xl font-serif mb-2">Degustações Privativas</h3>
                  <span className="text-amber-400/80 text-sm">Para membros Gold e Master</span>
                </div>
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col gap-6">
              <div className="h-[320px] relative rounded-lg overflow-hidden group shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                <Image 
                  src="/whiskys-fundo/14.png" 
                  fill 
                  alt="Barris Personalizados" 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-white text-xl font-serif mb-2">Barris Personalizados</h3>
                  <span className="text-amber-400/80 text-sm">Exclusivo para Master Reserve</span>
                </div>
              </div>
              <div className="h-[280px] relative rounded-lg overflow-hidden group shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                <Image 
                  src="/whiskys-fundo/17.png" 
                  fill 
                  alt="Master Classes" 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-white text-xl font-serif mb-2">Master Classes</h3>
                  <span className="text-amber-400/80 text-sm">Todos os membros</span>
                </div>
              </div>
            </div>

            {/* Third & Fourth Columns */}
            <div className="col-span-2 flex flex-col gap-6">
              <div className="h-[400px] relative rounded-lg overflow-hidden group shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                <Image 
                  src="/whiskys-fundo/15.png" 
                  fill 
                  alt="Eventos Sazonais" 
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                  <h3 className="text-white text-2xl font-serif mb-2">Eventos Sazonais</h3>
                  <span className="text-amber-400/80 text-sm">Celebrações exclusivas para membros</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-[200px] relative rounded-lg overflow-hidden group shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                  <Image 
                    src="/whiskys-fundo/16.png" 
                    fill 
                    alt="Jantares Harmonizados" 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h3 className="text-white text-xl font-serif mb-2">Jantares Harmonizados</h3>
                    <span className="text-amber-400/80 text-sm">Experiência gastronômica</span>
                  </div>
                </div>
                <div className="h-[200px] relative rounded-lg overflow-hidden group shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                  <Image 
                    src="/whiskys-fundo/13.png" 
                    fill 
                    alt="Coleções Raras" 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h3 className="text-white text-xl font-serif mb-2">Coleções Raras</h3>
                    <span className="text-amber-400/80 text-sm">Acesso antecipado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="inline-block backdrop-blur-md bg-black/40 border border-amber-900/20 rounded-lg p-8 shadow-2xl max-w-2xl">
              <h3 className="text-2xl font-serif text-white mb-4">Torne-se Parte de Algo Extraordinário</h3>
              <p className="text-white/70 text-base mb-6">
                Assine agora e tenha acesso a um mundo de experiências exclusivas, criadas para quem 
                valoriza momentos autênticos e o verdadeiro espírito do whisky escocês.
              </p>
              <button className="px-8 py-3 bg-amber-900/80 text-amber-100 rounded hover:bg-amber-800/50 border border-amber-700/30 shadow-lg">
                Assinar Agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed "Drink Responsibly" Disclaimer */}
      <div className="fixed bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white/60 text-xs p-2 rounded-md border border-amber-900/20 z-30">
        Beba com moderação. Proibido para menores de 18 anos.
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm text-white/60 text-xs p-2 rounded-md border border-amber-900/20 z-30">
          Assinatura realizada com sucesso!
        </div>
      )}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-amber-900/20 rounded-md overflow-hidden shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-6 py-4 flex justify-between items-center bg-black/40 hover:bg-black/60 transition-colors duration-200"
      >
        <span className="text-white font-medium">{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-amber-600" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 bg-black/20 text-white/70 text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
