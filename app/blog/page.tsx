"use client";
import React, { useState, useEffect, useRef, RefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  
  // Refs para as seções para scroll com tipo correto
  const heroRef = useRef<HTMLElement>(null);
  const destaquesRef = useRef<HTMLElement>(null);
  const artigosRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLElement>(null);
  const cursosRef = useRef<HTMLElement>(null);
  
  // Para efeitos de parallax
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const rotateVal = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Categorias do blog
  const categories = [
    'Todos', 
    'Destilarias', 
    'História', 
    'Degustação', 
    'Entrevistas', 
    'Gastronomia', 
    'Viagens', 
    'Cultura', 
    'Tendências',
    'Colecionismo'
  ];

  // Artigos em destaque
  const featuredPosts = [
    {
      id: 'japanese-whisky-revival',
      title: 'O Renascimento do Whisky Japonês: Tradição e Inovação',
      excerpt: 'Como destilarias japonesas estão redefinindo o mercado global de whisky com técnicas ancestrais e abordagens inovadoras.',
      image: '/whiskys-fundo/10.png',
      date: '10 Nov 2023',
      author: 'Akira Tanaka',
      category: 'Destilarias',
      readTime: '8 min de leitura',
    },
    {
      id: 'bourbon-barrels-secret',
      title: 'O Segredo dos Barris de Bourbon: Uma Jornada pelo Kentucky',
      excerpt: 'Exploramos as florestas e tanoarias que produzem os barris responsáveis pelos sabores icônicos do bourbon americano.',
      image: '/blog/bourbon-barrels.jpg',
      date: '28 Out 2023',
      author: 'William Johnson',
      category: 'História',
      readTime: '12 min de leitura',
    },
    {
      id: 'advanced-tasting-notes',
      title: 'Além do Paladar: A Ciência das Notas de Degustação',
      excerpt: 'Um mergulho profundo na neurociência e química por trás da percepção de sabores ao degustar whiskies premium.',
      image: '/whiskys-fundo/10.png',
      date: '15 Out 2023',
      author: 'Elena Rodriguez',
      category: 'Degustação',
      readTime: '10 min de leitura',
    },
    {
      id: 'master-distiller-interview',
      title: 'Entrevista Exclusiva: Uma Tarde com o Mestre Destilador de Macallan',
      excerpt: 'Conversamos com Richard Patterson sobre sua trajetória de 50 anos na indústria e os segredos por trás dos whiskies mais renomados do mundo.',
      image: '/blog/master-distiller.jpg',
      date: '02 Out 2023',
      author: 'Claire Bennett',
      category: 'Entrevistas',
      readTime: '15 min de leitura',
    },
    {
      id: 'whisky-dessert-pairings',
      title: 'Harmonizações Perfeitas: Whisky e Sobremesas Artesanais',
      excerpt: 'Chefs renomados revelam combinações surpreendentes de whiskies com sobremesas que elevam ambas as experiências.',
      image: '/blog/whisky-desserts.jpg',
      date: '24 Set 2023',
      author: 'Pierre Dubois',
      category: 'Gastronomia',
      readTime: '7 min de leitura',
    },
    {
      id: 'highland-distillery-tour',
      title: 'Roteiro nas Highlands: As Destilarias Mais Remotas da Escócia',
      excerpt: 'Um guia completo para explorar destilarias históricas escondidas nas paisagens deslumbrantes das Highlands escocesas.',
      image: '/blog/highland-tour.jpg',
      date: '12 Set 2023',
      author: 'Fiona MacLeod',
      category: 'Viagens',
      readTime: '11 min de leitura',
    },
    {
      id: 'whisky-in-literature',
      title: 'Whisky nas Páginas: A Influência da Bebida na Literatura Mundial',
      excerpt: 'De Hemingway a Ian Rankin, como o whisky moldou personagens icônicos e narrativas na literatura ao longo dos séculos.',
      image: '/blog/whisky-literature.jpg',
      date: '30 Ago 2023',
      author: 'Thomas Wright',
      category: 'Cultura',
      readTime: '9 min de leitura',
    },
    {
      id: 'nft-whisky-investment',
      title: 'NFTs e Whisky: O Futuro do Colecionismo e Investimento',
      excerpt: 'Como a tecnologia blockchain está revolucionando o mercado de whiskies raros e transformando a forma como investidores abordam a categoria.',
      image: '/blog/nft-whisky.jpg',
      date: '15 Ago 2023',
      author: 'Marcus Chen',
      category: 'Tendências',
      readTime: '8 min de leitura',
    }
  ];

  // Artigos principais
  const mainPosts = [
    {
      id: 'rare-collection-auction',
      title: 'Coleção Rara de Macallan Quebra Recorde em Leilão em Hong Kong',
      excerpt: 'Uma coleção completa de Macallan Fine and Rare foi arrematada por US$2,3 milhões, estabelecendo novo recorde para leilões de whisky.',
      image: '/blog/auction-whisky.jpg',
      date: '05 Ago 2023',
      author: 'Victoria Chang',
      category: 'Colecionismo',
      readTime: '6 min de leitura',
    },
    {
      id: 'sustainable-distilling',
      title: 'Destilação Sustentável: Como Novas Destilarias Estão Redefinindo Práticas Ambientais',
      excerpt: 'Iniciativas inovadoras em energia renovável, gestão da água e agricultura sustentável estão transformando a produção de whisky globalmente.',
      image: '/blog/sustainable-distilling.jpg',
      date: '25 Jul 2023',
      author: 'Brian O\'Connor',
      category: 'Tendências',
      readTime: '9 min de leitura',
    },
    {
      id: 'lost-distilleries-revival',
      title: 'O Renascimento das Destilarias Perdidas: Recuperando o Patrimônio do Whisky',
      excerpt: 'Como destilarias históricas fechadas durante crises estão sendo revitalizadas, trazendo de volta técnicas e perfis de sabor há muito esquecidos.',
      image: '/blog/lost-distilleries.jpg',
      date: '10 Jul 2023',
      author: 'Duncan McLeod',
      category: 'História',
      readTime: '11 min de leitura',
    },
    {
      id: 'peated-whisky-science',
      title: 'A Ciência Por Trás do Whisky Turfado: Química, Terroir e Tradição',
      excerpt: 'Um mergulho técnico nos compostos fenólicos, processo de secagem com turfa e como diferentes regiões produzem perfis distintos de defumação.',
      image: '/blog/peated-whisky.jpg',
      date: '28 Jun 2023',
      author: 'Dr. Sarah Campbell',
      category: 'Degustação',
      readTime: '13 min de leitura',
    },
    {
      id: 'cocktail-revolution',
      title: 'A Revolução dos Coquetéis de Whisky: Do Clássico ao Contemporâneo',
      excerpt: 'Bartenders premiados compartilham receitas inovadoras e técnicas que estão redefinindo coquetéis à base de whisky em bares de elite.',
      image: '/blog/whisky-cocktails.jpg',
      date: '15 Jun 2023',
      author: 'James Rivera',
      category: 'Gastronomia',
      readTime: '8 min de leitura',
    },
    {
      id: 'women-in-whisky',
      title: 'Mulheres no Whisky: As Pioneiras Transformando a Indústria',
      excerpt: 'Perfis de master blenders, destiladores e executivas que estão derrubando barreiras e redefinindo padrões na indústria tradicionalmente masculina.',
      image: '/blog/women-in-whisky.jpg',
      date: '05 Jun 2023',
      author: 'Rebecca Morrison',
      category: 'Cultura',
      readTime: '10 min de leitura',
    },
    {
      id: 'virtual-distillery-tours',
      title: 'Experiências Virtuais: Os Melhores Tours Digitais de Destilarias',
      excerpt: 'Como a tecnologia de realidade virtual está permitindo experiências imersivas em destilarias lendárias para entusiastas de todo o mundo.',
      image: '/blog/virtual-tours.jpg',
      date: '25 Mai 2023',
      author: 'David Kim',
      category: 'Viagens',
      readTime: '7 min de leitura',
    },
    {
      id: 'luxury-packaging-design',
      title: 'Além da Garrafa: A Arte do Design em Embalagens Premium de Whisky',
      excerpt: 'Um olhar nos bastidores do processo criativo dos designers que criam as embalagens mais luxuosas e premiadas da indústria.',
      image: '/blog/whisky-packaging.jpg',
      date: '12 Mai 2023',
      author: 'Isabella Martins',
      category: 'Tendências',
      readTime: '9 min de leitura',
    },
    {
      id: 'scandinavian-whisky-boom',
      title: 'O Boom do Whisky Escandinavo: Das Terras Nórdicas para o Mundo',
      excerpt: 'Como destilarias da Suécia, Dinamarca e Finlândia estão criando whiskies aclamados pela crítica com uma identidade regional distintiva.',
      image: '/blog/scandinavian-whisky.jpg',
      date: '28 Abr 2023',
      author: 'Erik Lindgren',
      category: 'Destilarias',
      readTime: '11 min de leitura',
    },
    {
      id: 'whisky-investment-guide',
      title: 'Guia Definitivo para Investimento em Whisky Raro em 2023',
      excerpt: 'Análise de tendências, garrafas para ficar de olho e estratégias de experts para construir uma coleção que traga retorno financeiro.',
      image: '/blog/whisky-investment.jpg',
      date: '15 Abr 2023',
      author: 'Robert Dalton',
      category: 'Colecionismo',
      readTime: '14 min de leitura',
    },
    {
      id: 'food-whisky-pairing-guide',
      title: 'Guia Completo de Harmonização: Whisky e Alta Gastronomia',
      excerpt: 'Um manual detalhado com princípios e exemplos específicos para harmonizar diferentes estilos de whisky com pratos sofisticados.',
      image: '/blog/food-pairing.jpg',
      date: '01 Abr 2023',
      author: 'Chef Maria Santos',
      category: 'Gastronomia',
      readTime: '12 min de leitura',
    },
    {
      id: 'master-blender-secrets',
      title: 'Os Segredos dos Master Blenders: A Arte da Consistência',
      excerpt: 'Entrevistas exclusivas revelando as técnicas, desafios e filosofias por trás da criação de blends consistentes ao longo de décadas.',
      image: '/blog/master-blender.jpg',
      date: '20 Mar 2023',
      author: 'George Anderson',
      category: 'Entrevistas',
      readTime: '16 min de leitura',
    }
  ];

  // Timeline histórica do whisky
  const timelineEvents = [
    {
      year: '1494',
      title: 'Primeiros Registros',
      description: 'Primeira menção documentada da destilação de whisky na Escócia: "Eight bolls of malt to Friar John Cor wherewith to make aqua vitae".',
      image: '/blog/timeline/1494.jpg',
    },
    {
      year: '1608',
      title: 'Destilaria Licenciada',
      description: 'Bushmills na Irlanda recebe a primeira licença oficial para destilar whisky do Rei James I.',
      image: '/blog/timeline/1608.jpg',
    },
    {
      year: '1831',
      title: 'Revolução na Destilação',
      description: 'Invenção do alambique de coluna por Aeneas Coffey, revolucionando a produção de whisky de grãos.',
      image: '/blog/timeline/1831.jpg',
    },
    {
      year: '1880s',
      title: 'Era Dourada',
      description: 'Boom na indústria do whisky escocês, com exportações em massa para todo o mundo.',
      image: '/blog/timeline/1880.jpg',
    },
    {
      year: '1920-1933',
      title: 'Proibição Americana',
      description: 'A Lei Seca nos EUA força o fechamento de muitas destilarias, enquanto outras prosperam com vendas ilegais.',
      image: '/blog/timeline/1920.jpg',
    },
    {
      year: '1950s',
      title: 'Globalização',
      description: 'Whisky escocês se torna um símbolo de status global, com marcas como Johnnie Walker dominando mercados internacionais.',
      image: '/blog/timeline/1950.jpg',
    },
    {
      year: '1980s',
      title: 'Crise e Fechamentos',
      description: 'Dezenas de destilarias escocesas fecham devido à superprodução e queda na demanda.',
      image: '/blog/timeline/1980.jpg',
    },
    {
      year: '2000s',
      title: 'Revolução Craft',
      description: 'Surgimento de microdestilarias artesanais, especialmente nos EUA, Japão e outros países não tradicionais.',
      image: '/blog/timeline/2000.jpg',
    },
    {
      year: '2020s',
      title: 'Era da Experimentação',
      description: 'Inovações em maturação, terminações em barris especiais e destilação sustentável definem a nova era do whisky global.',
      image: '/blog/timeline/2020.jpg',
    },
  ];

  // Cursos e workshops
  const whiskyCourses = [
    {
      id: 'intro-tasting',
      title: 'Introdução à Degustação',
      level: 'Iniciante',
      duration: '4 horas',
      price: 'R$ 450',
      description: 'Aprenda os fundamentos da degustação de whisky, técnicas sensoriais e vocabulário essencial para apreciar diferentes estilos.',
      image: '/blog/courses/intro.jpg',
      dates: ['15 Dez 2023', '20 Jan 2024'],
      instructor: 'Carlos Mendes',
    },
    {
      id: 'scotch-regions',
      title: 'Regiões da Escócia',
      level: 'Intermediário',
      duration: '6 horas',
      price: 'R$ 650',
      description: 'Explore as características distintas das regiões produtoras escocesas, da suavidade das Highlands à intensidade de Islay.',
      image: '/blog/courses/scotland.jpg',
      dates: ['28 Jan 2024', '18 Fev 2024'],
      instructor: 'Amanda Souza',
    },
    {
      id: 'blending-workshop',
      title: 'Workshop de Blending',
      level: 'Avançado',
      duration: '8 horas',
      price: 'R$ 850',
      description: 'Crie seu próprio blend sob orientação profissional, aprendendo sobre harmonização de perfis e técnicas de casamento.',
      image: '/blog/courses/blending.jpg',
      dates: ['10 Mar 2024', '05 Abr 2024'],
      instructor: 'Roberto Matsumoto',
    },
    {
      id: 'food-pairing',
      title: 'Harmonização Gastronômica',
      level: 'Intermediário',
      duration: '5 horas',
      price: 'R$ 750',
      description: 'Descubra as combinações perfeitas entre diferentes estilos de whisky e alta gastronomia, com jantar degustação.',
      image: '/blog/courses/food.jpg',
      dates: ['22 Abr 2024', '15 Mai 2024'],
      instructor: 'Chef Paulo Vieira',
    },
  ];

  // Destilarias no mapa
  const distilleryRegions = [
    {
      region: 'Escócia',
      color: '#E57200',
      distilleries: [
        { name: 'Macallan', lat: 57.484, lng: -3.206, type: 'Single Malt' },
        { name: 'Glenlivet', lat: 57.343, lng: -3.338, type: 'Single Malt' },
        { name: 'Talisker', lat: 57.302, lng: -6.356, type: 'Single Malt' },
        { name: 'Lagavulin', lat: 55.635, lng: -6.126, type: 'Single Malt' },
        { name: 'Glenfiddich', lat: 57.455, lng: -3.128, type: 'Single Malt' },
      ]
    },
    {
      region: 'Irlanda',
      color: '#1E7901',
      distilleries: [
        { name: 'Jameson', lat: 52.149, lng: -8.147, type: 'Blended' },
        { name: 'Bushmills', lat: 55.204, lng: -6.522, type: 'Single Malt' },
        { name: 'Teeling', lat: 53.338, lng: -6.277, type: 'Single Malt' },
      ]
    },
    {
      region: 'EUA',
      color: '#0064A4',
      distilleries: [
        { name: 'Buffalo Trace', lat: 38.217, lng: -84.867, type: 'Bourbon' },
        { name: 'Jack Daniel\'s', lat: 35.283, lng: -86.368, type: 'Tennessee' },
        { name: 'Maker\'s Mark', lat: 37.697, lng: -85.351, type: 'Bourbon' },
      ]
    },
    {
      region: 'Japão',
      color: '#D00000',
      distilleries: [
        { name: 'Yamazaki', lat: 34.892, lng: 135.675, type: 'Single Malt' },
        { name: 'Nikka Yoichi', lat: 43.182, lng: 140.797, type: 'Single Malt' },
        { name: 'Hakushu', lat: 35.827, lng: 138.516, type: 'Single Malt' },
      ]
    },
  ];

  // Função para filtrar posts baseado na categoria ativa e busca
  const filteredFeaturedPosts = featuredPosts.filter(post => {
    const matchesCategory = activeFilter === 'Todos' || post.category === activeFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredPosts = mainPosts.filter(post => {
    const matchesCategory = activeFilter === 'Todos' || post.category === activeFilter;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Monitora o scroll para mostrar o botão de voltar ao topo e atualizar a seção ativa
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
      
      // Determinar seção ativa baseada na posição de scroll
      const scrollPosition = window.scrollY + 200;
      
      if (heroRef.current && scrollPosition < heroRef.current.offsetTop + heroRef.current.offsetHeight) {
        setActiveSection('inicio');
      } else if (destaquesRef.current && scrollPosition < destaquesRef.current.offsetTop + destaquesRef.current.offsetHeight) {
        setActiveSection('destaques');
      } else if (artigosRef.current && scrollPosition < artigosRef.current.offsetTop + artigosRef.current.offsetHeight) {
        setActiveSection('artigos');
      } else if (timelineRef.current && scrollPosition < timelineRef.current.offsetTop + timelineRef.current.offsetHeight) {
        setActiveSection('timeline');
      } else if (mapRef.current && scrollPosition < mapRef.current.offsetTop + mapRef.current.offsetHeight) {
        setActiveSection('mapa');
      } else if (cursosRef.current) {
        setActiveSection('cursos');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Função para voltar ao topo da página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Função para navegar para uma seção com tipo correto para o parâmetro
  const scrollToSection = (sectionRef: RefObject<HTMLElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Hero Section Diagonal Split */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background - Diagonal Split with Parallax */}
        <div className="absolute inset-0">
          {/* Lado esquerdo escuro com textura */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-black">
            <div className="absolute inset-0 opacity-10 bg-[url('/blog/texture-dark.png')]"></div>
          </div>
          
          {/* Lado direito com imagem */}
          <motion.div 
            style={{ y: heroY }}
            className="absolute top-0 right-0 w-1/2 h-full"
          >
            <div className="absolute inset-0 opacity-75">
              <Image 
                src="/whiskys-fundo/10.png" 
                alt="Whisky"
                fill
                className="object-cover"
                quality={90}
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black"></div>
          </motion.div>
          
          {/* Linha diagonal divisória */}
          <div className="absolute top-0 left-1/2 h-full w-10 bg-gradient-to-r from-amber-800 to-transparent transform -translate-x-1/2 -skew-x-12"></div>
        </div>
        
        {/* Conteúdo do Hero */}
        <div className="relative z-10 h-full container mx-auto px-4 py-20 flex flex-col justify-center">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight">
                O <span className="text-amber-500">Universo</span> <br />
                do Whisky
              </h1>
              
              <div className="flex items-center mb-8">
                <div className="h-px w-16 bg-amber-700"></div>
                <p className="text-amber-500 ml-3 text-xl font-medium">Thornfield Blog</p>
              </div>
              
              <p className="text-lg text-gray-300 max-w-lg">
                Narrativas, descobertas e experiências exclusivas no fascinante mundo das bebidas premium.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
            >
              <button 
                onClick={() => destaquesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-8 py-3 bg-amber-600 rounded-full text-base font-medium hover:bg-amber-500 transition-colors inline-flex items-center justify-center group"
              >
                Explorar artigos
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
              
              <button 
                onClick={() => timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-8 py-3 bg-transparent border border-amber-700 rounded-full text-base font-medium hover:bg-amber-900/30 transition-colors inline-flex items-center justify-center"
              >
                História do whisky
              </button>
            </motion.div>
          </div>
          
          {/* Decoração */}
          <motion.div 
            style={{ rotate: rotateVal }} 
            className="absolute bottom-10 right-10 w-32 h-32 opacity-20"
          >
            <Image 
              src="/texto-logo2.png"
              alt=""
              width={150}
              height={150}
            />
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-gray-500 mb-2">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Destaques - Layout Melhorado */}
      <section 
        ref={destaquesRef} 
        className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-950"
      >
        {/* Decorações de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-900/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-800/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Cabeçalho Moderno e Limpo */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white border-l-4 border-amber-500 pl-4">Em Destaque</h2>
            </motion.div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
              <p className="text-gray-400 max-w-lg">
                Nossas seleções especiais de artigos para os entusiastas e colecionadores mais exigentes.
              </p>
              
              {activeFilter !== 'Todos' && (
                <button 
                  onClick={() => setActiveFilter('Todos')}
                  className="text-amber-500 hover:text-amber-400 transition-colors flex items-center self-start"
                >
                  <span>Limpar filtro</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Categorias Pills com design refinado */}
          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10"></div>
            <div className="flex overflow-x-auto scrollbar-hide py-2 space-x-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2 text-sm whitespace-nowrap rounded-lg transition-all duration-300 ${
                    activeFilter === category 
                    ? 'bg-gradient-to-r from-amber-700 to-amber-500 text-white font-medium shadow-lg shadow-amber-900/50' 
                    : 'bg-gray-900/80 text-gray-400 border border-gray-800 hover:border-amber-800/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Busca redesenhada - alinhada corretamente */}
          <div className="relative max-w-xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Busque por artigos ou tópicos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`w-full bg-gray-900/80 backdrop-blur-sm border ${isSearchFocused ? 'border-amber-500' : 'border-gray-700'} rounded-lg py-3 px-6 pr-12 outline-none focus:shadow-lg transition-all duration-300`}
            />
            <div className="absolute right-4 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isSearchFocused ? 'text-amber-500' : 'text-gray-600'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
          </div>
          
          {/* Layout de Destaques Melhorado - Evita sobreposição */}
          {filteredFeaturedPosts.length > 0 ? (
            <div className="space-y-12">
              {/* Post Principal - Maior */}
              {filteredFeaturedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${filteredFeaturedPosts[0].id}`} className="group block">
                    <div className="flex flex-col md:flex-row bg-gray-900/60 rounded-xl overflow-hidden border border-gray-800 hover:border-amber-700/50 transition-all duration-300 shadow-xl">
                      <div className="relative h-60 md:h-auto md:w-1/2">
                        <Image 
                          src={filteredFeaturedPosts[0].image} 
                          alt={filteredFeaturedPosts[0].title}
                          fill
                          className="object-cover"
                          quality={85}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/70 md:to-transparent"></div>
                        
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-600/90 text-white">
                            {filteredFeaturedPosts[0].category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 md:w-1/2 flex flex-col justify-center">
                        <div className="text-sm text-amber-500 mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                          </svg>
                          <span>{filteredFeaturedPosts[0].date}</span>
                          <span className="mx-2">•</span>
                          <span>{filteredFeaturedPosts[0].readTime}</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                          {filteredFeaturedPosts[0].title}
                        </h3>
                        
                        <p className="text-gray-400 mb-4">
                          {filteredFeaturedPosts[0].excerpt}
                        </p>
                        
                        <div className="mt-auto flex justify-between items-center">
                          <span className="text-sm text-gray-500">Por {filteredFeaturedPosts[0].author}</span>
                          <span className="text-amber-500 group-hover:text-amber-400 transition-colors flex items-center text-sm font-medium">
                            Ler artigo
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
              
              {/* Posts Secundários - Grid de 2 colunas */}
              {filteredFeaturedPosts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredFeaturedPosts.slice(1, 3).map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/blog/${post.id}`} className="group block h-full">
                        <div className="bg-gray-900/60 rounded-xl overflow-hidden border border-gray-800 hover:border-amber-700/50 transition-all duration-300 h-full shadow-lg">
                          <div className="relative h-48">
                            <Image 
                              src={post.image} 
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            
                            <div className="absolute top-3 right-3">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-600/90 text-white">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-5">
                            <h3 className="text-lg font-bold mb-3 group-hover:text-amber-400 transition-colors">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            
                            <div className="text-xs text-gray-500 flex items-center justify-between mt-auto">
                              <span>{post.date}</span>
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Posts terciários em grid flexível e responsivo */}
              {filteredFeaturedPosts.length > 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredFeaturedPosts.slice(3).map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="group bg-gray-900/30 rounded-lg overflow-hidden hover:bg-gray-900/50 transition-all duration-300 border border-gray-800 hover:border-amber-800/50 shadow-md"
                    >
                      <Link href={`/blog/${post.id}`} className="block h-full">
                        <div className="p-4 flex flex-col h-full">
                          <div className="flex justify-between items-start mb-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-700/70 text-white/90">
                              {post.category}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 group-hover:text-amber-500 transition-colors">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </div>
                          
                          <h3 className="text-base font-bold mb-2 group-hover:text-amber-400 transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          
                          <div className="mt-auto text-xs text-gray-600">
                            {post.date}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-700 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-400 mb-2">Nenhum artigo encontrado</h3>
              <p className="text-gray-500 max-w-md">Nenhum artigo corresponde aos critérios de busca atuais. Tente uma busca diferente ou selecione outra categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Histórica do Whisky */}
      <section 
        ref={timelineRef} 
        className="py-24 relative bg-gradient-to-b from-black to-gray-950"
      >
        {/* Decorações de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-amber-800/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-amber-800/20 to-transparent"></div>
          
          {/* Textura de mapa antigo */}
          <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('/blog/vintage-map.jpg')]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 max-w-xl"
          >
            <h2 className="text-4xl font-serif font-bold mb-4 flex items-center">
              <span className="text-amber-500 mr-2">1494</span>
              <span className="h-px flex-grow bg-amber-700"></span>
              <span className="mx-2">até</span>
              <span className="h-px flex-grow bg-amber-700"></span>
              <span className="text-amber-500 ml-2">Hoje</span>
            </h2>
            <h3 className="text-3xl font-serif mb-4">A Jornada do Whisky Através dos Séculos</h3>
            <p className="text-gray-400">
              Uma exploração visual pela fascinante história do whisky, desde suas origens monásticas até se tornar uma das bebidas mais apreciadas e diversas do mundo.
            </p>
          </motion.div>
          
          {/* Timeline Vertical */}
          <div className="relative pb-12">
            {/* Linha vertical central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-800 via-amber-700/50 to-amber-900/30"></div>
            
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative mb-16 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Conteúdo do evento */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-amber-500">{event.year}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-400 text-sm">{event.description}</p>
                </div>
                
                {/* Marcador central e imagem do outro lado */}
                <div className="z-10 flex items-center justify-center relative">
                  {/* Círculo marcador */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-amber-600 bg-black"></div>
                  
                  {/* Linha horizontal */}
                  <div className={`w-12 h-0.5 ${index % 2 === 0 ? '-mr-12' : '-ml-12'} bg-amber-700/70`}></div>
                </div>
                
                {/* Imagem do evento */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  <div className="relative h-40 rounded-lg overflow-hidden group">
                    <Image 
                      src={event.image} 
                      alt={event.title}
                      fill
                      className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-amber-900/40 mix-blend-color group-hover:opacity-0 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mapa Interativo de Destilarias */}
      <section 
        ref={mapRef} 
        className="py-24 relative bg-black overflow-hidden"
      >
        {/* Decorações de fundo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/blog/map-texture.jpg')]"></div>
          <div className="absolute bottom-0 left-0 w-full h-full" style={{
            background: 'linear-gradient(to top, rgb(0,0,0) 0%, transparent 20%)'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Mapa Global do <span className="text-amber-500">Whisky</span>
            </h2>
            <p className="text-gray-400">
              Uma exploração das destilarias mais emblemáticas do mundo, destacando as regiões produtoras e suas características distintivas.
            </p>
          </motion.div>
          
          {/* Mapa com visualização estilizada */}
          <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
            {/* Imagem de mapa com marcações */}
            <div className="relative aspect-video">
              <Image 
                src="/image.png"
                alt="Mapa mundial de destilarias de whisky"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Plotando pontos de regiões */}
              {distilleryRegions.map((region) => (
                region.distilleries.map((distillery, index) => (
                  <motion.div
                    key={`${region.region}-${distillery.name}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + distilleryRegions.indexOf(region) * 0.3,
                      type: "spring"
                    }}
                    viewport={{ once: true }}
                    className="absolute"
                    style={{
                      left: `calc(${(distillery.lng + 180) / 360 * 100}%)`,
                      top: `calc(${(90 - distillery.lat) / 180 * 100}%)`
                    }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full shadow-glow animate-pulse"
                      style={{ backgroundColor: region.color }}
                    ></div>
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs whitespace-nowrap">
                      {distillery.name}
                    </div>
                  </motion.div>
                ))
              ))}
            </div>
            
            {/* Legenda */}
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
              <h4 className="text-sm font-medium mb-2 text-white">Regiões Produtoras</h4>
              <div className="space-y-2">
                {distilleryRegions.map((region) => (
                  <div key={region.region} className="flex items-center text-xs">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: region.color }}
                    ></div>
                    <span>{region.region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Informações sobre regiões */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {distilleryRegions.map((region, index) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-lg p-5 hover:bg-gray-900/40 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div 
                    className="w-4 h-4 rounded-full mr-3" 
                    style={{ backgroundColor: region.color }}
                  ></div>
                  <h3 className="text-xl font-bold">{region.region}</h3>
                </div>
                
                <div className="space-y-3">
                  {region.distilleries.map((distillery) => (
                    <div key={distillery.name} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{distillery.name}</span>
                      <span className="text-amber-500/80 text-xs px-2 py-0.5 rounded-full bg-amber-900/20">
                        {distillery.type}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-5 pt-4 border-t border-gray-800">
                  <Link href="#" className="text-amber-500 hover:text-amber-400 transition-colors text-sm flex items-center">
                    Explorar região
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos e Workshops de Whisky */}
      <section 
        ref={cursosRef} 
        className="py-24 relative bg-gradient-to-b from-gray-950 to-black"
      >
        {/* Decorações de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-amber-800/20 to-transparent"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(146,64,14,0.05) 0%, rgba(0,0,0,0) 70%)' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-serif font-bold mb-4">
              Cursos e <span className="text-amber-500">Workshops</span>
            </h2>
            <p className="text-gray-400">
              Aprimore seus conhecimentos sobre whisky com nossos especialistas em sessões imersivas e educativas projetadas para todos os níveis de entusiastas.
            </p>
          </motion.div>
          
          {/* Grid de Cursos com Efeito Escalonado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {whiskyCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 80
                }}
                viewport={{ once: true }}
                className={`group relative bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-amber-700/50 transition-all duration-300 shadow-lg ${
                  index % 2 === 0 ? 'transform md:translate-y-8' : ''
                }`}
              >
                {/* Imagem de fundo */}
                <div className="relative h-48">
                  <Image 
                    src={course.image} 
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  
                  {/* Badge de nível */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                      course.level === 'Iniciante' 
                        ? 'bg-green-700/90' 
                        : course.level === 'Intermediário'
                        ? 'bg-amber-700/90'
                        : 'bg-red-700/90'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.dates.map((date, i) => (
                      <span key={i} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                        {date}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                      <span className="text-xs text-gray-400">{course.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span className="text-xs text-gray-400">{course.duration}</span>
                    </div>
                  </div>
                </div>
                
                {/* Preço e Botão de Inscrição */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent pt-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-500 font-bold">{course.price}</span>
                    <button className="px-4 py-2 bg-amber-600 rounded-full text-sm font-medium hover:bg-amber-500 transition-colors">
                      Inscrever-se
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA para mais cursos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link 
              href="/cursos" 
              className="px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-600 rounded-full text-base font-medium hover:from-amber-600 hover:to-amber-500 transition-colors inline-flex items-center justify-center shadow-lg shadow-amber-900/20"
            >
              Ver todos os cursos
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter com Design Assimétrico */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorações de fundo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black"></div>
          
          {/* Barra diagonal decorativa */}
          <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-amber-900/10 transform skew-x-12 -translate-x-20"></div>
          
          {/* Textura sutil */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/blog/texture-dark.png')]"></div>
          
          {/* Elementos circulares decorativos */}
          <div className="absolute top-20 right-20 w-40 h-40 rounded-full border border-amber-700/20 opacity-60"></div>
          <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full border border-amber-700/20 opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="md:col-span-1"
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  <span className="text-amber-500">Inscreva-se</span> em nossa Newsletter
                </h2>
                <p className="text-gray-400 mb-6">
                  Receba insights exclusivos, dicas de degustação e convites para eventos diretamente em seu email.
                </p>
                
                <div className="hidden md:block mt-8">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="relative w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-base font-medium mb-1">Cobertura Global</h5>
                      <p className="text-sm text-gray-500">Notícias e tendências de todas as regiões produtoras.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-6">
                    <div className="mr-4">
                      <div className="relative w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-base font-medium mb-1">Conteúdo Exclusivo</h5>
                      <p className="text-sm text-gray-500">Acesso antecipado a lançamentos e edições limitadas.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:col-span-2"
              >
                <form className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 border border-gray-800 shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
                        placeholder="seu.email@exemplo.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-400 mb-1">Interesses</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {['Single Malt', 'Bourbon', 'Blends', 'Colecionismo', 'Investimento', 'Harmonização'].map((interest) => (
                        <div key={interest} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`interest-${interest}`} 
                            name="interests" 
                            value={interest}
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
                        className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-amber-500 text-amber-600"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-400">
                        Concordo em receber comunicações da Thornfield. Consulte nossa <a href="#" className="text-amber-500 hover:underline">Política de Privacidade</a>.
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-amber-700 to-amber-500 text-white font-medium py-3 px-6 rounded-lg hover:from-amber-600 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-700/25 flex items-center justify-center"
                  >
                    <span>Assinar Newsletter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Botão Voltar ao Topo com Design Especial */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed right-6 bottom-6 z-50 w-12 h-12 rounded-full shadow-lg hover:shadow-amber-600/25 overflow-hidden group"
            aria-label="Voltar ao topo"
          >
            <div className="absolute inset-0 bg-amber-600 flex items-center justify-center transform group-hover:translate-y-full transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            </div>
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 border border-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-500">
                <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Aviso de Bebida Responsável */}
      <div className="fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-md py-2 text-center text-xs text-gray-400 border-t border-gray-800">
        Aprecie com moderação. O consumo de bebidas alcoólicas é proibido para menores de 18 anos.
      </div>
      
      {/* Estilos adicionais para transições e efeitos */}
      <style jsx global>{`
        .shadow-glow {
          box-shadow: 0 0 15px rgba(217, 119, 6, 0.5);
        }
        
        .shadow-glow-amber {
          box-shadow: 0 0 15px rgba(217, 119, 6, 0.3);
        }
        
        .shadow-glow-amber-lg {
          box-shadow: 0 0 25px rgba(217, 119, 6, 0.4);
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </main>
  );
}
