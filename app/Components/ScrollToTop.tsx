"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Função para verificar a posição do scroll
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Função para rolar para o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-all hidden md:block" // Adicionando classes para ocultar em telas menores
          aria-label="Voltar ao topo"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}