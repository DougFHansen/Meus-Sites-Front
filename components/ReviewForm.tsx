'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  
  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Upload images to Supabase Storage
      const imageUploadPromises = images.map(async (image) => {
        const fileName = `${Date.now()}-${image.name}`;
        const { data, error } = await supabase.storage
          .from('review-images')
          .upload(fileName, image);

        if (error) throw error;
        return data.path;
      });

      const uploadedImagePaths = await Promise.all(imageUploadPromises);

      // Insert review data into Supabase
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            name,
            rating,
            comment,
            images: uploadedImagePaths,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      // Reset form
      setRating(0);
      setComment('');
      setName('');
      setImages([]);
      setImageUrls([]);
      setMessage('Avaliação enviada com sucesso!');
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage('Erro ao enviar avaliação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-[#171313] rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6">Deixe sua Avaliação</h3>
      
      {/* Name Input */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-white mb-2">Seu Nome</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
          required
        />
      </div>

      {/* Star Rating */}
      <div className="mb-6">
        <label className="block text-white mb-2">Avaliação</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-2xl focus:outline-none transition-transform hover:scale-110"
            >
              {star <= rating ? (
                <StarIcon className="w-8 h-8 text-[#FF4B6B]" />
              ) : (
                <StarOutline className="w-8 h-8 text-[#FF4B6B]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div className="mb-6">
        <label htmlFor="comment" className="block text-white mb-2">Seu Comentário</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none h-32"
          required
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label htmlFor="images" className="block text-white mb-2">Adicionar Imagens (opcional)</label>
        <input
          type="file"
          id="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="images"
          className="cursor-pointer inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] transition-all duration-300"
        >
          Selecionar Imagens
        </label>

        {/* Image Previews */}
        {imageUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !rating || !comment || !name}
        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white font-semibold hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
      </button>

      {/* Success/Error Message */}
      {message && (
        <p className={`mt-4 text-center ${message.includes('sucesso') ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </form>
  );
} 