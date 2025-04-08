"use client";
import { useState, useEffect, useRef } from "react";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullSearchBar({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    { id: number; name: string; description: string; price: number }[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [popularSearches] = useState([
    "Single Malt",
    "Bourbon",
    "Whisky Japonês",
    "Scotch",
    "Irish Whiskey",
  ]);
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
  }, [query]); // Add eslint-disable comment below

  // Add this comment below the useEffect
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleSearch = async () => {
    if (query.trim() === "") return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/bebida?q=${encodeURIComponent(query)}`,
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Erro na pesquisa:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleProductClick = (id: number) => {
    window.location.href = `/produto/${id}`;
    setQuery("");
    setResults([]);
    onClose();
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
  };

  // Add this effect to disable scrolling when search is open
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    }
    
    // Re-enable scrolling when component unmounts or search closes
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
        />
      </div>

      {isSearching && (
        <div className="absolute top-[25px] right-12">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-600 border-t-transparent"></div>
        </div>
      )}

      {query.trim() !== "" && (
        <div className="absolute top-[70px] right-0 left-0 z-50 max-h-[80vh] overflow-y-auto bg-white shadow-lg">
          {results.length > 0 ? (
            <div className="mx-auto max-w-4xl divide-y divide-gray-100">
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleProductClick(item.id)}
                  className="flex cursor-pointer items-center p-4 transition-colors duration-200 hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                   
                  </div>
                </div>
              ))}
            </div>
          ) : query.trim() !== "" && !isSearching ? (
            <div className="p-6 text-center text-gray-500">
              <p>Nenhum resultado encontrado para &quot;{query}&quot;</p>
            </div>
          ) : null}

          {query.trim() === "" && (
            <div className="mx-auto max-w-2xl p-6">
              <h3 className="mb-4 text-center font-medium text-gray-900">
                Pesquisas populares
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handlePopularSearch(term)}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-800 transition-colors duration-200 hover:bg-amber-100"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
