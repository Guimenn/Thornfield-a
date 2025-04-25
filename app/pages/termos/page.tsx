'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Package, CreditCard, Truck } from 'lucide-react';
import Footer from '../../Components/Footer/Footer';


export default function TermosPage() {
  return (
    <div className="min-h-screen bg-black text-white" >
      {/* Header */}
      <div className="relative mt-2 h-100 bg-gradient-to-b from-amber-900/30 to-black">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 md:px-8 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wider">TERMOS E CONDIÇÕES</h1>
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
              Bem-vindo à Thornfield Whisky. Estes Termos e Condições regem o uso do nosso site e a compra de produtos através dele. 
              Ao acessar nosso site e realizar compras, você concorda com estes termos. Por favor, leia-os atentamente.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              A Thornfield Whisky é uma empresa dedicada à venda de whiskies premium, comprometida com a excelência e a satisfação 
              dos nossos clientes. Nossos produtos são selecionados cuidadosamente para oferecer a melhor experiência em cada gole.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Ao utilizar nosso site, você reconhece que leu, compreendeu e concordou com todos os termos aqui estabelecidos. 
              Estes termos podem ser atualizados periodicamente, e é sua responsabilidade verificar regularmente as alterações.
            </p>
          </section>

          {/* Account Section */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8 flex items-center gap-3">
              <Lock className="text-amber-500" size={32} />
              Contas de Usuários
            </h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Para realizar compras em nosso site, você pode precisar criar uma conta. Você é responsável por manter a confidencialidade 
              de sua senha e por todas as atividades que ocorrem em sua conta. Você concorda em nos notificar imediatamente sobre 
              qualquer uso não autorizado de sua conta.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Ao criar uma conta, você deve fornecer informações precisas e completas. É proibido criar contas falsas ou usar 
              informações de terceiros sem autorização. Reservamo-nos o direito de encerrar contas que violem estes termos.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Você é responsável por todas as atividades realizadas em sua conta, incluindo compras e alterações de informações. 
              Recomendamos o uso de senhas fortes e a ativação da autenticação de dois fatores quando disponível.
            </p>
          </section>

          {/* Products Section */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8 flex items-center gap-3">
              <Package className="text-amber-500" size={32} />
              Produtos e Preços
            </h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Nos esforçamos para exibir com precisão as cores e imagens de nossos produtos. No entanto, não podemos garantir que a 
              exibição de qualquer cor em seu monitor seja precisa. Todos os preços estão sujeitos a alterações sem aviso prévio.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Todos os produtos são vendidos sujeitos à disponibilidade. Em caso de indisponibilidade após a confirmação do pedido, 
              entraremos em contato para oferecer alternativas ou reembolso. Os preços incluem todos os impostos aplicáveis, 
              exceto quando especificado de outra forma.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Reservamo-nos o direito de limitar a quantidade de produtos que podem ser comprados por pessoa, família ou grupo. 
              Estas restrições podem incluir pedidos feitos sob a mesma conta, mesmo endereço de entrega ou cartão de crédito.
            </p>
          </section>

          {/* Payment Section */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8 flex items-center gap-3">
              <CreditCard className="text-amber-500" size={32} />
              Pedidos e Pagamentos
            </h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Ao fazer um pedido, você oferece comprar o produto. Reservamo-nos o direito de aceitar ou recusar seu pedido. 
              Aceitamos várias formas de pagamento, conforme indicado em nosso site. Todos os pagamentos são processados de forma segura.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Aceitamos os seguintes métodos de pagamento: cartões de crédito (Visa, Mastercard, American Express), PIX, boleto bancário 
              e transferência bancária. Os pagamentos são processados por gateways de pagamento seguros e certificados.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Em caso de recusa de pagamento, seu pedido será cancelado automaticamente. Para pagamentos via boleto, o prazo de 
              compensação é de até 2 dias úteis. Para cartões de crédito, a confirmação é imediata após a aprovação da operadora.
            </p>
          </section>

          {/* Shipping Section */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8 flex items-center gap-3">
              <Truck className="text-amber-500" size={32} />
              Envio e Entrega
            </h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Enviamos para os locais especificados em nosso site. Os prazos de entrega são estimativas e não garantimos datas 
              específicas de entrega. O risco de perda e título dos produtos passa para você no momento da entrega.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Oferecemos diferentes opções de envio, incluindo entrega expressa e padrão. Os custos de envio são calculados com base 
              no peso, dimensões e local de entrega. Em compras acima de R$ 500,00, o frete é gratuito para todo o Brasil.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Após a postagem, você receberá um código de rastreamento para acompanhar seu pedido. Em caso de atraso na entrega, 
              entre em contato com nossa equipe de suporte para verificação do status. Não nos responsabilizamos por atrasos 
              causados por fatores externos, como greves ou problemas com transportadoras.
            </p>
          </section>

          {/* Return Policy */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8">Política de Devolução</h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Aceitamos devoluções de produtos não abertos dentro de 30 dias após a compra. Os produtos devem estar em sua 
              embalagem original e em condição de revenda. Entre em contato com nosso serviço de atendimento ao cliente para 
              iniciar uma devolução.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Para iniciar uma devolução, você deve entrar em contato conosco dentro do prazo de 30 dias após o recebimento do produto. 
              Após a aprovação da devolução, você receberá instruções detalhadas sobre como proceder. O reembolso será processado 
              no mesmo método de pagamento utilizado na compra.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Em caso de produtos danificados durante o transporte, você deve notificar nossa equipe em até 48 horas após o recebimento, 
              fornecendo fotos do dano e da embalagem. Após análise, providenciaremos a troca ou reembolso conforme o caso.
            </p>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-b from-black/80 to-black/50 p-10 rounded-xl border border-amber-900/40 shadow-lg">
            <h2 className="text-4xl font-light mb-8">Contato</h2>
            <p className="text-gray-300 leading-relaxed text-xl">
              Se você tiver alguma dúvida sobre estes Termos e Condições, entre em contato conosco pelo e-mail: 
              <a href="mailto:contato@thornfieldwhisky.com.br" className="text-amber-500 hover:text-amber-400">
                contato@thornfieldwhisky.com.br
              </a>
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Nossa equipe de atendimento ao cliente está disponível de segunda a sexta-feira, das 9h às 18h, exceto feriados. 
              Responderemos seu contato em até 48 horas úteis. Para questões urgentes, você também pode nos contatar pelo telefone 
              (11) 99999-9999.
            </p>
            <p className="text-gray-300 leading-relaxed text-xl mt-4">
              Para reclamações e sugestões, você também pode utilizar nosso canal de Ouvidoria, disponível 24 horas por dia, 
              7 dias por semana, através do e-mail ouvidoria@thornfieldwhisky.com.br.
            </p>
          </section>
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
}