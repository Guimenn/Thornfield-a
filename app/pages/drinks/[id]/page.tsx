"use client";

import React from 'react';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Interface para a tipagem dos drinks
interface Drink {
  id: string;
  name: string;
  baseWhisky: string;
  notes: string[];
  recipe: string[];
  toque: string;
  estilo: string;
  baseId: string;
  tipo: string;
  ocasiao: string;
  image: string;
}

// Dados dos drinks (mesmos da página principal)
const drinks: Drink[] = [
  {
    id: "1",
    name: "Thornfield Flame",
    baseWhisky: "ULTRA RESERVE",
    notes: ["Canela", "Carvalho", "Especiarias"],
    recipe: [
      "50ml ULTRA RESERVE",
      "15ml licor de canela",
      "1 dash de bitters de laranja",
      "Finalize com casca de laranja flambada"
    ],
    toque: "Sirva em copo baixo com pedra grande de gelo e uma lasca de canela queimada",
    estilo: "Clássico com sofisticação rústica",
    baseId: "1",
    tipo: "Clássico",
    ocasiao: "Happy Hour",
    image: "/drinks-images/drink-1.png"
  },
  {
    id: "2",
    name: "Oak Noir",
    baseWhisky: "SHADOW OAK",
    notes: ["Chocolate", "Amoras", "Cravos"],
    recipe: [
      "50ml SHADOW OAK",
      "20ml licor de cacau",
      "20ml xarope de amora",
      "1 cravo-da-índia amassado"
    ],
    toque: "Decore com uma amora fresca e raspas de chocolate amargo",
    estilo: "Misterioso, intenso, ideal para noites longas",
    baseId: "2",
    tipo: "Doce",
    ocasiao: "Noite",
    image: "/drinks-images/drink-2.png"
  },
  {
    id: "3",
    name: "Golden Ember",
    baseWhisky: "MIDNIGHT GOLD",
    notes: ["Caramelo", "Gengibre", "Tabaco"],
    recipe: [
      "50ml MIDNIGHT GOLD",
      "15ml xarope de caramelo artesanal",
      "1 fatia fina de gengibre fresco",
      "Fumaça de folha de tabaco (opcional para defumar o copo)"
    ],
    toque: "Sirva em copo defumado, com gengibre cristalizado ao lado",
    estilo: "Marcante, para apreciadores ousados",
    baseId: "3",
    tipo: "Intenso",
    ocasiao: "Degustação",
    image: "/drinks-images/drink-3.png"
  },
  {
    id: "4",
    name: "Mist & Berry",
    baseWhisky: "BLUE MIST",
    notes: ["Blueberry", "Hortelã", "Eucalipto"],
    recipe: [
      "50ml BLUE MIST",
      "25ml licor de blueberry",
      "6 folhas de hortelã",
      "1 splash de água com gás levemente aromatizada de eucalipto"
    ],
    toque: "Sirva em taça alta com gelo e galho de hortelã fresco",
    estilo: "Refrescante, perfeito para dias claros",
    baseId: "4",
    tipo: "Refrescante",
    ocasiao: "Tarde",
    image: "/drinks-images/drink-4.png"
  },
  {
    id: "5",
    name: "Amber Hive",
    baseWhisky: "HONEY EMBER",
    notes: ["Mel", "Pêra", "Cravos"],
    recipe: [
      "50ml HONEY EMBER",
      "15ml licor de pêra",
      "1 colher de chá de mel",
      "1 cravo-da-índia"
    ],
    toque: "Sirva em taça pequena, finalize com uma fatia de pêra flambada no mel",
    estilo: "Doce, elegante e aconchegante",
    baseId: "5",
    tipo: "Doce",
    ocasiao: "Sobremesa",
    image: "/drinks-images/drink-5.png"
  },
  {
    id: "6",
    name: "Velvet Hearth",
    baseWhisky: "CRIMSON HEARTH",
    notes: ["Cereja", "Nozes", "Pimenta"],
    recipe: [
      "50ml CRIMSON HEARTH",
      "20ml licor de cereja",
      "1 noz moscada ralada por cima",
      "1 pitada de pimenta rosa moída"
    ],
    toque: "Sirva em copo estilo coupe, com cereja marasquino no fundo",
    estilo: "Aveludado e apaixonante",
    baseId: "6",
    tipo: "Frutado",
    ocasiao: "Celebração",
    image: "/drinks-images/drink-6.png"
  },
  {
    id: "7",
    name: "Green Essence",
    baseWhisky: "EMERALD WHISPER",
    notes: ["Maçã verde", "Hortelã", "Ervas"],
    recipe: [
      "50ml EMERALD WHISPER",
      "30ml suco de maçã verde natural",
      "10ml xarope de hortelã",
      "Raminho de alecrim batido"
    ],
    toque: "Sirva em copo longo com bastante gelo e uma fatia de maçã verde",
    estilo: "Herbal, jovem e revigorante",
    baseId: "7",
    tipo: "Refrescante",
    ocasiao: "Tarde",
    image: "/drinks-images/drink-7.png"
  },
  {
    id: "8",
    name: "Barrel Black",
    baseWhisky: "OBISIDIAN VEIL",
    notes: ["Café", "Especiarias", "Carvalho"],
    recipe: [
      "50ml OBISIDIAN VEIL",
      "25ml café espresso gelado",
      "10ml xarope de especiarias (canela, cardamomo, noz-moscada)"
    ],
    toque: "Sirva em copo baixo com borda de açúcar mascavo e cacau",
    estilo: "Intenso, direto, para os fortes",
    baseId: "8",
    tipo: "Intenso",
    ocasiao: "Noite",
    image: "/drinks-images/drink-8.png"
  },
  {
    id: "9",
    name: "Lunar Bloom",
    baseWhisky: "PHANTOM BLOOM",
    notes: ["Néctar da flor de lua", "Lavanda", "Açafrão"],
    recipe: [
      "50ml PHANTOM BLOOM",
      "20ml xarope de lavanda",
      "5 gotas de tintura de açafrão",
      "Água tônica floral (opcional)"
    ],
    toque: "Sirva em taça com pétalas comestíveis e gelo translúcido",
    estilo: "Etéreo, floral, memorável",
    baseId: "9",
    tipo: "Floral",
    ocasiao: "Especial",
    image: "/drinks-images/drink-9.png"
  },
  // Novos drinks adicionados
  {
    id: "10",
    name: "Old Noble",
    baseWhisky: "ULTRA RESERVE",
    notes: ["Canela", "Carvalho", "Amêndoas"],
    recipe: [
      "50ml de ULTRA RESERVE",
      "10ml de licor de amêndoas",
      "2 dashes de angostura",
      "Twist de laranja"
    ],
    toque: "Mexer no mixing glass com gelo e servir em copo baixo com gelo grande. Finalizar com o twist.",
    estilo: "Old Fashioned com nobreza",
    baseId: "1",
    tipo: "Clássico",
    ocasiao: "Noite",
    image: "/drinks-images/drink-10.png"
  },
  {
    id: "11",
    name: "Dark Berry Manhattan",
    baseWhisky: "SHADOW OAK",
    notes: ["Chocolate", "Frutas Escuras", "Vermute"],
    recipe: [
      "50ml de SHADOW OAK",
      "25ml de vermute tinto",
      "1 dash de licor de cassis ou amora",
      "Cereja preta para decorar"
    ],
    toque: "Mexer e coar em taça coupe. Finalizar com a cereja.",
    estilo: "Manhattan com toque frutado e misterioso",
    baseId: "2",
    tipo: "Sofisticado",
    ocasiao: "Encontro",
    image: "/drinks-images/drink-11.png"
  },
  {
    id: "12",
    name: "Smoky Ginger",
    baseWhisky: "MIDNIGHT GOLD",
    notes: ["Defumado", "Caramelo", "Gengibre"],
    recipe: [
      "45ml de MIDNIGHT GOLD",
      "60ml de ginger beer",
      "10ml de xarope de caramelo",
      "Gelo e fatia de gengibre"
    ],
    toque: "Montar no copo alto com gelo e decorar com fatia de gengibre fresco.",
    estilo: "Refrescante e intenso",
    baseId: "3",
    tipo: "Refrescante",
    ocasiao: "Happy Hour",
    image: "/drinks-images/drink-12.png"
  },
  {
    id: "13",
    name: "Highland Breeze",
    baseWhisky: "BLUE MIST",
    notes: ["Fresco", "Frutado", "Mentolado"],
    recipe: [
      "40ml de BLUE MIST",
      "20ml de licor de blueberry",
      "60ml de água tônica",
      "Folhas de hortelã"
    ],
    toque: "Servido em copo longo com muito gelo, hortelã e mirtilos frescos.",
    estilo: "Leve e refrescante",
    baseId: "4",
    tipo: "Refrescante",
    ocasiao: "Tarde",
    image: "/drinks-images/drink-13.png"
  },
  {
    id: "14",
    name: "Golden Hearth",
    baseWhisky: "HONEY EMBER",
    notes: ["Doce", "Quente", "Mel", "Especiarias"],
    recipe: [
      "45ml de HONEY EMBER",
      "15ml de xarope de mel com especiarias (cravo e canela)",
      "Suco de ½ limão",
      "Gelo"
    ],
    toque: "Shaker com todos os ingredientes, coar em copo baixo.",
    estilo: "Doce com toque cítrico",
    baseId: "5",
    tipo: "Doce",
    ocasiao: "Inverno",
    image: "/drinks-images/drink-14.png"
  },
  {
    id: "15",
    name: "Cherry Flame",
    baseWhisky: "CRIMSON HEARTH",
    notes: ["Frutado", "Picante", "Cereja"],
    recipe: [
      "45ml de CRIMSON HEARTH",
      "15ml de licor de cereja",
      "1 dash de bitter de pimenta",
      "Nozes tostadas como guarnição"
    ],
    toque: "Mexer com gelo, servir em taça baixa, finalizar com nozes sobre espeto.",
    estilo: "Frutado com toque picante",
    baseId: "6",
    tipo: "Frutado",
    ocasiao: "Comemoração",
    image: "/drinks-images/drink-15.png"
  },
  {
    id: "16",
    name: "Verdant Elixir",
    baseWhisky: "EMERALD WHISPER",
    notes: ["Herbal", "Fresco", "Maçã Verde"],
    recipe: [
      "40ml de EMERALD WHISPER",
      "15ml de licor de maçã verde",
      "30ml de chá verde gelado",
      "Gelo e raminho de alecrim"
    ],
    toque: "Agitar e servir em copo longo com bastante gelo.",
    estilo: "Refrescante e aromático",
    baseId: "7",
    tipo: "Refrescante",
    ocasiao: "Tarde",
    image: "/drinks-images/drink-16.png"
  },
  {
    id: "17",
    name: "Moon Blossom",
    baseWhisky: "PHANTOM BLOOM",
    notes: ["Floral", "Exótico", "Lavanda"],
    recipe: [
      "45ml de PHANTOM BLOOM",
      "15ml de licor de flor de sabugueiro",
      "Água com gás aromatizada com lavanda (ou soda cítrica)",
      "Pétalas comestíveis para decorar"
    ],
    toque: "Montado em taça balão com gelo e flores.",
    estilo: "Floral e delicado",
    baseId: "9",
    tipo: "Floral",
    ocasiao: "Ocasião Especial",
    image: "/drinks-images/drink-17.png"
  },
  {
    id: "18",
    name: "Thorned Crown",
    baseWhisky: "ULTRA RESERVE",
    notes: ["Amadeirado", "Sofisticado", "Picante"],
    recipe: [
      "50ml ULTRA RESERVE",
      "25ml vermute seco",
      "1 colher de licor de amêndoas",
      "Casca de laranja flambada"
    ],
    toque: "Servir em taça old fashioned com casca de laranja flambada.",
    estilo: "Amadeirado, sofisticado e levemente picante",
    baseId: "1",
    tipo: "Sofisticado",
    ocasiao: "Celebração",
    image: "/drinks-images/drink-18.png"
  },
  {
    id: "19",
    name: "Silva Notturna",
    baseWhisky: "SHADOW OAK",
    notes: ["Misterioso", "Frutado", "Especiado"],
    recipe: [
      "45ml SHADOW OAK",
      "20ml licor de cassis",
      "10ml xarope de baunilha",
      "Espuma de cravo"
    ],
    toque: "Servir em taça coupe com espuma de cravo.",
    estilo: "Misterioso, frutado e levemente doce com final especiado",
    baseId: "2",
    tipo: "Sofisticado",
    ocasiao: "Noite",
    image: "/drinks-images/drink-19.png"
  },
  {
    id: "20",
    name: "Golden Eclipse",
    baseWhisky: "MIDNIGHT GOLD",
    notes: ["Brilhante", "Defumado", "Envolvente"],
    recipe: [
      "50ml MIDNIGHT GOLD",
      "15ml licor de gengibre",
      "10ml licor de tabaco (infusão artesanal)",
      "Spray de ouro comestível"
    ],
    toque: "Servir em tumbler baixo com spray de ouro comestível.",
    estilo: "Brilhante, defumado e envolvente",
    baseId: "3",
    tipo: "Premium",
    ocasiao: "Ocasião Especial",
    image: "/drinks-images/drink-20.png"
  },
  {
    id: "21",
    name: "Breeze of Alba",
    baseWhisky: "BLUE MIST",
    notes: ["Refrescante", "Herbal", "Frutado"],
    recipe: [
      "40ml BLUE MIST",
      "25ml licor de blueberry",
      "10ml suco de limão siciliano",
      "Folhas de hortelã e gelo picado"
    ],
    toque: "Servir em copo Collins com muito gelo picado e hortelã fresca.",
    estilo: "Refrescante, herbal e frutado",
    baseId: "4",
    tipo: "Refrescante",
    ocasiao: "Tarde",
    image: "/drinks-images/drink-21.png"
  },
  {
    id: "22",
    name: "Solar Hive",
    baseWhisky: "HONEY EMBER",
    notes: ["Doce", "Aromático", "Amadeirado"],
    recipe: [
      "50ml HONEY EMBER",
      "20ml licor de pera",
      "1 colher de chá de mel trufado",
      "Ramo de alecrim tostado"
    ],
    toque: "Servir em taça tulipa com alecrim tostado.",
    estilo: "Doce, aromático e levemente amadeirado",
    baseId: "5",
    tipo: "Doce",
    ocasiao: "Pôr do sol",
    image: "/drinks-images/drink-22.png"
  },
  {
    id: "23",
    name: "Velvet Ember",
    baseWhisky: "ULTRA RESERVE",
    notes: ["Canela", "Noz-moscada", "Seco"],
    recipe: [
      "40ml ULTRA RESERVE",
      "20ml vermute seco envelhecido",
      "10ml licor de canela suave",
      "Raspas de noz-moscada"
    ],
    toque: "Copo baixo arredondado, gelo esférico, raspas flutuando e uma colher de prata descansando na borda.",
    estilo: "Stirred Negroni-style",
    baseId: "1",
    tipo: "Sofisticado",
    ocasiao: "Noite",
    image: "/drinks-images/drink-23.png"
  },
  {
    id: "24",
    name: "Obscura No.7",
    baseWhisky: "SHADOW OAK",
    notes: ["Chocolate", "Cereja", "Amadeirado"],
    recipe: [
      "50ml SHADOW OAK",
      "15ml licor de cacau amargo",
      "20ml vermute rosso envelhecido",
      "Bitter de cereja negra"
    ],
    toque: "Taça martini negra, decorada com um espiral de casca de uva e borda de açúcar queimado.",
    estilo: "Manhattan Dark Edition",
    baseId: "2",
    tipo: "Sofisticado",
    ocasiao: "Noite",
    image: "/drinks-images/drink-24.png"
  }
];

// Função para obter recomendações aleatórias
const getRandomRecommendations = (currentId: string, count: number = 3): Drink[] => {
  // Filtrar para remover o drink atual
  const otherDrinks = drinks.filter(drink => drink.id !== currentId);
  
  // Embaralhar o array
  const shuffled = [...otherDrinks].sort(() => 0.5 - Math.random());
  
  // Retornar os primeiros 'count' itens
  return shuffled.slice(0, count);
};

export default function DrinkDetail() {
  const router = useRouter();
  const [drink, setDrink] = useState<Drink | null>(null);
  const [recommendations, setRecommendations] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obter o ID da URL diretamente
    const path = window.location.pathname;
    const segments = path.split('/');
    const drinkId = segments[segments.length - 1];
    
    if (drinkId) {
      // Encontrar o drink pelo ID
      const foundDrink = drinks.find(d => d.id === drinkId);
      
      if (foundDrink) {
        setDrink(foundDrink);
        // Gerar recomendações aleatórias
        setRecommendations(getRandomRecommendations(drinkId));
      } else {
        // Redirecionar para página de drinks se não encontrar
        router.push('/pages/drinks');
      }
      
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-amber-600 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!drink) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section Redesenhada */}
      <div className="relative min-h-[85vh] bg-black">
        {/* Círculo decorativo */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-900/20 blur-3xl"></div>
        
        <div className="container mx-auto px-6 py-12">
          {/* Espaço para posicionar elementos na parte superior */}
          <div className="h-24"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Informações do Drink - Lado Esquerdo */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Botão Voltar */}
                <div className="mb-6">
                  <Link href="/pages/drinks" className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    <span>Voltar para Drinks</span>
                  </Link>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-serif mb-6">{drink.name}</h1>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-amber-700/60 text-white px-4 py-1.5 rounded-full text-sm">{drink.tipo}</span>
                  <span className="bg-black/50 border border-white/20 text-white/90 px-4 py-1.5 rounded-full text-sm">{drink.ocasiao}</span>
                </div>
                
                <p className="text-lg text-white/80 mb-8 max-w-lg">
                  {drink.estilo}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {drink.notes.map((note, index) => (
                    <span 
                      key={index} 
                      className="bg-black/40 border border-amber-800/30 px-4 py-1.5 rounded-full text-white/80"
                    >
                      {note}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={`/pages/produtos/${drink.baseId}`} 
                  className="inline-block rounded-sm border border-amber-600 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wide text-amber-600 transition-all duration-300 hover:bg-amber-600 hover:text-white"
                >
                  Conheça o {drink.baseWhisky}
                </Link>
              </motion.div>
            </div>
            
            {/* Imagem do Drink - Lado Direito */}
            <div className="order-1 lg:order-2 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[600px]"
              >
                {/* Borda elegante com gradiente */}
                <div className="absolute inset-0 -m-[1.5%] bg-gradient-to-tr from-amber-900/40 via-amber-600/20 to-amber-800/30 rounded-lg blur-sm"></div>
                
                {/* Imagem do drink com borda */}
                <div className="relative z-10 p-[0.3%] bg-gradient-to-br from-amber-800/50 via-amber-700/30 to-amber-900/50 rounded-lg overflow-hidden">
                  <div className="bg-black rounded-lg overflow-hidden p-[0.8%]">
                    <Image
                      src={drink.image}
                      alt={drink.name}
                      width={600}
                      height={800}
                      className="object-contain w-full h-auto rounded-lg"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12">
        {/* Seção de Receita */}
        <div className="max-w-3xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] mb-6">Receita</h2>
            <ul className="space-y-4 max-w-xl">
              {drink.recipe.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-amber-500 text-lg">•</span>
                  <span className="text-white/90">{ingredient}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] mb-4">Toque Especial</h2>
            <p className="text-white/90 italic max-w-2xl">{drink.toque}</p>
          </motion.div>
        </div>
        
        {/* Decoração */}
        <div className="my-16">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent"></div>
        </div>
      </div>
      
      {/* Recomendações */}
      <div className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl font-serif mb-10 text-center">Experimente Também</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group"
            >
              <Link href={`/pages/drinks/${rec.id}`} className="block">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={rec.image}
                    alt={rec.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-serif text-white">{rec.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs text-amber-500 bg-black/60 px-3 py-1 rounded-full">{rec.tipo}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/pages/drinks"
            className="inline-block rounded-sm border border-amber-600 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wide text-amber-600 transition-all duration-300 hover:bg-amber-600 hover:text-white"
          >
            Ver Todos os Drinks
          </Link>
        </div>
      </div>
    </div>
  );
} 