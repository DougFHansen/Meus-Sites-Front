'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function FeaturedPosts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // Dados de exemplo para os posts em destaque
  const featuredPosts = [
    {
      id: 1,
      title: 'Como Otimizar seu Windows 11 para Máximo Desempenho',
      excerpt: 'Aprenda as melhores técnicas para deixar seu Windows 11 mais rápido e eficiente.',
      category: 'Otimização',
      image: '/blog/windows-11-optimization.jpg',
      author: 'João Silva',
      date: '2024-03-15',
      readTime: '8 min',
      slug: 'como-otimizar-windows-11'
    },
    {
      id: 2,
      title: '10 Sinais que seu Computador Precisa de Manutenção',
      excerpt: 'Descubra os principais indicadores de que seu PC necessita de uma revisão profissional.',
      category: 'Manutenção',
      image: '/blog/computer-maintenance.jpg',
      author: 'Maria Santos',
      date: '2024-03-14',
      readTime: '6 min',
      slug: '10-sinais-manutencao-computador'
    },
    {
      id: 3,
      title: 'Guia Completo de Segurança Digital em 2024',
      excerpt: 'Proteja seus dados e sua privacidade com as melhores práticas de segurança digital.',
      category: 'Segurança',
      image: '/blog/digital-security.jpg',
      author: 'Pedro Costa',
      date: '2024-03-13',
      readTime: '10 min',
      slug: 'guia-seguranca-digital-2024'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#171313] py-8">
      <div className="container mx-auto px-4">
        <div className="relative h-[500px] rounded-2xl overflow-hidden">
          {/* Slides */}
          <div className="relative h-full">
            {featuredPosts.map((post, index) => (
              <div
                key={post.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#171313] via-[#171313]/80 to-transparent z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>

                {/* Content */}
                <div className="relative z-20 h-full flex items-center">
                  <div className="max-w-2xl px-8">
                    <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white text-sm font-medium mb-4">
                      {post.category}
                    </span>
                    <h2 className="text-4xl font-bold text-white mb-4">
                      {post.title}
                    </h2>
                    <p className="text-[#e2e8f0] text-lg mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-[#e2e8f0] text-sm mb-6">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime} de leitura</span>
                    </div>
                    <button
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white font-semibold hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] transition-all duration-300 ease-out hover:scale-105"
                    >
                      Ler mais
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-6 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]'
                    : 'bg-white/50'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 