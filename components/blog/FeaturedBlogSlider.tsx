'use client';

import { useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
}

export default function FeaturedBlogSlider() {
  const [posts] = useState<BlogPost[]>([
    {
      slug: 'como-otimizar-windows-11',
      title: 'Como Otimizar seu Windows 11 para Máximo Desempenho',
      excerpt: 'Descubra as melhores técnicas para otimizar seu Windows 11 e melhorar significativamente o desempenho do seu computador.',
      category: 'Otimização',
      image: '/formatacao.png',
      date: '15 Mar 2024'
    },
    {
      slug: 'protecao-contra-virus',
      title: 'Guia Completo de Proteção Contra Vírus',
      excerpt: 'Aprenda como proteger seu computador contra as mais recentes ameaças virtuais com nossas dicas de segurança.',
      category: 'Segurança',
      image: '/formatacao.png',
      date: '10 Mar 2024'
    },
    {
      slug: 'backup-dados-importantes',
      title: 'Como Fazer Backup dos Seus Dados Importantes',
      excerpt: 'Guia passo a passo para garantir que seus arquivos importantes estejam sempre seguros e protegidos.',
      category: 'Backup',
      image: '/formatacao.png',
      date: '5 Mar 2024'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-[2rem] text-[#FF4B6B] text-center uppercase mb-10 font-light tracking-wider">
        Blog <span className="text-white uppercase">Voltris</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`}>
            <div className="group relative overflow-hidden rounded-2xl bg-[#171313]/80 border border-[#8B31FF]/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)]">
              <div className="relative h-[300px] w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171313] to-transparent opacity-80"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white text-sm font-medium mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[#e2e8f0] text-sm mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#e2e8f0] text-sm">{post.date}</span>
                  <span className="text-[#FF4B6B] text-sm font-medium group-hover:text-[#8B31FF] transition-colors duration-300">
                    Ler mais →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Link href="/blog" className="inline-block bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-8 py-3 text-lg font-medium hover:shadow-[0_0_20px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out hover:scale-105">
          Ver Todos os Posts
        </Link>
      </div>
    </div>
  );
} 