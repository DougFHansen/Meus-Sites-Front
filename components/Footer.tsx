'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const getFullPath = (path: string) => {
    return isHome ? `#${path}` : `/${path}`;
  };

  return (
    <footer className="bg-[#171313] relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4B6B] opacity-5 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B31FF] opacity-5 rounded-full filter blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] bg-clip-text text-transparent">
              VOLTRIS
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Soluções em informática remota para todo o Brasil. Atendimento especializado e suporte técnico de qualidade.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF4B6B] transition-colors duration-300 group relative"
              >
                <i className="fab fa-facebook text-xl"></i>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#8B31FF] transition-colors duration-300 group relative"
              >
                <i className="fab fa-instagram text-xl"></i>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#31A8FF] transition-colors duration-300 group relative"
              >
                <i className="fab fa-twitter text-xl"></i>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#31A8FF] to-[#FF4B6B] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF4B6B] transition-colors duration-300 group relative"
              >
                <i className="fab fa-linkedin text-xl"></i>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#8B31FF] transition-colors duration-300 group relative"
              >
                <i className="fab fa-youtube text-xl"></i>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Links Rápidos</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '' },
                { name: 'Sobre', path: 'about' },
                { name: 'Serviços', path: 'services' },
                { name: 'Blog', path: 'blog' },
                { name: 'Contato', path: 'contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={getFullPath(link.path)}
                    className="text-gray-400 hover:text-white transition-colors duration-300 group relative inline-block"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Nossos Serviços</h4>
            <ul className="space-y-2">
              {[
                'Formatação',
                'Otimização',
                'Recuperação de Dados',
                'Instalação de Programas',
                'Remoção de Vírus'
              ].map((service) => (
                <li key={service}>
                  <Link 
                    href="/services"
                    className="text-gray-400 hover:text-white transition-colors duration-300 group relative inline-block"
                  >
                    <span className="relative z-10">{service}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400 group">
                <i className="fas fa-phone text-[#FF4B6B] group-hover:scale-110 transition-transform duration-300"></i>
                <span className="group-hover:text-white transition-colors duration-300">(11) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 group">
                <i className="fas fa-envelope text-[#8B31FF] group-hover:scale-110 transition-transform duration-300"></i>
                <span className="group-hover:text-white transition-colors duration-300">contato@voltris.com.br</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 group">
                <i className="fas fa-map-marker-alt text-[#31A8FF] group-hover:scale-110 transition-transform duration-300"></i>
                <span className="group-hover:text-white transition-colors duration-300">São Paulo, SP</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 group">
                <i className="fas fa-clock text-[#FF4B6B] group-hover:scale-110 transition-transform duration-300"></i>
                <span className="group-hover:text-white transition-colors duration-300">24/7 - Atendimento Online</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} VOLTRIS. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="/privacy"
                className="text-gray-400 text-sm hover:text-white transition-colors duration-300 group relative"
              >
                <span className="relative z-10">Política de Privacidade</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link 
                href="/terms"
                className="text-gray-400 text-sm hover:text-white transition-colors duration-300 group relative"
              >
                <span className="relative z-10">Termos de Uso</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 