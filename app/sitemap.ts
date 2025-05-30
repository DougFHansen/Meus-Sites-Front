import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Aqui você implementará a lógica para buscar todos os posts do blog
  // Por enquanto, vamos usar dados de exemplo
  const posts = [
    {
      slug: 'como-otimizar-windows-11',
      lastModified: new Date('2024-03-15'),
    },
    {
      slug: '10-sinais-manutencao-computador',
      lastModified: new Date('2024-03-14'),
    },
    {
      slug: 'guia-seguranca-digital-2024',
      lastModified: new Date('2024-03-13'),
    },
  ];

  const baseUrl = 'https://voltris.com.br';

  // URLs principais do site
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ] as const;

  // URLs dos posts do blog
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...postUrls];
} 