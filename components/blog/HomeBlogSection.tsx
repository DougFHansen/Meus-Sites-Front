'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: "Como Otimizar seu Windows para Melhor Desempenho",
    excerpt: "Dicas práticas para aumentar a velocidade e eficiência do seu sistema operacional Windows.",
    image: "/blog/windows-optimization.jpg",
    category: "Otimização",
    date: "2024-03-15",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Guia de Segurança Digital para 2024",
    excerpt: "Proteja seus dados e sua privacidade com as melhores práticas de segurança digital.",
    image: "/blog/security-guide.jpg",
    category: "Segurança",
    date: "2024-03-10",
    readTime: "7 min"
  },
  {
    id: 3,
    title: "Novidades em Tecnologia para Empresas",
    excerpt: "Descubra as últimas tendências em tecnologia que estão transformando o ambiente empresarial.",
    image: "/blog/tech-news.jpg",
    category: "Notícias Tech",
    date: "2024-03-05",
    readTime: "4 min"
  }
];

export default function HomeBlogSection() {
  return (
    <section className="py-20 bg-[#171313] relative overflow-hidden">
      {/* Background Gradient Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4B6B] opacity-10 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B31FF] opacity-10 rounded-full filter blur-[100px]" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
              Blog VOLTRIS
            </span>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FF4B6B] to-[#31A8FF]"></div>
          </h2>
          <p className="text-[#e2e8f0] text-lg md:text-xl max-w-2xl mx-auto mt-8">
            Explore nosso conteúdo exclusivo sobre tecnologia, dicas e novidades
          </p>
        </div>

        {/* Blog Posts Slider */}
        <div className="max-w-7xl mx-auto">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Autoplay, EffectCards, Pagination, Navigation]}
            className="blog-cards-swiper"
          >
            {samplePosts.map((post) => (
              <SwiperSlide key={post.id}>
                <div className="bg-gradient-to-br from-[#1c1c1e] to-[#2a2a2e] rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02] group">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#171313] via-transparent opacity-60" />
                    </div>
                    
                    <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] text-white">
                            {post.category}
                          </span>
                          <span className="text-[#a0aec0] text-sm">{post.readTime} de leitura</span>
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF4B6B] group-hover:to-[#31A8FF] transition-all duration-300">
                          {post.title}
                        </h3>
                        
                        <p className="text-[#e2e8f0] mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[#a0aec0] text-sm">
                          {new Date(post.date).toLocaleDateString('pt-BR')}
                        </span>
                        <Link 
                          href={`/blog/${post.id}`}
                          className="text-white font-medium hover:text-[#FF4B6B] transition-colors duration-300"
                        >
                          Ler mais →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,49,255,0.5)] hover:scale-105 group"
          >
            <span>Explorar Blog</span>
            <svg 
              className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .blog-cards-swiper {
          padding: 20px 0 60px !important;
        }
        .blog-cards-swiper .swiper-pagination-bullet {
          background: #8B31FF;
        }
        .blog-cards-swiper .swiper-pagination-bullet-active {
          background: #FF4B6B;
        }
        .blog-cards-swiper .swiper-button-next,
        .blog-cards-swiper .swiper-button-prev {
          color: #FF4B6B;
        }
        .blog-cards-swiper .swiper-button-next:hover,
        .blog-cards-swiper .swiper-button-prev:hover {
          color: #8B31FF;
        }
      `}</style>
    </section>
  );
} 