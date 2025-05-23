"use client";
import React, { useState, useEffect, useRef, RefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '../../Components/Footer/Footer';
import Newsletter from '../../Components/Sections/Newsletter';

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [visiblePostsCount, setVisiblePostsCount] = useState(7);
  
  // Refs para as seções para scroll com tipo correto
  const heroRef = useRef<HTMLElement>(null);
  const destaquesRef = useRef<HTMLElement>(null);
  const artigosRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLElement>(null);
  const cursosRef = useRef<HTMLElement>(null);
  
  // Para efeitos de parallax - simplificado para evitar erros com useScroll e useTransform
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calcular valores de transformação baseados no scroll
  const heroY = -scrollY * 0.1;
  const heroOpacity = 1 - scrollY * 0.001;
  const rotateVal = scrollY * 0.2;

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
    'Tendências'
  ];

  // Artigos em destaque
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
    },
    {
      id: '3',
      title: 'Além do Paladar: A Ciência das Notas de Degustação',
      excerpt: 'Um mergulho profundo na neurociência e química por trás da percepção de sabores ao degustar whiskies premium.',
      image: '/blog/artigo3.png',
      date: '15 Out 2023',
      author: 'Elena Rodriguez',
      category: 'Degustação',
      readTime: '10 min de leitura',
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
    }
  ];
   
  // Timeline histórica do whisky
  const timelineEvents = [
    {
      year: '1494',
      title: 'Primeiros Registros',
      description: 'Primeira menção documentada da destilação de whisky na Escócia: "Eight bolls of malt to Friar John Cor wherewith to make aqua vitae".',
      image: '/blog/barris.png',
    },
    {
      year: '1608',
      title: 'Destilaria Licenciada',
      description: 'Bushmills na Irlanda recebe a primeira licença oficial para destilar whisky do Rei James I.',
      image: '/blog/antiguidade.png',
    },
    {
      year: '1831',
      title: 'Revolução na Destilação',
      description: 'Invenção do alambique de coluna por Aeneas Coffey, revolucionando a produção de whisky de grãos.',
      image: '/blog/alambique.png',
    },
    {
      year: '1880s',
      title: 'Era Dourada',
      description: 'Boom na indústria do whisky escocês, com exportações em massa para todo o mundo.',
      image: '/blog/whiskys.png',
    },
    {
      year: '1920-1933',
      title: 'Proibição Americana',
      description: 'A Lei Seca nos EUA força o fechamento de muitas destilarias, enquanto outras prosperam com vendas ilegais.',
      image: '/blog/proibicao.png',
    },
    {
      year: '1950s',
      title: 'Globalização',
      description: 'Whisky escocês se torna um símbolo de status global, com marcas como Johnnie Walker dominando mercados internacionais.',
      image: '/blog/copos.png',
    },
    {
      year: '1980s',
      title: 'Crise e Fechamentos',
      description: 'Dezenas de destilarias escocesas fecham devido à superprodução e queda na demanda.',
      image: '/blog/closed.png',
    },
    {
      year: '2000s',
      title: 'Revolução Craft',
      description: 'Surgimento de microdestilarias artesanais, especialmente nos EUA, Japão e outros países não tradicionais.',
      image: '/blog/micro.png',
    },
    {
      year: '2020s',
      title: 'Era da Experimentação',
      description: 'Inovações em maturação, terminações em barris especiais e destilação sustentável definem a nova era do whisky global.',
      image: '/blog/atual.png',
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

  const visiblePosts = filteredFeaturedPosts.slice(0, visiblePostsCount);
  const hasMorePosts = visiblePosts.length < filteredFeaturedPosts.length;

  const loadMorePosts = () => {
    setVisiblePostsCount(prevCount => prevCount + 7);
  };

  const resetPostsCount = () => {
    setVisiblePostsCount(7);
  };

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

<section>
        {/* Hero Section Diagonal Split */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          {/* Background - Diagonal Split with Parallax */}
          <div className="absolute inset-0">
            {/* Lado esquerdo escuro com textura */}
            <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-black">
              <div className="absolute inset-0 opacity-10 bg-[url('/blog/texture-dark.png')]"></div>
            </div>
        
            {/* Lado direito com imagem */}
            <motion.div
              style={{ transform: `translateY(${heroY}px)` }}
              className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-30 md:opacity-75"
            >
              <div className="absolute inset-0">
                <Image
                  src="/blog/banner.png"
                  alt="Whisky"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black"></div>
            </motion.div>
        
            {/* Linha diagonal divisória - visível apenas em telas médias e maiores */}
            <div className="absolute top-0 left-1/2 h-[200vh] w-10 bg-gradient-to-r from-amber-800 to-transparent transform -translate-x-1/2 -skew-x-12 z-0 hidden md:block"></div>
          </div>
        
          {/* Conteúdo do Hero */}
          <div className="relative z-10 h-full container mx-auto px-4 py-10 md:py-20 flex flex-col justify-center">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-bold mb-4 md:mb-6 leading-tight">
                  O <span className="text-amber-500">Universo</span> <br className="hidden sm:block" />
                  do Whisky
                </h1>
        
                <div className="flex items-center mb-4 md:mb-8">
                  <div className="h-px w-12 md:w-16 bg-amber-700"></div>
                  <p className="text-amber-500 ml-3 text-lg md:text-xl font-medium">Thornfield Blog</p>
                </div>
        
                <p className="text-base md:text-lg text-gray-300 max-w-lg">
                  Narrativas, descobertas e experiências exclusivas no fascinante mundo das bebidas premium.
                </p>
              </motion.div>
        
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 md:mt-8"
              >
                <button
                  onClick={() => destaquesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-amber-600 rounded-full text-sm sm:text-base font-medium hover:bg-amber-500 transition-colors inline-flex items-center justify-center group"
                >
                  Explorar artigos
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
        
                <button
                  onClick={() => timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border border-amber-700 rounded-full text-sm sm:text-base font-medium hover:bg-amber-900/30 transition-colors inline-flex items-center justify-center"
                >
                  História do whisky
                </button>
              </motion.div>
            </div>
        
            {/* Decoração */}
            <motion.div
              style={{ rotate: `${rotateVal}deg` }}
              className="absolute bottom-5 right-5 md:bottom-10 md:right-10 w-20 h-20 md:w-32 md:h-32 opacity-20"
            >
              <Image
                src="/texto-logo2.png"
                alt=""
                width={150}
                height={150}
              />
            </motion.div>
          </div>
        </section>




        {/* Destaques - Layout Melhorado */}
        <section
          ref={destaquesRef}
          className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-950"
        >
          {/* Decorações de fundo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-[200px] md:w-[320px] h-[200px] md:h-[320px] bg-amber-900/10 rounded-full blur-3xl"></div>
            <div className="absolute top-[50%] right-[-128px] w-[250px] md:w-[384px] h-[250px] md:h-[384px] bg-amber-800/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-[25%] w-full h-[1px] bg-gradient-to-r from-transparent via-amber-800/30 to-transparent"></div>
          </div>
        
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Cabeçalho Moderno e Limpo */}
            <div className="mb-10 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white border-l-4 border-amber-500 pl-4">Em Destaque</h2>
              </motion.div>
        
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 mt-4 md:mt-6">
                <p className="text-gray-400 max-w-lg text-sm md:text-base">
                  Nossas seleções especiais de artigos para os entusiastas e colecionadores mais exigentes.
                </p>
        
                {activeFilter !== 'Todos' && (
                  <button
                    onClick={() => setActiveFilter('Todos')}
                    className="text-amber-500 hover:text-amber-400 transition-colors flex items-center self-start text-sm md:text-base"
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
            <div className="relative mb-8 md:mb-12">
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent z-10"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black to-transparent z-10"></div>
              <div 
                className="flex overflow-x-auto ml-2 scrollbar-hide py-2 space-x-2 md:space-x-3 cursor-grab active:cursor-grabbing"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
                onMouseDown={(e) => {
                  const ele = e.currentTarget;
                  let pos = { left: ele.scrollLeft, x: e.clientX };

                  const mouseMoveHandler = (e: MouseEvent) => {
                    const dx = e.clientX - pos.x;
                    ele.scrollLeft = pos.left - dx;
                  };

                  const mouseUpHandler = () => {
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    document.removeEventListener('mouseup', mouseUpHandler);
                  };

                  document.addEventListener('mousemove', mouseMoveHandler);
                  document.addEventListener('mouseup', mouseUpHandler);
                }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm whitespace-nowrap rounded-lg transition-all duration-300 select-none ${
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
            <div className="relative max-w-xl mx-auto mb-8 md:mb-12">
              <input
                type="text"
                placeholder="Busque por artigos ou tópicos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full bg-gray-900/80 backdrop-blur-sm border ${isSearchFocused ? 'border-amber-500' : 'border-gray-700'} rounded-lg py-2 md:py-3 px-4 md:px-6 pr-10 md:pr-12 outline-none focus:shadow-lg transition-all duration-300 text-sm md:text-base`}
              />
              <div className="absolute right-3 md:right-4 top-2 md:top-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 md:w-6 md:h-6 ${isSearchFocused ? 'text-amber-500' : 'text-gray-600'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>
        
            {/* Layout de Destaques Melhorado - Evita sobreposição */}
            {visiblePosts.length > 0 ? (
              <div className="space-y-8 md:space-y-12">
                {/* Post Principal - Maior */}
                {visiblePosts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Link href={`/pages/blog/${visiblePosts[0].id}`} className="group block">
                      <div className="flex flex-col md:flex-row bg-gray-900/60 rounded-xl overflow-hidden border border-gray-800 hover:border-amber-700/50 transition-all duration-300 shadow-xl">
                        <div className="relative h-48 sm:h-60 md:h-auto md:w-1/2">
                          <Image
                            src={visiblePosts[0].image}
                            alt={visiblePosts[0].title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/70 md:to-transparent"></div>
        
                          <div className="absolute top-3 md:top-4 left-3 md:left-4">
                            <span className="px-2 py-0.5 md:px-3 md:py-1 text-xs font-medium rounded-full bg-amber-600/90 text-white">
                              {visiblePosts[0].category}
                            </span>
                          </div>
                        </div>
        
                        <div className="p-4 md:p-6 md:w-1/2 flex flex-col justify-center">
                          <div className="text-xs md:text-sm text-amber-500 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4 mr-1">
                              <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                            </svg>
                            <span>{visiblePosts[0].date}</span>
                            <span className="mx-2">•</span>
                            <span>{visiblePosts[0].readTime}</span>
                          </div>
        
                          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-amber-400 transition-colors line-clamp-2 md:line-clamp-none">
                            {visiblePosts[0].title}
                          </h3>
        
                          <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base line-clamp-2 md:line-clamp-none">
                            {visiblePosts[0].excerpt}
                          </p>
        
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-xs md:text-sm text-gray-500">Por {visiblePosts[0].author}</span>
                            <span className="text-amber-500 group-hover:text-amber-400 transition-colors flex items-center text-xs md:text-sm font-medium">
                              Ler artigo
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4 ml-1 transform group-hover:translate-x-1 transition-transform">
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
                {visiblePosts.length > 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {visiblePosts.slice(1, 3).map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: index * 0.1 }}
                      >
                        <Link href={`/pages/blog/${post.id}`} className="group block h-full">
                          <div className="bg-gray-900/60 rounded-xl overflow-hidden border border-gray-800 hover:border-amber-700/50 transition-all duration-300 h-full shadow-lg">
                            <div className="relative h-40 sm:h-48">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
                              <div className="absolute top-2 md:top-3 right-2 md:right-3">
                                <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-xs font-medium rounded-full bg-amber-600/90 text-white">
                                  {post.category}
                                </span>
                              </div>
                            </div>
        
                            <div className="p-3 md:p-5">
                              <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                                {post.title}
                              </h3>
        
                              <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
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
                {visiblePosts.length > 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                    {visiblePosts.slice(3).map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group bg-gray-900/30 rounded-lg overflow-hidden hover:bg-gray-900/50 transition-all duration-300 border border-gray-800 hover:border-amber-800/50 shadow-md"
                      >
                        <Link href={`/pages/blog/${post.id}`} className="block h-full">
                          <div className="p-3 md:p-4 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-2 md:mb-3">
                              <span className="px-1.5 py-0.5 md:px-2 md:py-1 text-xs font-medium rounded-full bg-amber-700/70 text-white/90">
                                {post.category}
                              </span>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-amber-500 transition-colors">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                              </svg>
                            </div>
        
                            <h3 className="text-sm md:text-base font-bold mb-1.5 md:mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
        
                            <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
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
              <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-gray-700 mb-3 md:mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <h3 className="text-lg md:text-xl font-medium text-gray-400 mb-2">Nenhum artigo encontrado</h3>
                <p className="text-gray-500 max-w-md text-sm md:text-base">Nenhum artigo corresponde aos critérios de busca atuais. Tente uma busca diferente ou selecione outra categoria.</p>
              </div>
            )}
            {hasMorePosts || visiblePostsCount > 7 ? (
              <div className="flex flex-col sm:flex-row justify-center items-center mt-8 md:mt-12 space-y-3 sm:space-y-0 sm:space-x-4">
                {hasMorePosts && (
                  <button
                    onClick={loadMorePosts}
                    className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-amber-700 hover:bg-amber-600 rounded-full text-white text-sm md:text-base font-medium transition-colors flex items-center justify-center shadow-lg shadow-amber-900/20"
                  >
                    <span>Ver mais artigos</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                )}
        
                {visiblePostsCount > 7 && (
                  <button
                    onClick={resetPostsCount}
                    className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-white text-sm md:text-base font-medium transition-colors flex items-center justify-center shadow-lg shadow-gray-900/20"
                  >
                    <span>Ver menos</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                    </svg>
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </section>
      </section>

      {/* Timeline Histórica do Whisky */}
      <section 
        ref={timelineRef} 
        className="py-24 relative bg-gradient-to-b from-black to-gray-950"
      >
        {/* Decorações de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-amber-600/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/20 to-transparent"></div>
          
          {/* Textura de mapa antigo */}
          <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('/blog/vintage-map.jpg')]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
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
                  <div className="relative h-72 rounded-lg overflow-hidden group">
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
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('/pages/blog/map-texture.jpg')]"></div>
          <div className="absolute bottom-0 left-0 w-full h-full" style={{
            background: 'linear-gradient(to top, rgb(0,0,0) 0%, transparent 20%)'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                src="/blog/mapa.png"
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
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + distilleryRegions.indexOf(region) * 0.3,
                      type: "spring"
                    }}
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     <Newsletter/>


      <Footer/>
     
      
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
