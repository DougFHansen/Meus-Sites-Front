'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSignup from '@/components/blog/NewsletterSignup';

interface Post {
  title: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // Aqui você implementará a lógica para buscar o post pelo slug
    // Por enquanto, vamos usar dados de exemplo
    setPost({
      title: 'Como Otimizar seu Windows 11 para Máximo Desempenho',
      content: `
        <h2 class="text-white">Introdução</h2>
        <p class="text-white">O Windows 11 é o sistema operacional mais recente da Microsoft, trazendo uma série de melhorias em termos de design e funcionalidades. No entanto, como qualquer sistema operacional, ele pode ser otimizado para oferecer um desempenho ainda melhor.</p>

        <h2 class="text-white">1. Atualize seus Drivers</h2>
        <p class="text-white">Manter seus drivers atualizados é fundamental para garantir o melhor desempenho do seu sistema. Drivers desatualizados podem causar lentidão, travamentos e outros problemas de performance.</p>

        <h2 class="text-white">2. Gerencie os Programas de Inicialização</h2>
        <p class="text-white">Muitos programas são configurados para iniciar automaticamente com o Windows, o que pode tornar o processo de inicialização mais lento. Aprenda a gerenciar esses programas para melhorar o tempo de boot do seu sistema.</p>

        <h2 class="text-white">3. Otimize as Configurações de Energia</h2>
        <p class="text-white">As configurações de energia do Windows podem impactar significativamente o desempenho do seu sistema. Ajuste essas configurações para maximizar a performance quando necessário.</p>

        <h2 class="text-white">4. Limpe os Arquivos Temporários</h2>
        <p class="text-white">Arquivos temporários podem acumular e ocupar espaço valioso no seu disco rígido. Aprenda como limpar esses arquivos de forma segura para liberar espaço e melhorar o desempenho.</p>

        <h2 class="text-white">5. Desfragmente seu Disco Rígido</h2>
        <p class="text-white">Se você usa um HDD tradicional, a desfragmentação regular pode ajudar a manter seu sistema mais rápido. Note que SSDs não precisam ser desfragmentados.</p>

        <h2 class="text-white">Conclusão</h2>
        <p class="text-white">Seguindo estas dicas, você pode melhorar significativamente o desempenho do seu Windows 11. Lembre-se de realizar manutenção regular para manter seu sistema funcionando de forma otimizada.</p>
      `,
      category: 'Otimização',
      image: '/blog/windows-11-optimization.jpg',
      author: 'João Silva',
      date: '2024-03-15',
      readTime: '8 min',
      tags: ['Windows 11', 'Otimização', 'Desempenho', 'Tutoriais']
    });
  }, [params.slug]);

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#171313] pt-24">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-[#2a2a2e] rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-[#2a2a2e] rounded w-1/4 mb-8"></div>
              <div className="h-96 bg-[#2a2a2e] rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-[#2a2a2e] rounded w-full"></div>
                <div className="h-4 bg-[#2a2a2e] rounded w-5/6"></div>
                <div className="h-4 bg-[#2a2a2e] rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171313] pt-24">
        <article className="container mx-auto px-4 py-12">
          {/* Header do Post */}
          <header className="max-w-4xl mx-auto text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-[#e2e8f0] text-sm mb-8">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime} de leitura</span>
            </div>
            <div className="flex justify-center gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-[#2a2a2e] text-[#e2e8f0]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Imagem Principal */}
          <div className="max-w-4xl mx-auto mb-12">
            <div
              className="w-full h-[400px] rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>
          </div>

          {/* Conteúdo do Post */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div
                className="prose prose-lg max-w-none text-white
                  [&>*]:text-white
                  prose-headings:text-white 
                  prose-p:text-white!important 
                  prose-strong:text-white 
                  prose-ul:text-white 
                  prose-ol:text-white 
                  prose-li:text-white!important
                  prose-a:text-[#FF4B6B] 
                  hover:prose-a:text-[#8B31FF] 
                  prose-code:text-[#31A8FF] 
                  prose-pre:bg-[#1c1c1e] 
                  prose-pre:text-white 
                  prose-blockquote:text-white 
                  prose-blockquote:border-[#8B31FF]
                  [&>h1]:text-white
                  [&>h2]:text-white
                  [&>h3]:text-white
                  [&>h4]:text-white
                  [&>h5]:text-white
                  [&>h6]:text-white
                  [&>p]:text-white
                  [&>ul]:text-white
                  [&>ol]:text-white
                  [&>li]:text-white"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>

              {/* Compartilhamento */}
              <div className="mt-12 pt-8 border-t border-[#2a2a2e]">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Compartilhe este artigo
                </h3>
                <div className="flex gap-4">
                  <button className="px-6 py-2 rounded-lg bg-[#1877f2] text-white hover:bg-[#1877f2]/90 transition-colors">
                    Facebook
                  </button>
                  <button className="px-6 py-2 rounded-lg bg-[#1da1f2] text-white hover:bg-[#1da1f2]/90 transition-colors">
                    Twitter
                  </button>
                  <button className="px-6 py-2 rounded-lg bg-[#0a66c2] text-white hover:bg-[#0a66c2]/90 transition-colors">
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Newsletter */}
                <NewsletterSignup />

                {/* Posts Relacionados */}
                <div className="bg-[#1c1c1e] rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Posts Relacionados
                  </h3>
                  <div className="space-y-4">
                    {/* Aqui você adicionará os posts relacionados */}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
} 