'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Cookie, Eye } from 'lucide-react';
import Footer from '../../Components/Footer/Footer';


export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative h-100 bg-gradient-to-b from-amber-900/30 to-black">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-8 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wider">POLÍTICA DE PRIVACIDADE</h1>
            <p className="text-amber-500 text-2xl">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto space-y-16"
        >
          {/* Introduction */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8 flex items-center gap-3">
              <Shield className="text-amber-500" size={32} />
              Introdução
            </h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Na Thornfield Whisky, levamos a privacidade dos nossos clientes muito a sério. Esta política descreve como 
              coletamos, usamos e protegemos suas informações pessoais quando você visita nosso site ou faz compras conosco.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Esta política de privacidade foi elaborada em conformidade com a Lei Geral de Proteção de Dados (LGPD) e outras 
              legislações aplicáveis. Ela explica como tratamos seus dados pessoais e quais são seus direitos em relação a eles.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Ao utilizar nossos serviços, você concorda com a coleta e uso de informações de acordo com esta política. 
              Recomendamos que você leia atentamente este documento para entender como suas informações são tratadas.
            </p>
          </section>

          {/* Data Collection */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8 flex items-center gap-3">
              <Database className="text-amber-500" size={32} />
              Coleta de Dados
            </h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail, endereço de entrega e 
              informações de pagamento. Também coletamos automaticamente certas informações sobre seu dispositivo e uso do site.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              As informações coletadas incluem, mas não se limitam a: dados de cadastro, histórico de compras, preferências de 
              produtos, endereço IP, tipo de navegador, páginas visitadas, tempo de permanência no site e interações com nosso 
              conteúdo.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Utilizamos cookies e tecnologias similares para coletar informações sobre sua navegação. Estas informações nos 
              ajudam a melhorar sua experiência, personalizar conteúdo e oferecer produtos relevantes aos seus interesses.
            </p>
          </section>

          {/* Data Usage */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8 flex items-center gap-3">
              <Eye className="text-amber-500" size={32} />
              Uso dos Dados
            </h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Utilizamos suas informações para processar pedidos, melhorar nossos serviços, enviar comunicações de marketing 
              (com seu consentimento) e cumprir obrigações legais. Nunca vendemos suas informações para terceiros.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Seus dados são utilizados para: processar suas compras, enviar atualizações sobre pedidos, melhorar nossos produtos 
              e serviços, personalizar sua experiência no site, enviar newsletters (com seu consentimento) e cumprir obrigações 
              legais e regulatórias.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Podemos compartilhar suas informações com prestadores de serviços que nos auxiliam em nossas operações, como 
              processadores de pagamento e empresas de logística. Estes parceiros são obrigados a manter a confidencialidade 
              dos dados e utilizá-los apenas para os fins específicos contratados.
            </p>
          </section>

          {/* Cookies */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8 flex items-center gap-3">
              <Cookie className="text-amber-500" size={32} />
              Cookies
            </h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Utilizamos cookies e tecnologias similares para melhorar sua experiência no site, analisar o tráfego e personalizar 
              conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Os cookies que utilizamos incluem: cookies essenciais (necessários para o funcionamento do site), cookies de 
              desempenho (para análise de uso), cookies de funcionalidade (para personalização) e cookies de publicidade 
              (para exibir anúncios relevantes).
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Você pode gerenciar suas preferências de cookies através das configurações do seu navegador. No entanto, a 
              desativação de certos cookies pode limitar algumas funcionalidades do site. Para mais informações sobre como 
              gerenciar cookies, consulte a seção de ajuda do seu navegador.
            </p>
          </section>

          {/* Data Protection */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8 flex items-center gap-3">
              <Lock className="text-amber-500" size={32} />
              Proteção de Dados
            </h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra 
              acesso não autorizado, alteração, divulgação ou destruição.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Nossas medidas de segurança incluem: criptografia de dados, firewalls, controle de acesso, monitoramento de 
              sistemas, backups regulares e treinamento de equipe. Realizamos auditorias periódicas para garantir a 
              eficácia de nossas medidas de segurança.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Em caso de incidente de segurança que possa afetar seus dados pessoais, notificaremos você e as autoridades 
              competentes conforme exigido pela legislação aplicável. Tomaremos todas as medidas necessárias para mitigar 
              os riscos e prevenir futuras ocorrências.
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8">Seus Direitos</h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Também pode optar por não receber 
              comunicações de marketing. Para exercer esses direitos, entre em contato conosco.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              De acordo com a LGPD, você tem direito a: acesso aos seus dados, correção de dados incompletos ou inexatos, 
              anonimização ou eliminação de dados desnecessários, portabilidade dos dados, revogação do consentimento e 
              oposição ao tratamento de dados.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Para exercer seus direitos, você pode entrar em contato conosco através dos canais indicados na seção de 
              contato. Responderemos sua solicitação no prazo máximo de 15 dias, conforme exigido pela legislação. 
              Em alguns casos, podemos solicitar informações adicionais para confirmar sua identidade.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8">Contato</h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Para questões sobre privacidade, entre em contato conosco pelo e-mail: 
              <a href="mailto:privacidade@thornfieldwhisky.com.br" className="text-amber-500 hover:text-amber-400">
                privacidade@thornfieldwhisky.com.br
              </a>
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Nossa equipe de proteção de dados está disponível de segunda a sexta-feira, das 9h às 18h, para esclarecer 
              dúvidas sobre esta política e auxiliar no exercício de seus direitos. Para questões urgentes, você pode 
              contatar nosso Encarregado de Proteção de Dados (DPO) pelo telefone (11) 99999-9999.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Para reclamações relacionadas ao tratamento de dados pessoais, você também pode entrar em contato com a 
              Autoridade Nacional de Proteção de Dados (ANPD) através do site www.gov.br/anpd ou pelo e-mail 
              ouvidoria@anpd.gov.br.
            </p>
          </section>
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
} 