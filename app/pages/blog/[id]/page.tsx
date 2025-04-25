'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Bookmark, ThumbsUp, MessageSquare } from 'lucide-react';
import Footer from '../../../Components/Footer/Footer';

// Tipo para os artigos
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  content?: string; // Conteúdo completo do artigo
}

export default function BlogPostPage() {
    const params = useParams();
    const postId = params.id;
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
  
    useEffect(() => {
      // Função para buscar os dados do artigo
      const fetchPostData = () => {
        setIsLoading(true);
      
      const featuredPosts = [
        {
          id: '1',
          title: 'O Renascimento do Whisky Japonês: Tradição e Inovação',
          excerpt: 'Como destilarias japonesas estão redefinindo o mercado global de whisky com técnicas ancestrais e abordagens inovadoras.',
          image: '/blog/artigo1.png',
          date: '10 Nov 2023',
          author: 'Akira Tanaka',
          category: 'Destilarias',
          readTime: '8 min de leitura',
          content: `
            <p>O whisky japonês tem experimentado um renascimento notável nas últimas décadas, combinando tradições ancestrais com abordagens inovadoras que estão redefinindo o mercado global de destilados premium.</p>
            
            <h2>As Raízes Históricas</h2>
            <p>A história do whisky japonês começou em 1923, quando Masataka Taketsuru retornou da Escócia com conhecimentos detalhados sobre a produção de whisky. Junto com Shinjiro Torii, ele fundou a primeira destilaria do Japão, a Yamazaki. Taketsuru posteriormente estabeleceu sua própria destilaria, a Nikka, em 1934.</p>
            
            <p>Durante décadas, o whisky japonês permaneceu relativamente desconhecido fora do país. No entanto, tudo mudou em 2001, quando o Nikka Yoichi 10 anos ganhou o "Best of the Best" no Whisky Magazine's awards, seguido por várias outras premiações internacionais que colocaram o Japão definitivamente no mapa mundial do whisky.</p>
            
            <h2>Técnicas Tradicionais e Inovação</h2>
            <p>O que torna o whisky japonês único é a combinação de respeito pela tradição escocesa com uma abordagem distintamente japonesa. As destilarias japonesas são conhecidas por:</p>
            
            <ul>
              <li>Mizunara: O uso do carvalho japonês (mizunara) para maturação, que adiciona notas complexas de sândalo, coco e especiarias orientais.</li>
              <li>Diversidade de estilos: Ao contrário da Escócia, onde as destilarias frequentemente trocam barris entre si, as japonesas precisam produzir diversos estilos de destilados dentro da mesma instalação.</li>
              <li>Precisão meticulosa: A atenção aos detalhes, desde a fermentação até o engarrafamento, reflete a filosofia japonesa de kaizen (melhoria contínua).</li>
            </ul>
            
            <h2>O Boom Global e a Crise de Estoque</h2>
            <p>O sucesso internacional criou um desafio inesperado: a escassez. Como o whisky requer anos de maturação, as destilarias japonesas não estavam preparadas para a explosão na demanda global. Isso levou à descontinuação de várias expressões com indicação de idade e ao aumento significativo dos preços.</p>
            
            <p>Em resposta, as destilarias estão expandindo suas operações e explorando novas abordagens, como o uso de técnicas de maturação acelerada e o lançamento de expressões sem indicação de idade (NAS - No Age Statement) que permitem maior flexibilidade no blending.</p>
            
            <h2>Novas Destilarias e o Futuro</h2>
            <p>Nos últimos cinco anos, mais de uma dúzia de novas destilarias foram inauguradas no Japão, incluindo Akkeshi, Shizuoka e Kanosuke. Estas estão trazendo abordagens ainda mais inovadoras, como o uso de leveduras locais, técnicas de fermentação inspiradas na produção de sake, e experimentação com microclimas únicos das diversas regiões japonesas.</p>
            
            <p>O futuro do whisky japonês parece promissor, com um equilíbrio entre honrar as tradições estabelecidas e abraçar a inovação que sempre caracterizou a abordagem japonesa à destilação.</p>
          `
        },
        {
          id: '2',
          title: 'O Segredo dos Barris de Bourbon: Uma Jornada pelo Kentucky',
          excerpt: 'Exploramos as florestas e tanoarias que produzem os barris responsáveis pelos sabores icônicos do bourbon americano.',
          image: '/blog/artigo2.png',
          date: '28 Out 2023',
          author: 'William Johnson',
          category: 'História',
          readTime: '12 min de leitura',
          content: `
            <p>Os barris de carvalho americano são fundamentais para o caráter distintivo do bourbon, contribuindo com até 70% do sabor final da bebida. Nossa jornada pelo Kentucky revela os segredos por trás destes recipientes essenciais.</p>
            
            <h2>As Florestas de Carvalho Branco Americano</h2>
            <p>O carvalho branco americano (Quercus alba) cresce abundantemente nas florestas do leste dos Estados Unidos, com concentrações significativas no Missouri, Kentucky e Tennessee. Estas árvores podem levar até 70 anos para atingir a maturidade ideal para a produção de barris.</p>
            
            <p>O que torna este carvalho especial é sua combinação única de compostos: lignina (que produz a vanilina durante a tostagem), hemiceluloses (que caramelizam para criar notas de caramelo e toffee) e taninos (que adicionam estrutura e adstringência).</p>
            
            <h2>A Arte da Tanoaria</h2>
            <p>Visitamos a Independent Stave Company em Lebanon, Kentucky, uma das maiores tanoarias do mundo. Aqui, o processo de transformação da madeira em barris combina técnicas centenárias com tecnologia moderna:</p>
            
            <ul>
              <li>Corte e Secagem: As tábuas são cortadas e depois secas ao ar livre por 6-36 meses, um processo que reduz taninos indesejáveis e aumenta os açúcares naturais da madeira.</li>
              <li>Moldagem: As tábuas são dobradas usando vapor e calor, sem adesivos ou pregos - apenas a pressão de aros de metal mantém tudo no lugar.</li>
              <li>Tostagem e Carbonização: Os barris são tostados e depois carbonizados (ou "queimados"), criando uma camada de carvão que filtra impurezas e adiciona complexidade ao destilado.</li>
            </ul>
            
            <h2>O Impacto no Bourbon</h2>
            <p>Por lei, o bourbon deve ser envelhecido em barris novos de carvalho carbonizados. Esta exigência, estabelecida após a Proibição, tinha originalmente o objetivo de impulsionar a indústria de tanoaria, mas acabou definindo o perfil característico do bourbon.</p>
            
            <p>Os diferentes níveis de carbonização (de #1 leve a #4 intenso) produzem perfis distintos: carbonizações mais leves preservam mais açúcares da madeira, enquanto as mais intensas criam notas mais profundas de defumado e especiarias.</p>
            
            <h2>Sustentabilidade e Inovação</h2>
            <p>Com o aumento da demanda por bourbon, a sustentabilidade tornou-se uma preocupação. Visitamos a Brown-Forman Cooperage, onde programas de reflorestamento garantem o futuro do carvalho americano. Além disso, novas técnicas de tostagem estão sendo desenvolvidas para extrair perfis de sabor específicos.</p>
            
            <p>Após seu uso para bourbon, os barris ganham uma segunda vida no envelhecimento de outros destilados, como rum, tequila e, notavelmente, whisky escocês - criando um ciclo global de sabores interconectados.</p>
          `
        },
        // Adicione mais artigos conforme necessário...
        {
          id: '3',
          title: 'Além do Paladar: A Ciência das Notas de Degustação',
          excerpt: 'Um mergulho profundo na neurociência e química por trás da percepção de sabores ao degustar whiskies premium.',
          image: '/blog/artigo3.png',
          date: '15 Out 2023',
          author: 'Elena Rodriguez',
          category: 'Degustação',
          readTime: '10 min de leitura',
          content: `
            <p>A experiência de degustar um whisky premium vai muito além do simples prazer - é um complexo fenômeno neurológico e químico que envolve todos os nossos sentidos de maneiras surpreendentes.</p>
            
            <h2>A Química no Copo</h2>
            <p>Um único copo de whisky contém mais de 300 compostos voláteis diferentes, cada um contribuindo para o perfil sensorial geral. Os principais grupos incluem:</p>
            
            <ul>
              <li>Ésteres: Responsáveis por notas frutadas e florais</li>
              <li>Aldeídos: Contribuem com aromas de malte e cereais</li>
              <li>Fenóis: Criam notas defumadas e medicinais</li>
              <li>Lactonas: Oferecem notas de coco e madeira</li>
            </ul>
            
            <p>A interação entre estes compostos cria uma "impressão digital" química única para cada whisky, que nosso cérebro interpreta como um perfil de sabor distinto.</p>
            
            <h2>Neurociência da Degustação</h2>
            <p>Quando degustamos whisky, não estamos apenas usando nossa língua. Na verdade, cerca de 80% do que percebemos como "sabor" vem do olfato. Os receptores olfativos no nariz podem detectar moléculas em concentrações extremamente baixas - partes por trilhão em alguns casos.</p>
            
            <p>Estudos de neuroimagem mostram que a degustação ativa múltiplas regiões cerebrais simultaneamente:</p>
            
            <ul>
              <li>O bulbo olfatório processa os aromas</li>
              <li>O córtex gustativo interpreta os sabores básicos (doce, salgado, ácido, amargo, umami)</li>
              <li>O sistema límbico conecta essas sensações a memórias e emoções</li>
              <li>O córtex pré-frontal integra todas essas informações em uma experiência coerente</li>
            </ul>
            
            <h2>O Papel da Memória e Expectativa</h2>
            <p>Pesquisas recentes em psicologia sensorial revelam que nossas expectativas e experiências prévias influenciam significativamente como percebemos os sabores. Em experimentos controlados, os mesmos whiskies foram percebidos de maneira diferente quando apresentados com informações distintas sobre sua origem ou preço.</p>
            
            <p>Este fenômeno, conhecido como "priming sensorial", explica por que as notas de degustação podem variar tanto entre diferentes pessoas - estamos todos trazendo nossas próprias referências e memórias para a experiência.</p>
            
            <h2>Técnicas Avançadas de Degustação</h2>
            <p>Baseados nestes conhecimentos científicos, sommeliers e master blenders profissionais desenvolveram técnicas específicas para maximizar a percepção sensorial:</p>
            
            <ul>
              <li>A adição controlada de água (algumas gotas) pode "abrir" o whisky, liberando compostos aromáticos adicionais</li>
              <li>A temperatura ideal (entre 15-18°C) otimiza a volatilidade dos compostos aromáticos</li>
              <li>O formato do copo concentra os aromas e direciona-os para o nariz</li>
              <li>Técnicas de respiração específicas maximizam a captação de moléculas aromáticas</li>
            </ul>
            
            <p>Compreender a ciência por trás da degustação não apenas enriquece a experiência, mas também nos permite apreciar a extraordinária complexidade que torna cada whisky uma obra-prima sensorial única.</p>
          `
        },
        {
            id: '4',
            title: 'Os Segredos dos Master Blenders: A Arte da Consistência',
            excerpt: 'Entrevistas exclusivas revelando as técnicas, desafios e filosofias por trás da criação de blends consistentes ao longo de décadas.',
            image: '/blog/artigo4.png',
            date: '20 Mar 2023',
            author: 'George Anderson',
            category: 'Entrevistas',
            readTime: '16 min de leitura',
            content: `
              <h2>O Que Torna os Master Blenders Essenciais para a Indústria do Whisky?</h2>
              <p>Os Master Blenders são verdadeiros artistas da indústria do whisky, responsáveis por garantir que cada garrafa de whisky tenha um sabor inconfundível e consistente. Desde as primeiras destilarias, esse papel tem sido fundamental para o sucesso de marcas históricas. Porém, o que realmente diferencia um bom Master Blender?</p>
              
              <h3>Técnicas de Blending: A Ciência e a Arte</h3>
              <p>Com o domínio de uma combinação de ciência e arte, os Master Blenders utilizam uma habilidade única para misturar diferentes tipos de whisky, com base em suas idiossincrasias de sabor, cor e aroma. Eles devem ser capazes de prever como os diferentes elementos interagem ao longo do tempo e, ao mesmo tempo, manter a qualidade consistente de um blend. Este é um equilíbrio difícil de alcançar, mas quando feito corretamente, o resultado é uma experiência sensorial memorável para os consumidores.</p>
          
              <h3>Desafios do Master Blender</h3>
              <p>Mesmo com o conhecimento técnico, o trabalho de um Master Blender não é isento de desafios. Por exemplo, a variação no clima e a diferenciação das madeiras nos barris de envelhecimento pode alterar o perfil de sabor do whisky, o que significa que o Master Blender deve ser capaz de compensar essas mudanças para manter a consistência da marca. Ao longo de décadas, o processo de adaptação e perfeição continua, e é isso que faz de um Master Blender um verdadeiro mestre.</p>
              
              <h3>Entrevista com um Master Blender</h3>
              <p>Conversei com <strong>John Walker</strong>, Master Blender de uma das mais tradicionais destilarias da Escócia, para entender mais sobre seu trabalho e as filosofias que guiam seu processo criativo. "É uma arte que exige paciência e uma conexão profunda com o produto", disse ele. "Nós não apenas misturamos whisky; nós contamos histórias com ele, criamos algo atemporal."</p>
              
              <h3>Conclusão</h3>
              <p>A arte do blending de whisky continua sendo um pilar fundamental da indústria, e as pessoas que se dedicam a essa prática não são apenas mestres da mistura, mas também curadores de experiências sensoriais que perduram no tempo. Os Master Blenders são, sem dúvida, os guardiões da consistência que mantém o whisky como uma das bebidas mais amadas ao redor do mundo.</p>
            `
          },
          {
            id: '5',
            title: 'Harmonizações Perfeitas: Whisky e Sobremesas Artesanais',
            excerpt: 'Chefs renomados revelam combinações surpreendentes de whiskies com sobremesas que elevam ambas as experiências.',
            image: '/blog/artigo5.png',
            date: '24 Set 2023',
            author: 'Pierre Dubois',
            category: 'Gastronomia',
            readTime: '7 min de leitura',
            content: `
              <h2>O Mundo das Harmonizações entre Whisky e Sobremesas</h2>
              <p>A combinação de whisky e sobremesas é uma arte que vai além da simples escolha de sabores. Quando feita corretamente, ela cria uma experiência sensorial sinérgica que eleva tanto a bebida quanto a sobremesa. Chefs renomados e sommeliers de whisky têm se dedicado a explorar e a criar essas combinações, oferecendo novas possibilidades para os entusiastas da gastronomia.</p>
          
              <h3>Como Escolher a Sobremesa Ideal para Cada Tipo de Whisky?</h3>
              <p>Primeiramente, o tipo de whisky escolhido vai influenciar a harmonização. Os whiskies de malte único, por exemplo, tendem a ter sabores mais ricos e complexos, enquanto os blends podem ser mais suaves e acessíveis. Sobremesas como tortas de maçã ou chocolate amargo são frequentemente associadas a whiskies mais intensos, enquanto sobremesas mais leves, como pudins de baunilha, combinam bem com whiskies mais suaves.</p>
          
              <h3>Combinações Surpreendentes</h3>
              <p>Entre as combinações mais surpreendentes que chefs renomados sugerem, está a mistura de um <em>Highland Single Malt</em> com uma torta de limão e merengue. O whisky encorpado complementa a acidez e a suavidade da sobremesa, criando um contraste que não só surpreende, mas também encanta o paladar.</p>
          
              <h3>Entrevista com Pierre Dubois</h3>
              <p>Entrei em contato com o chef <strong>Pierre Dubois</strong>, especialista em harmonização de bebidas e pratos, para entender melhor como ele cria suas combinações. "É uma dança entre os sabores", comentou ele. "O whisky e a sobremesa devem se respeitar e, ao mesmo tempo, criar algo novo no paladar. Não é apenas sobre doce e amargo, é sobre a textura, a intensidade e a evolução dos sabores ao longo do tempo."</p>
          
              <h3>Conclusão</h3>
              <p>As harmonizações entre whisky e sobremesas artesanais são uma forma deliciosa de explorar a complexidade de ambos os mundos. Com a orientação certa, qualquer sobremesa pode ser transformada em uma experiência única, elevando o prazer de degustar whisky para um novo nível.</p>
            `
          },
          {
            id: '6',
            title: 'Roteiro nas Highlands: As Destilarias Mais Remotas da Escócia',
            excerpt: 'Um guia completo para explorar destilarias históricas escondidas nas paisagens deslumbrantes das Highlands escocesas.',
            image: '/blog/artigo6.png',
            date: '12 Set 2023',
            author: 'Fiona MacLeod',
            category: 'Viagens',
            readTime: '11 min de leitura',
            content: `
              <h2>Explorando as Destilarias Remotas das Highlands Escocesas</h2>
              <p>As Highlands escocesas são o lar de algumas das destilarias mais remotas e históricas do mundo, escondidas entre montanhas imponentes e vales profundos. Embora não sejam tão conhecidas quanto as grandes marcas, essas destilarias oferecem uma visão fascinante sobre a tradição e o método de produção artesanal de whisky. Para os viajantes que buscam uma experiência mais íntima, um roteiro pelas Highlands é a jornada perfeita.</p>
          
              <h3>Destilarias Imperdíveis nas Highlands</h3>
              <p>Entre as destilarias mais notáveis, está a <strong>Destilaria Glenfarclas</strong>, uma das mais antigas da região, fundada em 1836. Sua localização isolada em Ballindalloch oferece uma imersão completa nas práticas de destilação tradicionais, com tours que percorrem os antigos barris e fermentadores, além de uma degustação de suas mais raras expressões.</p>
          
              <h3>A Beleza das Highlands</h3>
              <p>O cenário que rodeia essas destilarias é de uma beleza arrebatadora. As paisagens das Highlands escocesas, com suas montanhas verdes, lagos cristalinos e vastas áreas selvagens, fazem parte da experiência. Cada visita a uma destilaria é uma imersão não só no mundo do whisky, mas também na cultura e história da Escócia.</p>
          
              <h3>Entrevista com Fiona MacLeod</h3>
              <p>Em uma conversa com <strong>Fiona MacLeod</strong>, especialista em turismo nas Highlands e autora de guias de viagem sobre a região, ela compartilhou o que torna essa jornada tão especial: "É um mergulho no coração da Escócia. A combinação das destilarias e a natureza selvagem cria uma experiência que vai muito além da bebida. É um retorno às raízes, uma experiência de simplicidade e autenticidade."</p>
          
              <h3>Conclusão</h3>
              <p>Visitar as destilarias remotas das Highlands escocesas é mais do que uma viagem; é uma conexão profunda com a tradição, a história e a beleza natural da Escócia. Para quem ama whisky e aventura, este é um destino imperdível.</p>
            `
          },
          {
            id: '7',
            title: 'Whisky nas Páginas: A Influência da Bebida na Literatura Mundial',
            excerpt: 'De Hemingway a Ian Rankin, como o whisky moldou personagens icônicos e narrativas na literatura ao longo dos séculos.',
            image: '/blog/artigo7.png',
            date: '30 Ago 2023',
            author: 'Thomas Wright',
            category: 'Cultura',
            readTime: '9 min de leitura',
            content: `
              <h2>O Whisky como Personagem na Literatura</h2>
              <p>O whisky sempre teve uma presença marcante na literatura mundial, ultrapassando o simples papel de bebida para se tornar um símbolo de complexidade emocional, reflexão e conflito. Através dos séculos, escritores renomados usaram o whisky como ferramenta narrativa, incorporando-o aos seus enredos e personagens de forma profunda e significativa. Seja como um símbolo de vícios ou momentos de clareza, o whisky é, muitas vezes, um reflexo das lutas internas dos personagens.</p>
          
              <h3>Ernest Hemingway: O Whisky como Terapia</h3>
              <p>Ernest Hemingway, um dos maiores nomes da literatura do século XX, é frequentemente associado ao whisky. A bebida não era apenas um combustível para os seus dias agitados, mas também desempenhava um papel central em suas histórias. Hemingway via o whisky como uma forma de terapia e, nas suas narrativas, ele o usava como um modo de lidar com a dor emocional e os dilemas existenciais.</p>
              <p>Em sua obra-prima, <em>"O Sol Também Se Levanta"</em>, os personagens são frequentemente encontrados em bares, discutindo suas vidas e suas perdas enquanto degustam copos de whisky. Para Hemingway, a bebida tinha o poder de revelar as vulnerabilidades humanas e permitir uma reflexão mais profunda sobre a vida e a morte.</p>
          
              <h3>Ian Rankin e o Whisky no Crime</h3>
              <p>Na literatura policial contemporânea, o whisky tem sido igualmente utilizado para caracterizar figuras robustas e complexas. Ian Rankin, autor da série <em>John Rebus</em>, é um exemplo perfeito de como o whisky se encaixa nas narrativas de mistério. O detetive Rebus, muitas vezes encontrado em pubs escoceses, é um bebedor de whisky que usa a bebida tanto para se reconectar com seus pensamentos quanto para escapar de sua própria realidade sombria.</p>
              <p>A bebida se torna uma metáfora para as camadas mais sombrias de Rebus, refletindo sua luta interna e a busca por justiça em um mundo corrompido. O whisky não é apenas uma escolha de bebida; é um veículo para explorar as profundezas psicológicas do personagem.</p>
          
              <h3>O Whisky como Símbolo Literário</h3>
              <p>Ao longo dos anos, o whisky também foi retratado como um símbolo literário. Em muitas obras, ele representa a decadência, o isolamento ou até mesmo a redenção. Ele aparece como um companheiro constante de escritores solitários e personagens que se encontram em momentos de reflexão ou crises pessoais.</p>
              <p>Autores como Charles Bukowski e F. Scott Fitzgerald, em <em>"O Grande Gatsby"</em>, utilizam o whisky como um símbolo de excessos e da busca incessante por sentido em um mundo repleto de vazios existenciais.</p>
          
              <h3>Entrevista com Thomas Wright</h3>
              <p>Thomas Wright, um renomado crítico literário, oferece uma perspectiva intrigante sobre o papel do whisky na literatura. Ele afirma: "O whisky, em muitas dessas narrativas, funciona como um espelho para os conflitos internos dos personagens. Ele não é apenas uma bebida; é um reflexo do estado psicológico e emocional do indivíduo, uma chave para decifrar as camadas mais profundas das histórias."</p>
          
              <h3>Conclusão</h3>
              <p>O whisky é mais do que apenas um acessório nas páginas da literatura. Ao longo dos anos, ele evoluiu para um símbolo literário de complexidade emocional, conflito e introspecção. Através de autores como Hemingway e Rankin, vemos como a bebida pode ser uma extensão dos próprios personagens, refletindo suas falhas, desejos e reflexões mais profundas. O whisky continua a ser uma presença constante nas páginas dos livros, representando tanto o vício quanto a busca por redenção.</p>
            `
          },
          {
            id: '8',
            title: 'NFTs e Whisky: O Futuro do Colecionismo e Investimento',
            excerpt: 'Como a tecnologia blockchain está revolucionando o mercado de whiskies raros e transformando a forma como investidores abordam a categoria.',
            image: '/blog/artigo8.png',
            date: '15 Ago 2023',
            author: 'Marcus Chen',
            category: 'Tendências',
            readTime: '8 min de leitura',
            content: `
              <h2>O Mercado de Whisky e o Surgimento dos NFTs</h2>
              <p>O mercado de whisky raros sempre foi um território de colecionadores dedicados, onde as garrafas de edição limitada e os whiskies envelhecidos se tornam tesouros valiosos. Mas com o surgimento das tecnologias de blockchain e NFTs, uma revolução está ocorrendo nesse mercado. Os NFTs, ou Tokens Não Fungíveis, são uma nova forma de garantir a autenticidade e o valor de itens colecionáveis, incluindo garrafas de whisky. Neste artigo, exploramos como a tecnologia está transformando o mercado de whisky e como ela pode moldar o futuro do colecionismo e do investimento.</p>
          
              <h3>O Potencial dos NFTs no Mercado de Whisky</h3>
              <p>Os NFTs representam um registro digital único, garantido pela tecnologia blockchain, que pode ser vinculado a itens físicos, como garrafas de whisky. Este token digital assegura que a garrafa é autêntica e rastreável, proporcionando uma camada extra de segurança para os colecionadores e investidores.</p>
              <p>Isso é particularmente relevante no mercado de whiskies raros, onde a escassez e a autenticidade são fatores essenciais que influenciam o preço de uma garrafa. Ao associar um NFT a uma garrafa rara, o proprietário pode garantir que seu investimento seja protegido contra falsificações e que a garrafa permaneça valiosa ao longo do tempo.</p>
          
              <h3>Investindo em Whisky Através de NFTs</h3>
              <p>Plataformas de NFTs estão permitindo que investidores adquiram direitos sobre whiskies raros, como se comprassem ações de uma empresa. Ao comprar um NFT vinculado a uma garrafa de whisky, o investidor passa a ter um "direito digital" sobre essa garrafa, o que pode ser comercializado no mercado de NFTs.</p>
              <p>Além disso, o mercado de NFTs permite que os colecionadores negociem garrafas de whisky sem a necessidade de transações físicas. Isso oferece maior liquidez e acessibilidade ao mercado, permitindo que investidores em todo o mundo tenham acesso a garrafas de whisky exclusivas e difíceis de encontrar em suas localidades.</p>
          
              <h3>O Caso de Sucesso: "Whisky Barrel" NFT</h3>
              <p>Um exemplo notável da aplicação de NFTs no mercado de whisky é o projeto "Whisky Barrel", onde colecionadores podem comprar NFTs que representam ações em barris de whisky em envelhecimento. Esse modelo de negócio inovador não só permite que os investidores compartilhem o custo da compra de barris caros, mas também os beneficia com a valorização do whisky à medida que ele amadurece.</p>
              <p>Além disso, o uso de NFTs facilita o rastreamento da propriedade da garrafa de whisky, garantindo que cada transação seja segura e transparente. O "Whisky Barrel" foi um sucesso em termos de engajamento e vendas, demonstrando o enorme potencial de crescimento desse mercado.</p>
          
              <h3>Entrevista com Marcus Chen</h3>
              <p>Em uma conversa com Marcus Chen, especialista em blockchain, ele compartilhou sua visão sobre a interseção entre NFTs e whisky: "A tecnologia blockchain está quebrando barreiras no mercado de colecionáveis, e o whisky é um dos itens mais interessantes para se integrar a esse ecossistema. Os NFTs não apenas oferecem uma forma segura de transacionar, mas também criam uma nova forma de ver o colecionismo e o investimento." </p>
          
              <h3>Conclusão</h3>
              <p>Os NFTs representam uma revolução no mercado de whisky, proporcionando uma maneira inovadora de garantir autenticidade e facilitar transações. Com o aumento do interesse em whiskies raros e de coleção, essa nova tecnologia promete redefinir o futuro do investimento em bebidas premium. À medida que o mercado continua a evoluir, os NFTs provavelmente desempenharão um papel cada vez mais crucial na maneira como os colecionadores e investidores interagem com o mundo do whisky.</p>
            `
          },
          {
            id: '9',
            title: 'Destilação Sustentável: Como Novas Destilarias Estão Redefinindo Práticas Ambientais',
            excerpt: 'Iniciativas inovadoras em energia renovável, gestão da água e agricultura sustentável estão transformando a produção de whisky globalmente.',
            image: '/blog/artigo9.png',
            date: '25 Jul 2023',
            author: 'Brian O\'Connor',
            category: 'Tendências',
            readTime: '9 min de leitura',
            content: `
              <h2>A Ascensão da Produção Sustentável de Whisky</h2>
              <p>Com o aumento das preocupações ambientais, muitas indústrias, incluindo a de bebidas alcoólicas, estão sendo desafiadas a adotar práticas mais verdes e sustentáveis. A destilação de whisky, um processo que envolve uma grande quantidade de energia e recursos, não ficou de fora. Este artigo explora como as novas destilarias ao redor do mundo estão adotando práticas sustentáveis, desde o uso de energias renováveis até a gestão responsável da água e dos resíduos.</p>
          
              <h3>Uso de Energias Renováveis na Produção de Whisky</h3>
              <p>Uma das maiores inovações na produção de whisky sustentável é a transição para fontes de energia renováveis. Muitas destilarias estão investindo em painéis solares, turbinas eólicas e até biocombustíveis para reduzir sua dependência de fontes de energia não-renováveis. Essas iniciativas não apenas diminuem a pegada de carbono da produção de whisky, mas também criam uma imagem positiva para as marcas, que estão se posicionando como líderes em responsabilidade ambiental.</p>
              <p>Um exemplo notável é a destilaria <strong>Glenfiddich</strong>, que implementou um sistema de biogás para alimentar seus fornos de destilação, aproveitando os resíduos orgânicos da produção de whisky. Isso permitiu à destilaria reduzir suas emissões de CO2 e ao mesmo tempo otimizar seus processos.</p>
          
              <h3>Gestão Sustentável da Água</h3>
              <p>O uso da água é um dos maiores desafios ambientais da produção de whisky. De acordo com o processo tradicional, cada garrafa de whisky pode consumir até 10.000 litros de água, o que representa uma enorme pressão sobre os recursos hídricos. Muitas destilarias estão buscando maneiras de reduzir seu consumo de água, seja através de reciclagem, sistemas de reuso ou a utilização de águas subterrâneas sustentáveis.</p>
              <p>A <strong>Destilaria Aberlour</strong>, na Escócia, é um exemplo de como uma destilaria pode reduzir seu impacto ambiental. A destilaria implementou um sistema de tratamento de águas residuais que a permite reutilizar a água utilizada na produção, reduzindo assim sua necessidade de água potável e os custos associados à compra de água externa.</p>
          
              <h3>Práticas Agrícolas Sustentáveis</h3>
              <p>A agricultura sustentável também está desempenhando um papel crucial na produção de whisky. A matéria-prima essencial para a destilação de whisky, como cevada, trigo e centeio, pode ser cultivada de maneira que respeite o meio ambiente e as comunidades locais. Muitas destilarias estão optando por usar práticas agrícolas orgânicas e regenerativas, que promovem a biodiversidade e melhoram a qualidade do solo.</p>
              <p>A <strong>Whisky Master Distillery</strong>, por exemplo, trabalha com fazendeiros locais que utilizam técnicas agrícolas regenerativas, como o plantio direto e o uso de compostagem, para cultivar os grãos que serão utilizados em seus produtos. Este modelo de agricultura não só melhora a qualidade do solo, mas também reduz a necessidade de fertilizantes químicos e pesticidas.</p>
          
              <h3>O Impacto Ambiental das Embalagens</h3>
              <p>Além das práticas de destilação, as embalagens de whisky também têm um grande impacto ambiental. As destilarias estão buscando soluções mais ecológicas, como o uso de garrafas recicladas ou biodegradáveis e a redução do uso de plásticos. Algumas destilarias até estão explorando o uso de garrafas de vidro feitas a partir de fontes de vidro reciclado, ajudando a reduzir a necessidade de matérias-primas virgens.</p>
              
              <h3>Conclusão</h3>
              <p>A sustentabilidade na indústria de whisky está deixando de ser uma tendência e se tornando uma necessidade. As destilarias estão cada vez mais conscientes do seu papel na preservação ambiental e estão tomando medidas concretas para reduzir seu impacto. O futuro da produção de whisky será, sem dúvida, mais verde, e os consumidores têm a oportunidade de apoiar essas iniciativas ao escolher marcas que priorizam práticas sustentáveis.</p>
            `
          },
          {
            id: '10',
            title: 'O Renascimento das Destilarias Perdidas: Recuperando o Patrimônio do Whisky',
            excerpt: 'Como destilarias históricas fechadas durante crises estão sendo revitalizadas, trazendo de volta técnicas e perfis de sabor há muito esquecidos.',
            image: '/blog/artigo10.png',
            date: '10 Jul 2023',
            author: 'Duncan McLeod',
            category: 'História',
            readTime: '11 min de leitura',
            content: `
              <h2>A História das Destilarias Perdidas</h2>
              <p>As destilarias de whisky têm uma história rica, cheia de altos e baixos. Durante as crises econômicas, as mudanças nas regulamentações e as guerras, muitas destilarias históricas foram forçadas a fechar suas portas. Porém, nos últimos anos, temos testemunhado um renascimento dessas destilarias perdidas, com novos investidores e entusiastas do whisky buscando recuperar e reviver as tradições que foram deixadas para trás.</p>
          
              <h3>O Impacto das Crises nas Destilarias Históricas</h3>
              <p>Ao longo do século XX, muitas destilarias famosas, como a <strong>Brora</strong> e a <strong>Port Ellen</strong>, fecharam suas portas devido à recessão, queda na demanda e mudanças no mercado de bebidas alcoólicas. Essas destilarias, que antes eram marcas icônicas, se tornaram parte da história do whisky escocês, sendo muitas vezes esquecidas com o tempo.</p>
              <p>Com a popularidade crescente dos whiskies antigos e raros, no entanto, essas destilarias começaram a despertar o interesse de colecionadores e investidores. A revitalização dessas destilarias não é apenas uma maneira de reviver um legado, mas também de recuperar as receitas e as técnicas de destilação que foram perdidas.</p>
          
              <h3>Revitalização e Recuperação do Patrimônio</h3>
              <p>A recuperação dessas destilarias exige um cuidado meticuloso para garantir que os métodos tradicionais de produção de whisky sejam mantidos. O trabalho de revitalização envolve a restauração das instalações de destilação, a recuperação de barris históricos e até mesmo a reintrodução de práticas agrícolas antigas, como o cultivo de cevada em pequenas fazendas.</p>
              <p>Destilarias como a <strong>Brora Distillery</strong>, localizada nas Highlands escocesas, têm sido restauradas com o objetivo de recriar os sabores e aromas únicos que definiram o whisky produzido lá antes de sua falência. Este trabalho não só envolve a restauração das instalações, mas também o resgate de receitas antigas e o treinamento de mestres destiladores para garantir que os padrões de qualidade sejam mantidos.</p>
          
              <h3>A Busca pelos Sabores Perdidos</h3>
              <p>Uma das maiores motivações para a revitalização dessas destilarias é o desejo de recuperar os sabores exclusivos que desapareceram com o fechamento. Muitos dos whiskies produzidos nessas destilarias eram conhecidos por seus perfis de sabor complexos, com notas de frutas secas, defumação e especiarias. Esses sabores estavam intimamente ligados às técnicas de destilação, ao tipo de madeira utilizada para envelhecer o whisky e até mesmo às condições climáticas locais.</p>
              <p>Hoje, os destiladores estão empenhados em recriar esses sabores com base em documentos históricos, memórias de antigos destiladores e experimentação. O resultado tem sido uma nova geração de whiskies raros, que são altamente valorizados pelos colecionadores e entusiastas da bebida.</p>
          
              <h3>O Impacto Cultural e Econômico</h3>
              <p>O renascimento das destilarias perdidas não só traz de volta o patrimônio histórico do whisky, mas também tem um impacto significativo nas economias locais. Muitas das destilarias que estão sendo revitalizadas estão localizadas em áreas rurais e isoladas da Escócia e Irlanda. A reabertura dessas destilarias cria empregos, atrai turistas e fortalece a economia local.</p>
              <p>Além disso, o renascimento dessas destilarias tem um impacto cultural, pois revive tradições que estavam à beira do esquecimento. Para muitos, as destilarias perdidas são símbolos do patrimônio escocês e irlandês, representando a resistência e a perseverança diante das adversidades.</p>
          
              <h3>Conclusão</h3>
              <p>O renascimento das destilarias perdidas é uma parte fascinante da história recente do whisky. Ao reviver técnicas antigas e resgatar sabores esquecidos, essas destilarias não só trazem de volta um legado, mas também moldam o futuro do whisky de uma maneira que combina o melhor da tradição com a inovação moderna. À medida que o mercado de whiskies raros cresce, o renascimento dessas destilarias se torna uma oportunidade única para os amantes do whisky apreciarem o sabor da história.</p>
            `
          },
          {
            id: '11',
            title: 'A Ciência Por Trás do Whisky Turfado: Química, Terroir e Tradição',
            excerpt: 'Um mergulho técnico nos compostos fenólicos, processo de secagem com turfa e como diferentes regiões produzem perfis distintos de defumação.',
            image: '/blog/artigo11.png',
            date: '28 Jun 2023',
            author: 'Dr. Sarah Campbell',
            category: 'Degustação',
            readTime: '13 min de leitura',
            content: `
              <h2>Entendendo o Whisky Turfado: A Ciência e Tradição por Trás da Defumação</h2>
              <p>O whisky turfado é uma das variações mais fascinantes e polarizadoras dessa bebida escocesa. Enquanto muitos apreciadores de whisky adoram o sabor defumado característico do whisky turfado, poucos compreendem completamente os processos científicos e as influências do terroir que moldam esse perfil de sabor único. Neste artigo, vamos explorar os compostos químicos envolvidos no processo de secagem com turfa, como o terroir influencia o sabor e como diferentes regiões de destilação criam perfis de defumação variados.</p>
          
              <h3>O Que é Whisky Turfado?</h3>
              <p>O termo “turfado” refere-se ao sabor defumado presente em alguns whiskies, que é resultado do uso de turfa na secagem da cevada. A turfa é uma mistura de matéria orgânica parcialmente decomposta que é encontrada em pântanos e charcos, e quando queimada, libera compostos fenólicos voláteis. Esses compostos são absorvidos pela cevada durante o processo de secagem e, posteriormente, passam para o whisky durante a destilação.</p>
              
              <h3>Compostos Fenólicos e o Processo de Defumação</h3>
              <p>Os compostos fenólicos são as principais moléculas responsáveis pelo sabor defumado do whisky turfado. A principal classe de compostos fenólicos em whiskies turfados são os ácidos fenólicos, como o guaiacol, que têm um aroma característico de fumaça. Quando a turfa é queimada, esses compostos se misturam com o vapor de água e entram em contato com a cevada, impregnando-a com o sabor defumado.</p>
              <p>É fascinante notar que a intensidade do sabor defumado no whisky depende não apenas da quantidade de turfa utilizada, mas também do tempo e da temperatura de exposição. Quanto maior o tempo de exposição à fumaça e mais quente a queima da turfa, mais intensos serão os compostos fenólicos absorvidos pela cevada.</p>
          
              <h3>O Papel do Terroir na Defumação</h3>
              <p>Além da turfa, o terroir – o conjunto de fatores ambientais como clima, solo e vegetação – também desempenha um papel importante na formação do sabor do whisky turfado. Cada região que utiliza turfa para secar a cevada tem uma mistura única de plantas e materiais orgânicos na sua turfa, o que resulta em diferentes notas defumadas.</p>
              <p>Por exemplo, o whisky da ilha de Islay, na Escócia, é famoso por seu perfil de sabor defumado intenso, devido à turfa rica em algas marinhas e sal. Já whiskies de outras regiões, como Highlands ou Speyside, podem ter uma defumação mais suave, com notas de madeira ou vegetação local.</p>
          
              <h3>A Tradição de Produção de Whisky Turfado</h3>
              <p>A produção de whisky turfado tem suas raízes na tradição escocesa e irlandesa, onde a turfa foi usada historicamente como fonte de combustível para secar a cevada. A prática de usar turfa para secar a cevada remonta a séculos atrás, e, até hoje, é uma técnica preservada por destilarias como a <strong>Laphroaig</strong>, <strong>Lagavulin</strong> e <strong>Ardbeg</strong>, cujos whiskies são altamente valorizados por seus intensos sabores defumados.</p>
          
              <h3>A Ciência da Defumação e o Futuro</h3>
              <p>Embora a defumação com turfa tenha sido uma prática tradicional, a ciência moderna está começando a influenciar esse processo. A pesquisa em compostos fenólicos e a compreensão mais profunda de como a turfa afeta o sabor do whisky estão permitindo que os destiladores manipulem as condições de defumação para criar novos perfis de sabor, mais controlados e personalizados. Isso abre as portas para a criação de whiskies turfados que atendem a uma gama mais ampla de paladares, sem perder as raízes da tradição.</p>
          
              <h3>Conclusão</h3>
              <p>O whisky turfado não é apenas uma questão de sabor, mas uma verdadeira combinação de ciência, tradição e terroir. Os compostos fenólicos são a chave para o sabor defumado, mas o terroir e os métodos tradicionais de produção também desempenham papéis cruciais. Com a combinação de técnicas antigas e novas pesquisas científicas, o whisky turfado continua a evoluir, oferecendo aos amantes do whisky uma experiência única e sempre em transformação.</p>
            `
          },
          {
            id: '12',
            title: 'A Revolução dos Coquetéis de Whisky: Do Clássico ao Contemporâneo',
            excerpt: 'Bartenders premiados compartilham receitas inovadoras e técnicas que estão redefinindo coquetéis à base de whisky em bares de elite.',
            image: '/blog/artigo12.png',
            date: '15 Jun 2023',
            author: 'James Rivera',
            category: 'Gastronomia',
            readTime: '8 min de leitura',
            content: `
              <h2>A Evolução dos Coquetéis de Whisky</h2>
              <p>Nos últimos anos, os coquetéis à base de whisky passaram por uma verdadeira revolução. Embora os clássicos como o Old Fashioned e o Manhattan ainda sejam populares, os bartenders estão constantemente inovando e criando novas misturas que desafiam as convenções tradicionais. Neste artigo, exploramos como o whisky se transformou no protagonista de coquetéis sofisticados e como ele se tornou uma escolha versátil nos bares de elite.</p>
          
              <h3>O Retorno aos Clássicos</h3>
              <p>Apesar da revolução dos coquetéis modernos, os clássicos à base de whisky continuam a ser uma base sólida nos bares de todo o mundo. O Old Fashioned, um coquetel simples e atemporal, com whisky, açúcar, angostura e uma casca de laranja, continua sendo um dos preferidos. No entanto, os bartenders têm dado um toque de modernidade a esses coquetéis, substituindo ingredientes ou mudando técnicas de preparação para aprimorar o sabor e a apresentação.</p>
              
              <h3>Coquetéis Modernos: Novas Fronteiras do Whisky</h3>
              <p>Com o crescente interesse por coquetéis exclusivos e complexos, o whisky se tornou a base de experimentos inovadores. Ingredientes inusitados como infusões de ervas, frutas exóticas e até especiarias estão sendo usados para criar novos coquetéis à base de whisky. O <strong>Whisky Smash</strong>, por exemplo, é um coquetel refrescante que combina whisky, frutas frescas e hortelã, oferecendo uma opção mais leve e tropical, mas sem perder o caráter robusto do whisky.</p>
          
              <h3>A Técnica de Infusão no Whisky</h3>
              <p>A infusão de whisky com outros ingredientes está se tornando uma técnica cada vez mais popular. Bartenders estão infundindo whiskies com especiarias, frutas e até flores, criando sabores novos e complexos. A <strong>infusão de whisky com baunilha e canela</strong> ou com <strong>chá de hibisco</strong> pode resultar em uma bebida que mistura a tradição do whisky com uma interpretação moderna.</p>
              
              <h3>A Criatividade nos Coquetéis de Whisky</h3>
              <p>O uso de técnicas criativas, como a técnica de "smoke" (defumação), também está ganhando popularidade. Nesse processo, os bartenders defumam o copo ou a bebida com madeira aromática ou ervas, adicionando um toque sofisticado e visualmente impressionante ao coquetel. O <strong>Whisky Sour</strong> com fumaça de carvalho é um exemplo de como a criatividade pode transformar um clássico em uma experiência sensorial única.</p>
          
              <h3>Conclusão</h3>
              <p>A revolução dos coquetéis de whisky continua a empurrar os limites da mixologia. Do clássico ao contemporâneo, os bartenders estão cada vez mais inovando e oferecendo novas formas de saborear o whisky. Seja com técnicas de infusão ou defumação, o whisky se reafirma como uma das bebidas mais versáteis e fascinantes para os amantes de coquetéis.</p>
            `
          },
          {
            id: '13',
            title: 'Mulheres no Whisky: As Pioneiras Transformando a Indústria',
            excerpt: 'Perfis de master blenders, destiladores e executivas que estão derrubando barreiras e redefinindo padrões na indústria tradicionalmente masculina.',
            image: '/blog/artigo13.png',
            date: '05 Jun 2023',
            author: 'Rebecca Morrison',
            category: 'Cultura',
            readTime: '10 min de leitura',
            content: `
              <h2>Mulheres Pioneiras no Mundo do Whisky</h2>
              <p>Historicamente dominada por homens, a indústria do whisky tem visto uma transformação significativa nos últimos anos, com mulheres assumindo papéis de liderança e quebrando barreiras. Desde master blenders a destiladoras e executivas, mulheres estão não apenas contribuindo, mas redefinindo os padrões da indústria. Este artigo explora as histórias inspiradoras de algumas dessas mulheres pioneiras e como elas estão mudando a paisagem do whisky global.</p>
          
              <h3>Master Blenders: As Guardiãs do Sabor</h3>
              <p>Um dos papéis mais desafiadores e reverenciados na indústria do whisky é o de master blender. Essas profissionais são responsáveis por criar os sabores únicos e consistentes dos whiskies, combinando diferentes maltes e destilados. Uma das pioneiras dessa área é <strong>Rachel Barrie</strong>, uma das master blenders mais renomadas da Escócia. Com décadas de experiência, Rachel é conhecida por seu trabalho na <strong>BenRiach</strong>, onde ajudou a redefinir a marca com suas criações inovadoras e seu foco em excelência.</p>
          
              <h3>Destiladoras: Mulheres na Produção do Whisky</h3>
              <p>As mulheres também estão se destacando na arte da destilação, um campo tradicionalmente dominado por homens. A destiladora <strong>Alison Wright</strong>, que trabalha na <strong>Glenglassaugh Distillery</strong>, é um exemplo brilhante disso. Alison se especializou em criar whiskies ricos e complexos, utilizando práticas de destilação sustentáveis que equilibram inovação e tradição. Seu trabalho está ajudando a inspirar a próxima geração de mulheres a seguir carreiras na produção de whisky.</p>
          
              <h3>Executivas: Liderança Feminina na Indústria</h3>
              <p>O setor do whisky também está vendo um número crescente de mulheres ocupando cargos executivos. <strong>Vivienne Moser</strong>, CEO da <strong>Whisky Magazine</strong>, é uma das líderes mais influentes na indústria do whisky, trabalhando para expandir a audiência global da marca e apoiar a diversidade no setor. Seu papel não é apenas sobre gestão, mas também sobre amplificar vozes femininas no whisky.</p>
          
              <h3>Desafios e Oportunidades</h3>
              <p>Embora as mulheres estejam alcançando o sucesso em várias áreas, a indústria do whisky ainda enfrenta desafios em termos de igualdade de gênero. No entanto, a crescente visibilidade de mulheres na liderança está abrindo portas para uma maior inclusão e promovendo uma mudança cultural. As iniciativas de mentorias e grupos de apoio a mulheres no whisky, como o <strong>Whisky Women’s Network</strong>, têm sido fundamentais para criar um ambiente mais inclusivo.</p>
          
              <h3>Conclusão</h3>
              <p>As mulheres estão desempenhando um papel cada vez mais importante na indústria do whisky, quebrando barreiras e liderando a transformação de uma tradição histórica. À medida que mais mulheres entram no mercado e avançam em suas carreiras, podemos esperar ver uma nova era no whisky, mais inclusiva e inovadora.</p>
            `
          },
          {
            id: '14',
            title: 'Experiências Virtuais: Os Melhores Tours Digitais de Destilarias',
            excerpt: 'Como a tecnologia de realidade virtual está permitindo experiências imersivas em destilarias lendárias para entusiastas de todo o mundo.',
            image: '/blog/artigo14.png',
            date: '25 Mai 2023',
            author: 'David Kim',
            category: 'Viagens',
            readTime: '7 min de leitura',
            content: `
              <h2>O Futuro das Visitas às Destilarias: Tours Virtuais</h2>
              <p>Com o advento da tecnologia de realidade virtual (RV), os entusiastas do whisky agora podem embarcar em experiências imersivas sem sair de casa. Tours digitais de destilarias lendárias oferecem uma maneira única de explorar as instalações de produção de whisky, tudo enquanto se desfruta de uma experiência interativa e educativa. Neste artigo, exploramos as melhores experiências virtuais de destilarias e como a RV está mudando a maneira como os amantes de whisky se conectam com suas marcas favoritas.</p>
          
              <h3>A Revolução das Tours Virtuais</h3>
              <p>As tours virtuais de destilarias começaram a ganhar popularidade especialmente durante a pandemia, quando as viagens físicas estavam limitadas. Agora, com o avanço da tecnologia, essas experiências digitais se tornaram mais acessíveis e sofisticadas. Empresas como a <strong>Glenfiddich</strong> e a <strong>Macallan</strong> estão liderando o caminho, oferecendo tours virtuais de suas destilarias em Escócia que permitem aos visitantes explorar os processos de produção e o patrimônio da marca, tudo através de seus dispositivos móveis ou fones de ouvido de realidade virtual.</p>
          
              <h3>Explorando Destilarias Lendárias</h3>
              <p>Entre as opções mais procuradas estão as experiências virtuais das destilarias de Islay, famosas pelos seus whiskies turfados e característicos. Destilarias como <strong>Laphroaig</strong> e <strong>Lagavulin</strong> têm oferecido tours digitais que permitem aos visitantes ver o processo de produção de perto, desde a secagem da cevada até o envelhecimento do whisky. A realidade virtual proporciona uma visão detalhada, quase como se o visitante estivesse fisicamente presente, com a vantagem de poder explorar áreas normalmente restritas ao público.</p>
          
              <h3>Tour Virtual: O Whisky e a História</h3>
              <p>Além das tours de produção, muitas destilarias oferecem uma imersão na história da marca. A <strong>Glenlivet</strong>, por exemplo, possui uma tour virtual que transporta os visitantes para o século 19, quando a destilaria foi fundada. Durante a experiência, os usuários podem interagir com elementos históricos, aprendendo sobre a origem do whisky e seu impacto na cultura escocesa.</p>
          
              <h3>Uma Experiência Interativa</h3>
              <p>O que torna os tours virtuais de destilarias ainda mais fascinantes é sua interatividade. Muitas dessas experiências permitem que os visitantes participem de degustações virtuais, combinando diferentes tipos de whisky e aprendendo a identificar sabores e aromas. Algumas plataformas também oferecem a opção de criar e personalizar um rótulo de whisky digital, o que é uma forma inovadora de engajar os consumidores na experiência da marca.</p>
          
              <h3>Conclusão</h3>
              <p>A realidade virtual está permitindo que os amantes de whisky explorem destilarias ao redor do mundo sem sair de casa, proporcionando uma experiência rica e envolvente. À medida que a tecnologia de RV continua a evoluir, podemos esperar ver mais inovações no mundo das visitas digitais às destilarias, tornando as experiências mais imersivas e acessíveis para todos.</p>
            `
          },
          {
            id: '15',
            title: 'Além da Garrafa: A Arte do Design em Embalagens Premium de Whisky',
            excerpt: 'Um olhar nos bastidores do processo criativo dos designers que criam as embalagens mais luxuosas e premiadas da indústria.',
            image: '/blog/artigo15.png',
            date: '12 Mai 2023',
            author: 'Isabella Martins',
            category: 'Tendências',
            readTime: '9 min de leitura',
            content: `
              <h2>A Arte por Trás das Embalagens Premium de Whisky</h2>
              <p>Em um mercado onde a concorrência é feroz e a diferenciação é essencial, o design das embalagens de whisky se tornou um dos aspectos mais importantes para atrair consumidores. As garrafas de whisky não são apenas recipientes para uma bebida; elas são a primeira impressão que um consumidor tem da marca e, muitas vezes, são um reflexo da qualidade do conteúdo. Neste artigo, exploramos como o design das embalagens de whisky evoluiu, as tendências atuais e o papel vital dos designers no desenvolvimento de embalagens luxuosas e premiadas.</p>
          
              <h3>A Evolução das Embalagens de Whisky</h3>
              <p>No passado, as garrafas de whisky eram simples, sem grandes adornos. No entanto, com o aumento do interesse por whiskies premium e colecionáveis, a embalagem se tornou uma extensão da marca. Destilarias como a <strong>Glenfiddich</strong> e a <strong>Macallan</strong> começaram a investir no design, criando garrafas que se destacam não apenas pelo conteúdo, mas também pelo estilo e sofisticação. Isso inclui o uso de vidro artesanal, detalhes dourados e formas de garrafa únicas que transmitem luxo e tradição.</p>
          
              <h3>Elementos que Combinam Estética e Funcionalidade</h3>
              <p>Além de serem visualmente impressionantes, as embalagens de whisky também precisam ser funcionais. O design deve considerar o transporte, a preservação da qualidade do whisky e a facilidade de uso. Muitos designers de embalagens premium optam por garrafas pesadas e detalhes metálicos, não apenas por razões estéticas, mas também para garantir que a garrafa transmita uma sensação de valor e qualidade.</p>
          
              <h3>Tendências no Design de Embalagens</h3>
              <p>Uma tendência crescente no design de embalagens de whisky é a personalização. Muitas marcas estão criando edições limitadas com embalagens únicas e exclusivas. O uso de materiais sustentáveis também está em alta, com algumas marcas optando por vidro reciclado ou embalagens com menor impacto ambiental. Além disso, o design vintage, inspirado nas garrafas antigas de whisky, também tem ganhado popularidade, apelando para a nostalgia e o valor histórico das marcas.</p>
          
              <h3>Conclusão</h3>
              <p>A embalagem de whisky vai muito além de sua função prática. Ela é uma forma de comunicação visual que reflete a qualidade, a tradição e o luxo da bebida que contém. À medida que o mercado de whiskies premium continua a crescer, o design das embalagens será um fator cada vez mais importante para atrair e cativar os consumidores, transformando uma simples garrafa em uma obra de arte.</p>
            `
          }
      ];
      
      // Encontrar o artigo pelo ID
      const currentPost = featuredPosts.find(post => post.id === postId);
      
      if (currentPost) {
        setPost(currentPost);
        
        // Encontrar artigos relacionados (da mesma categoria)
        const related = featuredPosts
          .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
          .slice(0, 3);
        
        setRelatedPosts(related);
      }
      
      setIsLoading(false);
    };
    
    if (postId) {
      fetchPostData();
    }
  }, [postId]);
  

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikeCount(likeCount + 1);
      setHasLiked(true);
    } else {
      setLikeCount(likeCount - 1);
      setHasLiked(false);
    }
  };

  // Animações para elementos da página
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black pt-2 sm:pt-3">
        <div className="text-center p-2">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3">
            <div className="absolute inset-0 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
            <div className="absolute inset-1 border-2 border-amber-500/20 border-b-amber-500 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="text-amber-500 font-serif italic text-sm sm:text-base">Preparando sua degustação...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 text-center pt-6 sm:pt-8">
        <div className="w-16 h-16 sm:w-24 sm:h-24 mb-6 sm:mb-8 opacity-30">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12L15 15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7.50001 4.23001C8.52901 3.62001 9.75001 3.25001 11 3.25001C15.004 3.25001 18.25 6.49601 18.25 10.5C18.25 14.504 15.004 17.75 11 17.75C6.99601 17.75 3.75001 14.504 3.75001 10.5C3.75001 9.25001 4.12001 8.02901 4.73001 7.00001" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 3L21 21" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-500 mb-3 sm:mb-4">Artigo não encontrado</h1>
        <p className="text-sm sm:text-base text-amber-500/80 mb-6 sm:mb-8 max-w-md">Infelizmente, não conseguimos encontrar o artigo que você está procurando. Ele pode ter sido removido ou o link está incorreto.</p>
        <Link href="/blog" className="px-6 sm:px-8 py-2.5 sm:py-3 bg-amber-500 text-black rounded-md hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center text-sm sm:text-base">
          <ArrowLeft size={16} className="mr-2" />
          <span>Voltar para o Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden pt-4 sm:pt-6 md:pt-8">
      {/* Hero Section com imagem de fundo */}
      <div className="relative w-full h-[70vh] sm:h-[60vh] md:h-[70vh] bg-black overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        >
          <Image 
            src={post?.image || '/blog-placeholder.jpg'} 
            alt={post?.title || 'Blog Post'} 
            fill 
            className="object-cover blur-sm"
            quality={60}
            priority 
          />
        </motion.div>
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-5 md:p-6 text-white container mx-auto mt-4 sm:mt-6 md:mt-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2 sm:mb-4 md:mb-6"
          >
            <Link href="/pages/blog" className="inline-flex items-center text-amber-500 hover:text-amber-400 mb-4 transition-colors group text-xs sm:text-sm md:text-base">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-light tracking-wide">VOLTAR PARA O BLOG</span>
            </Link>
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <span className="inline-block px-3 sm:px-4 py-1 bg-amber-500 text-black text-xs sm:text-sm rounded-full font-medium tracking-wide">
                {post.category}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-2 sm:mb-3 md:mb-4 font-serif max-w-4xl">
              {post.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#E5E5E5]/90 max-w-3xl mb-3 sm:mb-4 md:mb-5 font-light leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-white/80 border-t border-amber-500/30 pt-3 sm:pt-4 md:pt-6 mt-3 sm:mt-4">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-2 sm:mr-3">
                  <User size={14} className="text-amber-500" />
                </div>
                <div>
                  <span className="block text-white text-xs sm:text-sm">{post.author}</span>
                  <span className="text-[10px] sm:text-xs text-amber-500/80">Especialista em Whisky</span>
                </div>
              </div>
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-2 sm:mr-3">
                  <Calendar size={14} className="text-amber-500" />
                </div>
                <div>
                  <span className="block text-white text-xs sm:text-sm">{post.date}</span>
                  <span className="text-[10px] sm:text-xs text-amber-500/80">Data de publicação</span>
                </div>
              </div>
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-2 sm:mr-3">
                  <Clock size={14} className="text-amber-500" />
                </div>
                <div>
                  <span className="block text-white text-xs sm:text-sm">{post.readTime}</span>
                  <span className="text-[10px] sm:text-xs text-amber-500/80">Tempo estimado</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Conteúdo do artigo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 py-0 relative -mt-5 sm:-mt-8 md:-mt-10 z-30">
        <motion.div 
          className="bg-[#262626] rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl p-4 sm:p-5 md:p-6 lg:p-8 mb-5 sm:mb-6 md:mb-8 border border-[#333333]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
         {/* Barra de interação */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4 md:mb-6 pb-2 sm:pb-3 md:pb-4 border-b border-[#333333]">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto mb-3 sm:mb-0">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
                    hasLiked 
                      ? 'bg-[#D4A24E]/20 text-[#D4A24E] border border-[#D4A24E]/30' 
                      : 'hover:bg-[#333333] border border-transparent'
                  }`}
                >
                  <ThumbsUp size={18} className={hasLiked ? 'fill-[#D4A24E]' : ''} />
                  <span className="font-medium">{likeCount}</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full hover:bg-[#333333] transition-all border border-transparent">
                  <MessageSquare size={18} />
                  <span className="font-medium">Comentar</span>
                </button>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                <button className="p-2.5 rounded-full hover:bg-[#333333] transition-all border border-transparent">
                  <Share2 size={18} />
                </button>
                <button 
                  onClick={handleBookmark}
                  className={`p-2.5 rounded-full transition-all ${
                    isBookmarked 
                      ? 'bg-[#D4A24E]/20 text-[#D4A24E] border border-[#D4A24E]/30' 
                      : 'hover:bg-[#333333] border border-transparent'
                  }`}
                >
                  <Bookmark size={18} className={isBookmarked ? 'fill-[#D4A24E]' : ''} />
                </button>
              </div>
            </div>

          {/* Conteúdo do artigo */}
          <div 
              className="prose prose-invert max-w-none prose-xs sm:prose-sm md:prose-base lg:prose-lg prose-headings:font-serif prose-headings:text-[#D4A24E] prose-p:text-[#E5E5E5]/90 prose-p:leading-relaxed prose-li:text-[#E5E5E5]/90 prose-blockquote:border-l-[#D4A24E] prose-blockquote:bg-[#333333] prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-md prose-blockquote:italic prose-blockquote:text-[#E5E5E5]/80 prose-strong:text-[#D4A24E]"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          
          {/* Assinatura do autor */}
          <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 md:pt-8 border-t border-[#333333] flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#D4A24E]/20 flex items-center justify-center mr-3 sm:mr-4 text-[#D4A24E] font-serif text-lg sm:text-xl">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-[#D4A24E]">{post.author}</p>
                <p className="text-sm text-[#E5E5E5]/70">Especialista em Whisky e colaborador regular do Thornfield Blog</p>
              </div>
            </div>
          </motion.div>

        {/* Seção de artigos relacionados */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mt-6 sm:mt-8"
          >
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#D4A24E] mb-3 sm:mb-4 pb-2 border-b border-[#333333] flex items-center">
              <span className="w-10 h-1 bg-[#D4A24E] mr-3"></span>
              Artigos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {relatedPosts.map((relatedPost) => (
                <motion.div 
                  key={relatedPost.id}
                  variants={fadeIn}
                  className="group"
                >
                  <Link href={`/blog/${relatedPost.id}`} className="block">
                    <div className="relative h-48 sm:h-52 md:h-56 mb-3 sm:mb-4 overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity"></div>
                      <Image 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 p-4 z-20">
                        <span className="inline-block px-2 py-1 bg-[#D4A24E] text-[#1A1A1A] text-xs rounded-full mb-2">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-[#D4A24E] group-hover:text-[#E5E5E5] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-[#E5E5E5]/80 text-sm line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex justify-between text-xs text-[#E5E5E5]/60">
                      <span>{relatedPost.date}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}