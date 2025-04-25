import Link from 'next/link';
import { FaFacebookF, FaInstagram} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-[#080401] to-black text-white relative overflow-hidden border-t border-amber-900/20">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/pattern-dark.svg')", // Assuming you have a subtle pattern
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-8 z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-24 border-b border-white/10">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-serif tracking-wider text-amber-500">THORNFIELD</h2>
              <p className="text-sm lg:text-base uppercase tracking-[0.1em] mt-1.5 text-white/70">
                SINGLE MALT WHISKY
              </p>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              CELEBRE A VIDA COM RESPONSABILIDADE
            </p>
          </div>

          {/* Links Sections Container */}
          <div className="sm:col-span-2 lg:col-span-2 grid grid-cols-2 gap-8">
            {/* Links Section - Herança */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold mb-5">Herança</h3>
              <ul className="space-y-2.5">
                <li><Link href="/pages/about#tradicao" className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300">Tradição</Link></li>
                <li><Link href="/pages/about#processo" className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300">Processo</Link></li>
                <li><Link href="/pages/about#terroir" className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300">Terroir</Link></li>
                <li><Link href="/pages/about#mestres" className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300">Mestres</Link></li>
              </ul>
            </div>

            {/* Links Section - Sobre Nós */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold mb-5">SOBRE NÓS</h3>
              <ul className="space-y-2.5">
                <li><Link href="/" className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300">Home</Link></li>
                <li><Link href="/pages/about" className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300">Sobre</Link></li>
                <li><Link href="/pages/blog" className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300">Blog</Link></li>
                <li><Link href="/pages/produtos" className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300">Coleção</Link></li>
              </ul>
            </div>
          </div>

          {/* Social & Contact Section */}
          <div className="space-y-6 ">
            <div className="s lg:block lg:space-x-0 lg:space-y-6pace-y-4">
              <h3 className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">Siga-nos</h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-amber-400 transition-colors duration-300">
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-[0.25em] text-amber-600 font-semibold">Contato</h3>
              <p className="text-sm text-gray-300">
                <a href="mailto:contato@thornfield.com" className="hover:text-amber-400 transition-colors duration-300">contato@thornfield.com</a>
              </p>
              <p className="text-sm text-gray-300">+55 (11) 4002-8922</p> {/* Manter placeholder se não houver número real */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 text-[11px] uppercase tracking-widest text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <span>© {new Date().getFullYear()} THORNFIELD WHISKY</span>
              <span className="hidden md:inline text-amber-700/50">|</span>
              <span>DIAGEO GROUP</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/pages/privacidade" className="hover:text-amber-400 transition-colors duration-300">Política de Privacidade</Link>
              <Link href="/pages/termos" className="hover:text-amber-400 transition-colors duration-300">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}