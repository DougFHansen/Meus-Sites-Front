'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  tags: string[];
}

interface PostsListProps {
  category: string;
}

export default function PostsList({ category }: PostsListProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Dados de exemplo para os posts
  const posts: Post[] = [
    {
      id: 1,
      title: 'Como Otimizar seu Windows 11 para Máximo Desempenho',
      excerpt: 'Aprenda as melhores técnicas para deixar seu Windows 11 mais rápido e eficiente. Neste guia completo, você descobrirá como configurar seu sistema operacional para obter o melhor desempenho possível.',
      category: 'Otimização',
      image: '/blog/windows-11-optimization.jpg',
      author: 'João Silva',
      date: '2024-03-15',
      readTime: '8 min',
      slug: 'como-otimizar-windows-11',
      tags: ['Windows 11', 'Otimização', 'Desempenho']
    },
    {
      id: 2,
      title: '10 Sinais que seu Computador Precisa de Manutenção',
      excerpt: 'Descubra os principais indicadores de que seu PC necessita de uma revisão profissional. Não espere seu computador parar de funcionar para tomar uma atitude.',
      category: 'Manutenção',
      image: '/blog/computer-maintenance.jpg',
      author: 'Maria Santos',
      date: '2024-03-14',
      readTime: '6 min',
      slug: '10-sinais-manutencao-computador',
      tags: ['Manutenção', 'Diagnóstico', 'PC']
    },
    // Adicione mais posts aqui
  ];

  // Filtra os posts por categoria se necessário
  const filteredPosts = category === 'all' 
    ? posts 
    : posts.filter(post => post.category.toLowerCase() === category);

  // Calcula os posts da página atual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Calcula o total de páginas
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Função para mudar de página
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Grid de Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentPosts.map((post) => (
          <article
            key={post.id}
            className="bg-[#1c1c1e] rounded-lg overflow-hidden hover:shadow-[0_0_20px_rgba(139,49,255,0.1)] transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Imagem do Post */}
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>

            {/* Conteúdo do Post */}
            <div className="p-6">
              <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white text-sm font-medium mb-4">
                {post.category}
              </span>
              
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#FF4B6B] hover:via-[#8B31FF] hover:to-[#31A8FF] cursor-pointer" onClick={() => router.push(`/blog/${post.slug}`)}>
                {post.title}
              </h3>
              
              <p className="text-[#e2e8f0] text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center text-[#e2e8f0] text-sm">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime} de leitura</span>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-[#2a2a2e] text-[#e2e8f0]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                  currentPage === index + 1
                    ? 'bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white'
                    : 'bg-[#2a2a2e] text-[#e2e8f0] hover:bg-[#3a3a3e]'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 