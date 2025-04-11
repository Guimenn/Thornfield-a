"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
  LogOut,
} from "lucide-react";
import "./navbar.css";
import FullSearchBar from "../Search/FullSearchBar";
import Button from "../Ui/Button";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Você pode substituir isso pela sua lógica de autenticação
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { items, removeItem, updateQuantity, total } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      if (currentScrollY > 50) {
        setScrolled(true);
        setIsVisible(!isScrollingDown);
      } else {
        setScrolled(false);
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleOpenMenu = () => {
    setIsOpen(true);
    // Atualiza o índice da imagem para a próxima do array
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagensMenu.length);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    // Redirecionar para a página inicial ou login
    window.location.href = '/';
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const menuItems = [
    { name: "INÍCIO", href: "/" },
    { name: "NOSSA HISTÓRIA", href: "/historia" },
    { name: "COLEÇÃO", href: "/colecao" },
    { name: "PROCESSO", href: "/processo" },
    { name: "EXPERIÊNCIAS", href: "/experiencias" },
  ];

  const imagensMenu = [
    {
      imagem: "/foto-menu/1.png",
      alt: "Imagem do Menu 1",
    },
    {
      imagem: "/foto-menu/2.png",
      alt: "Imagem do Menu 2",
    },
    {
      imagem: "/foto-menu/3.png",
      alt: "Imagem do Menu 3",
    },
    {
      imagem: "/foto-menu/4.png",
      alt: "Imagem do Menu 4",
    },
    {
      imagem: "/foto-menu/5.png",
      alt: "Imagem do Menu 5",
    },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed z-30 w-full transition-all duration-500 ${
          scrolled ? "navbar-blur" : "bg-transparent"
        } ${!isVisible ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="grid h-[70px] grid-cols-[1fr_180px_1fr]">
          {/* Esquerda - Menu */}
          <div className="flex h-[70px] items-center justify-start border-b border-white">
            <button
              onClick={handleOpenMenu}
              className={`menu-button group ml-7 rounded-full p-3 transition-colors duration-300 cursor-pointer hover:bg-white/5 ${isOpen ? "hidden" : ""}`}
              aria-label="Abrir Menu"
            >
              <div className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>

          {/* Centro */}
          <div
            className={`flex items-center justify-center transition-all duration-500 ${
              !isVisible || isSearchOpen
                ? "-translate-y-full opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <a
              className="translate-y-[20px] transform transition-transform duration-300 hover:scale-105"
              href="/"
            >
              <img src="/cabra.png" alt="Logo Thornfield" className="w-40" />
            </a>
          </div>

          {/* Direita - Ícones */}
          <div className="flex h-[70px] items-center justify-end space-x-4 border-b border-white pr-8">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  key="searchBar"
                  initial={{ y: -70, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -70, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute top-0 left-0 z-50 flex h-[70px] w-full items-center bg-white px-4 shadow-md"
                >
                  <div className="w-full flex-1 px-8">
                    <FullSearchBar
                      isOpen={isSearchOpen}
                      onClose={handleSearchClick}
                    />
                  </div>
                  <button
                    onClick={handleSearchClick}
                    className="relative text-black transition-colors duration-300 hover:text-amber-600"
                    aria-label="Fechar pesquisa"
                  >
                    <div className="absolute -inset-2 rounded-full bg-black/0 transition-all duration-300 hover:bg-black/5"></div>
                    <svg className="relative z-10" width="28" height="28" viewBox="0 0 32 32"><g fill="currentColor"><path d="m14.585 16-4.95 4.95 1.415 1.414L22.364 11.05l-1.415-1.414-4.95 4.95-4.949-4.95-1.414 1.414 4.95 4.95ZM20.95 22.364l-3.536-3.536 1.414-1.414 3.536 3.536-1.415 1.414Z"></path></g></svg>
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="searchIcon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={handleSearchClick}
                  className="relative text-white transition-colors duration-300 hover:text-amber-600"
                  aria-label="Abrir pesquisa"
                >
                  <div className="absolute cursor-pointer -inset-2 rounded-full bg-white/0 transition-all duration-300 hover:bg-white/5"></div>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    className="relative z-10"
                  >
                    <g fill="currentColor">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22 15C22 18.866 18.866 22 15 22C11.134 22 8 18.866 8 15C8 11.134 11.134 8 15 8C18.866 8 22 11.134 22 15ZM20 15C20 17.7614 17.7614 20 15 20C12.2386 20 10 17.7614 10 15C10 12.2386 12.2386 10 15 10C17.7614 10 20 12.2386 20 15Z"
                      ></path>
                      <path d="M24.9641 22.5956C23.8769 21.9679 22.8868 21.1928 21.9684 20.2877L20.5646 21.7123C21.5891 22.7219 22.7127 23.6052 23.9641 24.3277L24.9641 22.5956Z"></path>
                    </g>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Ícone de Usuário */}
            <div className="group relative h-[32px]">
              <button
                onClick={handleUserMenuToggle}
                className="relative text-white transition-colors duration-300 hover:text-amber-600 "
                aria-label="Menu do usuário"
              >
                <div className="absolute -inset-2 rounded-full bg-white/0 transition-all duration-300 group-hover:bg-white/5"></div>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  className="relative z-10"
                >
                  <g fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M19.274 16.78A5 5 0 1 0 16 18c3.192 0 6 3.004 6 7h2c0-3.585-1.898-6.796-4.726-8.22ZM19 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M10 25c0-2.375 1.013-4.441 2.516-5.696l-1.282-1.535C9.25 19.424 8 22.064 8 25h2Z"></path>
                  </g>
                </svg>
              </button>

              {/* Menu do Usuário - Desktop (hover) / Mobile (click) */}
              <div
                className={`absolute top-full right-[-50px] z-50 mt-2 w-[130px] rounded-lg border border-white/10 bg-gradient-to-b from-black/95 to-black/90 shadow-lg shadow-black/50 backdrop-blur-sm transition-all duration-300 
                md:invisible md:translate-y-2 md:transform md:opacity-0 md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100
                ${isUserMenuOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0 md:invisible md:translate-y-2 md:opacity-0"}`}
              >
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="group/item flex w-full items-center space-x-2 px-4 py-2.5 text-left text-sm text-white/90 transition-all duration-300 hover:bg-white/10 cursor-pointer"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-white/0 transition-all duration-300 group-hover/item:bg-white/5"></div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="relative z-10"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                    </div>
                    <span className="relative z-10">Sair</span>
                  </button>
                ) : (
                  <a
                    href="/Login"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="group/item flex items-center space-x-2 rounded-lg px-4 py-2.5 text-sm text-white/90 transition-all duration-300 hover:bg-white/10"
                  >
                    <div className="relative rounded-full">
                      <div className="absolute -inset-1 rounded-full bg-white/0 transition-all duration-300 group-hover/item:bg-white/5"></div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="relative z-10"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                      </svg>
                    </div>
                    <span className="relative z-10">Entrar</span>
                  </a>
                )}
              </div>
            </div>

            {/* Ícone de Sacola */}
            <button
              onClick={handleCartClick}
              className="relative text-white transition-colors duration-300 hover:text-amber-600 cursor-pointer"
              aria-label="Carrinho de compras"
            >
              <div className="absolute -inset-2 rounded-full bg-white/0 transition-all duration-300 hover:bg-white/5"></div>
              <svg width="32" height="32" viewBox="0 0 32 32">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12 11v1H8v13h16V12h-4v-1a4 4 0 0 0-8 0Zm4-2a2 2 0 0 0-2 2v5h-2v-2h-2v9h12v-9h-2v2h-2v-2h-2v-2h2v-1a2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Fullscreen */}
      <div
        className={`fixed inset-0 z-50 h-full w-full transition-all duration-500 ${
          isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleCloseMenu}
        />

        {/* Grid de duas colunas */}
        <div
          className={`grid h-full grid-cols-1 md:grid-cols-[65%_35%] ${
            isOpen ? "menu-wave" : "opacity-0"
          }`}
        >
          {/* Coluna do Menu */}
          <div className="relative flex flex-col bg-[#111111] p-4 md:p-16">
            {/* Botão Fechar */}
            <button
              onClick={handleCloseMenu}
              className="absolute top-8 left-8 p-2 text-white/70 transition-colors duration-300 hover:text-white"
              aria-label="Fechar Menu"
            >
              <svg width="32" height="32" viewBox="0 0 32 32"><g fill="currentColor"><path d="m14.585 16-4.95 4.95 1.415 1.414L22.364 11.05l-1.415-1.414-4.95 4.95-4.949-4.95-1.414 1.414 4.95 4.95ZM20.95 22.364l-3.536-3.536 1.414-1.414 3.536 3.536-1.415 1.414Z"></path></g></svg>
            </button>

            <div className="h-full md:grid md:grid-cols-[1fr_250px]">
              {/* Coluna do Menu */}
              <div className="md:pt-[200px] md:pl-[100px]">
                {/* Links do Menu */}
                <nav className="flex-1" aria-label="Menu de Navegação">
                  <ul className="space-y-8">
                    {menuItems.map((item) => (
                      <li
                        key={item.name}
                        className="menu-item text-center md:text-left"
                      >
                        <a
                          href={item.href}
                          onClick={handleCloseMenu}
                          className="group menu-link text-xl font-light tracking-[0.15em] text-white/90 uppercase transition-colors duration-500 md:text-2xl"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Footer do Menu */}
                <div className="menu-content mt-auto border-t border-white/10 pt-8 text-center md:text-left">
                  <div className="mb-8 flex justify-center space-x-6 md:justify-start">
                    <a href="#" className="social-icon" aria-label="Facebook">
                      <svg
                        className="h-5 w-5 text-white/60 transition-colors duration-300 hover:text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="#" className="social-icon" aria-label="Instagram">
                      <svg
                        className="h-5 w-5 text-white/60 transition-colors duration-300 hover:text-amber-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-sm tracking-wider text-gray-500 uppercase">
                    © {new Date().getFullYear()} Thornfield Whisky
                  </p>
                </div>
              </div>

              {/* Coluna da Logo */}
              <div className="mb-16 md:mb-0">
                <div className="flex justify-center md:justify-end">
                  <img
                    src="/cabra.png"
                    alt="Thornfield"
                    width={192}
                    height={192}
                    className="w-32 md:w-48"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Imagem - escondida em mobile */}
          <div
            className="relative hidden bg-cover bg-center bg-no-repeat md:block"
            style={{
              backgroundImage: `url(${imagensMenu[currentImageIndex].imagem})`,
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      </div>

      {/* Off-canvas do Carrinho */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[400px] transform bg-[#1a1a1a] transition-transform duration-500 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header do Carrinho */}
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-light tracking-wider text-white">
            CARRINHO
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="absolute right-4 top-4 text-white/60 hover:text-white"
            aria-label="Fechar carrinho"
          >
            <svg width="28" height="28" viewBox="0 0 32 32"><g fill="currentColor"><path d="m14.585 16-4.95 4.95 1.415 1.414L22.364 11.05l-1.415-1.414-4.95 4.95-4.949-4.95-1.414 1.414 4.95 4.95ZM20.95 22.364l-3.536-3.536 1.414-1.414 3.536 3.536-1.415 1.414Z"></path></g></svg>
          </button>
        </div>

        {/* Lista de Produtos */}
        <div className="h-[calc(100%-120px)] overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-white/60">
              Seu carrinho está vazio
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b border-white/10 p-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm text-white">{item.name}</h3>
                    <p className="text-xs text-white/60">
                      R$ {item.price.toFixed(2)}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-white/60 hover:text-white"
                        aria-label="Diminuir quantidade"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-white/60 hover:text-white"
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500"
                    aria-label="Remover item do carrinho"
                  >
                    <svg width="24" height="24" viewBox="0 0 32 32"><g fill="currentColor"><path d="m14.585 16-4.95 4.95 1.415 1.414L22.364 11.05l-1.415-1.414-4.95 4.95-4.949-4.95-1.414 1.414 4.95 4.95ZM20.95 22.364l-3.536-3.536 1.414-1.414 3.536 3.536-1.415 1.414Z"></path></g></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer do Carrinho */}
        <div className="absolute right-0 bottom-0 left-0 border-t border-white/10 p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-white/60">Total:</span>
            <span className="text-white">
              R$ {total.toFixed(2)}
            </span>
          </div>
          <Button 
            className="w-full"
            onClick={handleCheckout}
          >
            Finalizar Compra
          </Button>
        </div>
      </div>

      {/* Overlay do Carrinho */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-500 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={handleCartClick}
      />
    </>
  );
}
