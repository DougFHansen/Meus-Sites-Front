'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import CategoryNav from '@/components/blog/CategoryNav';
import PostsList from '@/components/blog/PostsList';
import NewsletterSignup from '@/components/blog/NewsletterSignup';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'windows', name: 'Windows' },
    { id: 'security', name: 'Segurança' },
    { id: 'optimization', name: 'Otimização' },
    { id: 'tutorials', name: 'Tutoriais' },
    { id: 'tech-news', name: 'Notícias Tech' },
    { id: 'tips', name: 'Dicas' }
  ];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Aqui você pode implementar a lógica de filtro dos posts por categoria
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#171313]">
        {/* Blog Header Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
                Blog VOLTRIS
              </span>
            </h1>
            <p className="text-[#e2e8f0] text-center text-lg max-w-2xl mx-auto">
              Dicas, tutoriais e novidades sobre tecnologia, otimização de computadores e segurança digital.
            </p>
          </div>
        </section>

        {/* Featured Posts Slider */}
        <FeaturedPosts />

        {/* Categories Navigation */}
        <CategoryNav 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange}
        />

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Posts List */}
            <div className="lg:col-span-8">
              <PostsList category={selectedCategory} />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              {/* Newsletter Signup */}
              <NewsletterSignup />

              {/* Popular Posts */}
              <div className="bg-[#1c1c1e] rounded-lg p-6 mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Posts Populares</h3>
                <div className="space-y-4">
                  {/* Popular posts will be mapped here */}
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-[#1c1c1e] rounded-lg p-6 mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white'
                          : 'text-[#e2e8f0] hover:bg-[#2a2a2e]'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="bg-[#1c1c1e] rounded-lg p-6 mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Tags will be mapped here */}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 