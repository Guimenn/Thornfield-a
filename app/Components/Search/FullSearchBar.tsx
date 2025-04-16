"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";
import whiskiesData from "../../data/whiskies.json";
import drinksData from "../../data/drinks.json";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Whisky {
  id: string;
  name: string;
  description: string;
  image: string;
  year: number;
  price: number;
  tasting_notes: string[];
  icon: string;
  quantity: number;
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
    
    const searchQuery = query.toLowerCase();
    const filteredWhiskies = whiskiesData.whiskies.filter(whisky => 
      whisky.name.toLowerCase().includes(searchQuery) ||
      whisky.description.toLowerCase().includes(searchQuery)
    );
    const filteredDrinks = drinksData.drinks.filter(drink =>
      drink.name.toLowerCase().includes(searchQuery) ||
      drink.baseWhisky.toLowerCase().includes(searchQuery) ||
      (drink.notes && drink.notes.some(note => note.toLowerCase().includes(searchQuery)))
    );
    setResults([...filteredWhiskies, ...filteredDrinks]);
    setIsSearching(false);
  };

  const handleItemClick = (item: any) => {
    if (item.description !== undefined) {
      // Produto whisky
      window.location.href = `/pages/produtos/${item.id}`;
    } else {
      // Drink
      window.location.href = `/pages/drinks/${item.id}`;
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
                  {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                  {item.price !== undefined && (
                    <p className="mt-1 text-sm font-medium text-amber-700">
                      R$ {item.price.toFixed(2)}
                    </p>
                  )}
                  {item.baseWhisky && !item.price && (
                    <p className="mt-1 text-xs text-gray-400">Drink com base: {item.baseWhisky}</p>
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
