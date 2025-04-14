"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Whisky {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export default function FullSearchBar({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== "") {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setIsSearching(true);
    
    // Simulação de resultados para demonstração
    // Em produção, substitua por chamada real à API
    setTimeout(() => {
      // Banco de dados simulado de whiskies e páginas
      const whiskies: Whisky[] = [
        {
          id: "1",
          name: "ULTRA RESERVE",
          description: "Clássico e refinado, com notas profundas reveladas pelo carvalho nobre.",
          image: "/whiskys-fundo/10.png",
          price: 599.90,
          category: "Produtos"
        },
        {
          id: "2",
          name: "SHADOW OAK",
          description: "Misterioso e encorpado, um blend que carrega o legado da tradição.",
          image: "/whiskys-fundo/11.png",
          price: 499.90,
          category: "Produtos"
        },
        {
          id: "3",
          name: "MIDNIGHT GOLD",
          description: "Defumado e intenso, com brilho dourado e presença marcante.",
          image: "/whiskys-fundo/12.png",
          price: 229.90,
          category: "Produtos"
        },
        {
          id: "4",
          name: "BLUE MIST",
          description: "Suave e fresco, inspirado na bruma das montanhas escocesas.",
          image: "/whiskys-fundo/13.png",
          price: 119.90,
          category: "Produtos"
        },
        {
          id: "5",
          name: "HONEY EMBER",
          description: "Doce e especiado, com calor sutil vindo dos barris europeus",
          image: "/whiskys-fundo/14.png",
          price: 199.90,
          category: "Produtos"
        },
        {
          id: "6",
          name: "CRIMSON HEARTH",
          description: "Aveludado e vibrante, com notas que aquecem como um lar acolhedor.",
          image: "/whiskys-fundo/15.png",
          price: 359.90,
          category: "Produtos"
        },
        {
          id: "7",
          name: "EMERALD WHISPER",
          description: "Verde e herbal, com frescor elegante e alma atlântica.",
          image: "/whiskys-fundo/16.png",
          price: 139.90,
          category: "Produtos"
        },
        {
          id: "8",
          name: "OBISIDIAN VEIL",
          description: "Cru e potente, engarrafado direto do barril, sem concessões.",
          image: "/whiskys-fundo/17.png",
          price: 669.90,
          category: "Produtos"
        },
        {
          id: "9",
          name: "PHANTOM BLOOM",
          description: "Florido e raro, um tributo delicado à história da Thornfield.",
          image: "/whiskys-fundo/18.png",
          price: 899.90,
          category: "Produtos"
        }
      ];
      
      // Páginas e coleções
      const pages = [
        {
          id: "10",
          name: "Nossa História",
          description: "Conheça a história da Thornfield",
          price: 0,
          category: "Páginas"
        },
        {
          id: "11",
          name: "Processo de Fabricação",
          description: "Como fazemos nossos whiskies",
          price: 0,
          category: "Páginas"
        },
        {
          id: "12",
          name: "Coleção Premium",
          description: "Nossa linha exclusiva de produtos",
          price: 0,
          category: "Coleções"
        }
      ];

      // Formatar whiskies para o formato de resultado
      const whiskiesResults = whiskies.map(whisky => ({
        id: whisky.id,
        name: whisky.name,
        description: whisky.description,
        price: whisky.price,
        image: whisky.image,
        category: "Produtos"
      }));
      
      const allItems = [...whiskiesResults, ...pages];
      
      // Filtra apenas se houver correspondência no nome ou descrição
      const filteredResults = allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filteredResults);
      setIsSearching(false);
    }, 300);
  };

  const handleItemClick = (item: any) => {
    if (item.category === "Produtos") {
      window.location.href = `/produto/${item.id}`;
    } else {
      window.location.href = `/${item.name.toLowerCase().replace(/ /g, "-")}`;
    }
    setQuery("");
    setResults([]);
    onClose();
  };

  // Disable scrolling when search is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative flex w-full justify-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar"
          className="w-[49%] border-b border-black/20 bg-transparent py-2 text-black placeholder:text-black/50 focus:outline-none"
          autoComplete="off"
        />
        
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-[26%] top-[50%] -translate-y-1/2 text-black/50 hover:text-black"
          >
            <svg width="28" height="28" viewBox="0 0 32 32"><g fill="currentColor"><path d="m14.585 16-4.95 4.95 1.415 1.414L22.364 11.05l-1.415-1.414-4.95 4.95-4.949-4.95-1.414 1.414 4.95 4.95ZM20.95 22.364l-3.536-3.536 1.414-1.414 3.536 3.536-1.415 1.414Z"></path></g></svg>
          </button>
        )}
      </div>

      {isSearching && (
        <div className="absolute top-[25px] right-12">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-600 border-t-transparent"></div>
        </div>
      )}

      {/* Resultados da pesquisa */}
      {query.trim() !== "" && results.length > 0 && !isSearching && (
        <div className="absolute top-[70px] right-0 left-0 z-50 max-h-[80vh] overflow-y-auto bg-white shadow-lg">
          <div className="mx-auto max-w-4xl divide-y divide-gray-100">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="flex cursor-pointer items-center p-4 transition-colors duration-200 hover:bg-gray-50"
              >
                {item.image && (
                  <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  {item.category === "Produtos" && item.price > 0 && (
                    <p className="mt-1 text-sm font-medium text-amber-700">
                      R$ {item.price.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
