'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ReviewFormProps {
  serviceId: string;
  onReviewSubmitted?: () => void;
}

export default function ReviewForm({ serviceId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = createClient();

  // Check if user is authenticated and has already reviewed
  useEffect(() => {
    const checkAuthAndReview = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const isUserAuthenticated = !!session;
        setIsAuthenticated(isUserAuthenticated);
        
        if (isUserAuthenticated && session?.user) {
          const { data, error } = await supabase
            .from('reviews')
            .select('id')
            .eq('service_id', serviceId)
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          if (error) {
            console.error('Error checking for existing review:', error);
          }
          
          setHasReviewed(!!data);
        }
      } catch (error) {
        console.error('Error in auth/review check:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthAndReview();
  }, [serviceId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setMessage('Por favor, faça login para enviar uma avaliação.');
      return;
    }
    
    if (hasReviewed) {
      setMessage('Você já avaliou este serviço.');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId,
          rating,
          comment: comment || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao enviar avaliação');
      }

      // Reset form
      setRating(0);
      setComment('');
      setMessage('Avaliação enviada com sucesso!');
      setHasReviewed(true);
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setMessage(error instanceof Error ? error.message : 'Erro ao enviar avaliação. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-[#171313] rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-8 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
            <div className="h-32 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-[#171313] rounded-lg shadow-lg text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Faça login para avaliar</h3>
        <p className="text-gray-300 mb-6">Você precisa estar logado para deixar uma avaliação.</p>
        <button
          onClick={() => {
            // This should trigger your auth flow
            window.location.href = '/login';
          }}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white font-semibold hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] transition-all duration-300"
        >
          Fazer Login
        </button>
      </div>
    );
  }

  if (hasReviewed) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-[#171313] rounded-lg shadow-lg text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Obrigado pela sua avaliação!</h3>
        <p className="text-gray-300">Você já avaliou este serviço.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-[#171313] rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-6">Deixe sua Avaliação</h3>

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

      {/* Image Upload - Temporarily disabled */}
      {/* <div className="mb-6">
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

        {imageUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imageUrls.map((url: string, index: number) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removeImage(index);
                  }}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div> */}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || !rating || !comment}
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