'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const isHome = pathname === '/';

  const isProfilePage = pathname === '/profile';

  // Fetch user session on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Optional: Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]); // Re-run effect if supabase.auth changes (unlikely in this case but good practice)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout Error:', error);
    }
    // Redirect to home page after logout
    router.push('/');
    // Close mobile menu after logout on mobile
    setIsMobileMenuOpen(false);
  };

  const getFullPath = (anchor: string) => {
    return isHome ? anchor : `/${anchor}`;
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-md bg-[#171313]/80 border-b border-[#FF4B6B]/10">
      <nav className="container mx-auto px-2 py-2">
        <div className="flex items-center max-w-7xl mx-auto">
          {/* Left Side - Logo */}
          <div className="w-1/4 flex-shrink-0 pl-8">
            <Link href="/" className="logo">
              <img src="/logo.png" alt="logo" className="h-14 w-auto block"/>
            </Link>
          </div>

          {/* Center - Navigation Links */}
          <div className="w-2/4 flex justify-center">
            <div className="hidden md:flex items-center justify-center space-x-4">
              <Link href={getFullPath('/')} className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={getFullPath('#about')} className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 relative group">
                Sobre
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={getFullPath('#services')} className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 relative group">
                Serviços
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/gamers" className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 relative group">
                Gamers
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href={getFullPath('#doubts')} className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 relative group">
                Dúvidas
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/blog" className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 relative group">
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              {!isProfilePage && (
                <Link href={getFullPath('/reviews')} className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 relative group">
                  Avaliações
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Side - Icons and Login */}
          <div className="w-1/4 flex justify-end items-center gap-4 pr-8">
            {/* Social Media Icons */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="#" className="text-white hover:text-[#FF4B6B] transition-all duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </Link>
              <Link href="#" className="text-white hover:text-[#FF4B6B] transition-all duration-300">
                <i className="fab fa-facebook text-xl"></i>
              </Link>
              <Link 
                href="https://wa.me/5511996716235?text=Olá%20VOLTRIS%2C%20preciso%20de%20atendimento!" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-[#FF4B6B] transition-all duration-300"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </Link>
            </div>

            {/* Profile and Login/Logout Buttons */}
            <div className="flex items-center gap-4">
              {user && (
                <Link 
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300"
                >
                  <i className="fas fa-user-circle text-xl"></i>
                  <span className="hidden md:inline">Perfil</span>
                </Link>
              )}

              {user ? (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white rounded-lg hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] transition-all duration-300 ease-out hover:scale-105"
                >
                  <i className="fas fa-sign-out-alt text-xl"></i>
                  <span className="hidden md:inline">Logout</span>
                </button>
              ) : (
                <Link 
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white rounded-lg hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] transition-all duration-300 ease-out hover:scale-105"
                >
                  <i className="fas fa-user text-xl"></i>
                  <span className="hidden md:inline">Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="pt-4 pb-3 space-y-3">
            <Link href={getFullPath('/')} className="block text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300">Home</Link>
            <Link href={getFullPath('#about')} className="block text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300">Sobre</Link>
            <Link href={getFullPath('#services')} className="block text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300">Serviços</Link>
            <Link href="/gamers" className="block text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300">Gamers</Link>
            <Link href={getFullPath('#doubts')} className="block text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300">Dúvidas</Link>
            <Link href="/blog" className="block text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300">Blog</Link>
            {!isProfilePage && (
              <Link href={getFullPath('/reviews')} className="block text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300">Avaliações</Link>
            )}
            {user && (
              <Link href="/profile" className="block text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] transition-all duration-300">Perfil</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 