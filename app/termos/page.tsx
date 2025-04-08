'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function TermosPage() {
  return (
    <div className="bg-black pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-light mb-8 text-center tracking-wider">TERMOS E CONDIÇÕES</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">1. Introdução</h2>
            <p>Bem-vindo à Thornfield Whisky. Estes Termos e Condições regem o uso do nosso site e a compra de produtos através dele. Ao acessar nosso site e realizar compras, você concorda com estes termos. Por favor, leia-os atentamente.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">2. Uso do Site</h2>
            <p>Você concorda em usar nosso site apenas para fins legais e de maneira que não infrinja os direitos de terceiros. Você não deve usar o site de qualquer maneira que possa danificar, desabilitar, sobrecarregar ou comprometer nossos sistemas.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">3. Contas de Usuário</h2>
            <p>Para realizar compras em nosso site, você pode precisar criar uma conta. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrem em sua conta. Você concorda em nos notificar imediatamente sobre qualquer uso não autorizado de sua conta.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">4. Produtos e Preços</h2>
            <p>Nos esforçamos para exibir com precisão as cores e imagens de nossos produtos. No entanto, não podemos garantir que a exibição de qualquer cor em seu monitor seja precisa. Todos os preços estão sujeitos a alterações sem aviso prévio.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">5. Pedidos e Pagamentos</h2>
            <p>Ao fazer um pedido, você oferece comprar o produto. Reservamo-nos o direito de aceitar ou recusar seu pedido. Aceitamos várias formas de pagamento, conforme indicado em nosso site. Todos os pagamentos são processados de forma segura.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">6. Envio e Entrega</h2>
            <p>Enviamos para os locais especificados em nosso site. Os prazos de entrega são estimativas e não garantimos datas específicas de entrega. O risco de perda e título dos produtos passa para você no momento da entrega.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">7. Política de Devolução</h2>
            <p>Aceitamos devoluções de produtos não abertos dentro de 30 dias após a compra. Os produtos devem estar em sua embalagem original e em condição de revenda. Entre em contato com nosso serviço de atendimento ao cliente para iniciar uma devolução.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">8. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site, incluindo textos, gráficos, logotipos, ícones e imagens, é propriedade da Thornfield Whisky e está protegido por leis de direitos autorais. Você não pode usar, reproduzir ou distribuir qualquer conteúdo sem nossa permissão prévia por escrito.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">9. Limitação de Responsabilidade</h2>
            <p>Em nenhuma circunstância seremos responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes resultantes do uso ou incapacidade de usar nossos produtos ou site.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">10. Alterações nos Termos</h2>
            <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. Seu uso continuado do site após tais alterações constitui sua aceitação dos novos termos.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">11. Lei Aplicável</h2>
            <p>Estes termos são regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.</p>
            
            <h2 className="text-xl font-medium mt-8 mb-4">12. Contato</h2>
            <p>Se você tiver alguma dúvida sobre estes Termos e Condições, entre em contato conosco pelo e-mail: contato@thornfieldwhisky.com.br</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}