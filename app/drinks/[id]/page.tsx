"use client";
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
        router.push('/drinks');
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

      {/* Hero Section */}
      <div className="relative h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={drink.image}
            alt={drink.name}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif mb-2">{drink.name}</h1>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-amber-700/60 text-white px-3 py-1 rounded-full text-sm">{drink.tipo}</span>
                  <span className="bg-black/50 border border-white/20 text-white/90 px-3 py-1 rounded-full text-sm">{drink.ocasiao}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Coluna 1: Informações do Drink */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] mb-4">Base</h2>
              <Link 
                href={`/produto/${drink.baseId}`} 
                className="text-2xl hover:text-amber-500 transition-colors"
              >
                {drink.baseWhisky}
              </Link>
              <p className="mt-2 text-white/70">{drink.estilo}</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10"
            >
              <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] mb-4">Notas Realçadas</h2>
              <div className="flex flex-wrap gap-2">
                {drink.notes.map((note, index) => (
                  <span 
                    key={index} 
                    className="bg-black border border-amber-800/30 px-4 py-2 rounded-full text-white/80"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Coluna 2: Receita e Preparo */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10"
            >
              <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] mb-4">Receita</h2>
              <ul className="space-y-3">
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
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-amber-500 text-sm uppercase tracking-[0.3em] mb-4">Toque Especial</h2>
              <p className="text-white/90 italic">{drink.toque}</p>
            </motion.div>
          </div>
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
              <Link href={`/drinks/${rec.id}`} className="block">
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
            href="/drinks"
            className="inline-block rounded-sm border border-amber-600 bg-transparent px-8 py-3 text-sm font-medium uppercase tracking-wide text-amber-600 transition-all duration-300 hover:bg-amber-600 hover:text-white"
          >
            Ver Todos os Drinks
          </Link>
        </div>
      </div>
    </div>
  );
} 