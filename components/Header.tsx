'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // State to hold user information
  const router = useRouter();
  const supabase = createClient();

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-700 bg-[#333]">
      <section className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2 md:px-8 lg:px-16 lg:py-2">
        <a href="/" className="logo">
          {/* Update image source for Next.js public folder */}
          <img src="/logo.png" alt="logo" className="h-16 w-auto block"/>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <a href="/" className="mx-4 text-lg text-white hover:text-[#d3ad7f] hover:border-b hover:border-[#d3ad7f] hover:pb-1 hover:text-xl transition-all duration-200 ease-linear">Home</a>
          <a href="/#about" className="mx-4 text-lg text-white hover:text-[#d3ad7f] hover:border-b hover:border-[#d3ad7f] hover:pb-1 hover:text-xl transition-all duration-200 ease-linear">Sobre</a>
          <a href="/services" className="mx-4 text-lg text-white hover:text-[#d3ad7f] hover:border-b hover:border-[#d3ad7f] hover:pb-1 hover:text-xl transition-all duration-200 ease-linear">Serviços</a>
          <a href="/#doubts" className="mx-4 text-lg text-white hover:text-[#d3ad7f] hover:border-b hover:border-[#d3ad7f] hover:pb-1 hover:text-xl transition-all duration-200 ease-linear">Dúvidas</a>
          <a href="/#reviews" className="mx-4 text-lg text-white hover:text-[#d3ad7f] hover:border-b hover:border-[#d3ad7f] hover:pb-1 hover:text-xl transition-all duration-200 ease-linear">Avaliações</a>
          {user ? (
            <>
              <a href="/profile" className="mx-4 text-lg text-white hover:text-[#d3ad7f] hover:border-b hover:border-[#d3ad7f] hover:pb-1 hover:text-xl transition-all duration-200 ease-linear">Perfil</a>
              <button onClick={handleLogout} className="mx-4 text-lg text-white hover:text-[#d3ad7f] hover:border-b hover:border-[#d3ad7f] hover:pb-1 hover:text-xl transition-all duration-200 ease-linear bg-transparent border-none cursor-pointer p-0">
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="mx-4 text-lg text-white hover:text-[#d3ad7f] hover:border-b hover:border-[#d3ad7f] hover:pb-1 hover:text-xl transition-all duration-200 ease-linear">Login</a>
          )}
        </nav>

        {/* Icons and Mobile Menu Toggle */}
        <div className="flex items-center">
          {/* Mobile Menu Toggle Button (Hamburger Icon) */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none mr-4"
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
          >
            <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>

          {/* Shopping Cart Icon */}
          <img width={30} height={30} src="https://img.icons8.com/?size=100&id=7695&format=png&color=ffffff" alt="shopping-cart--v1" className="ml-4 cursor-pointer transition-all duration-200 ease-linear hover:w-10 hover:h-10" />

          {/* Search Icon */}
          <img width={30} height={30} src="https://img.icons8.com/?size=100&id=16733&format=png&color=60B15C" alt="search--v1" className="ml-4 cursor-pointer transition-all duration-200 ease-linear hover:w-10 hover:h-10" />
        </div>
      </section>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#333] p-6 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end mb-8">
        </div>
        <nav className="flex flex-col gap-4">
          <a href="/" className="text-lg text-white hover:text-[#d3ad7f] transition-colors duration-200 ease-linear" onClick={toggleMobileMenu}>Home</a>
          <a href="/#about" className="text-lg text-white hover:text-[#d3ad7f] transition-colors duration-200 ease-linear" onClick={toggleMobileMenu}>Sobre</a>
          <a href="/services" className="text-lg text-white hover:text-[#d3ad7f] transition-colors duration-200 ease-linear" onClick={toggleMobileMenu}>Serviços</a>
          <a href="/#doubts" className="text-lg text-white hover:text-[#d3ad7f] transition-colors duration-200 ease-linear" onClick={toggleMobileMenu}>Dúvidas</a>
          <a href="/#reviews" className="text-lg text-white hover:text-[#d3ad7f] transition-colors duration-200 ease-linear" onClick={toggleMobileMenu}>Avaliações</a>
          {user ? (
            <>
              <a href="/profile" className="text-lg text-white hover:text-[#d3ad7f] transition-colors duration-200 ease-linear" onClick={toggleMobileMenu}>Perfil</a>
              <button onClick={handleLogout} className="text-lg text-white hover:text-[#d3ad7f] transition-colors duration-200 ease-linear bg-transparent border-none cursor-pointer p-0 text-left">
                Logout
              </button>
            </>
          ) : (
             <a href="/login" className="text-lg text-white hover:text-[#d3ad7f] transition-colors duration-200 ease-linear" onClick={toggleMobileMenu}>Login</a>
          )}
        </nav>
      </div>

    </header>
  );
} 