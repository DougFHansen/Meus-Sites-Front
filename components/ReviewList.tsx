'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  images: string[];
  created_at: string;
};

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B6B]"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-[#171313] rounded-lg shadow-lg p-6 border border-[#8B31FF]/10">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">{review.name}</h4>
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 ${
                    index < review.rating ? 'text-[#FF4B6B]' : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-300 mb-4">{review.comment}</p>

          {review.images && review.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-4">
              {review.images.map((imagePath, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/review-images/${imagePath}`}
                    alt={`Review image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 text-sm text-gray-400">
            {new Date(review.created_at).toLocaleDateString('pt-BR')}
          </div>
        </div>
      ))}

      {reviews.length === 0 && (
        <div className="col-span-full text-center text-gray-400 py-8">
          Nenhuma avaliação ainda. Seja o primeiro a avaliar!
        </div>
      )}
    </div>
  );
} 