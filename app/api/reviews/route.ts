import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// Define types for the review data
interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
  }[];
  user?: {
    full_name: string;
  };
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId');

    if (!serviceId) {
      return NextResponse.json(
        { error: 'ID do serviço é obrigatório' },
        { status: 400 }
      );
    }

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        created_at,
        profiles:profiles!inner(
          full_name
        )
      `)
      .eq('service_id', serviceId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json(
        { error: 'Falha ao buscar avaliações' },
        { status: 500 }
      );
    }

    // Format the response to match the expected client-side structure
    const formattedReviews = reviews.map((review: Review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      created_at: review.created_at,
      user: {
        full_name: review.profiles?.[0]?.full_name || 'Usuário Anônimo'
      }
    }));

    return NextResponse.json({ reviews: formattedReviews });
  } catch (error) {
    console.error('Unexpected error in GET /api/reviews:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro inesperado ao buscar avaliações' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado. Por favor, faça login para continuar.' },
        { status: 401 }
      );
    }

    const { serviceId, rating, comment } = await request.json();

    // Validate input
    if (!serviceId || !rating) {
      return NextResponse.json(
        { error: 'ID do serviço e avaliação são obrigatórios' },
        { status: 400 }
      );
    }

    // Validate rating is a number between 1 and 5
    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { error: 'Avaliação deve ser um número entre 1 e 5' },
        { status: 400 }
      );
    }

    // Check if user has already reviewed this service
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('service_id', serviceId)
      .eq('user_id', user.id)
      .single();

    if (existingReview) {
      return NextResponse.json(
        { error: 'Você já avaliou este serviço' },
        { status: 400 }
      );
    }

    // Insert the review
    const { data: review, error: insertError } = await supabase
      .from('reviews')
      .insert([
        {
          service_id: serviceId,
          user_id: user.id,
          rating: ratingNum,
          comment: comment || null,
        },
      ])
      .select('*, profiles:profiles(full_name)')
      .single();

    if (insertError) {
      console.error('Erro ao criar avaliação:', insertError);
      return NextResponse.json(
        { error: 'Falha ao criar avaliação' },
        { status: 500 }
      );
    }

    // Format the response to match the expected client-side structure
    const formattedReview: Review = {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      created_at: review.created_at,
      user: {
        full_name: review.profiles?.full_name || 'Usuário Anônimo'
      }
    };

    return NextResponse.json({ 
      message: 'Avaliação enviada com sucesso!',
      review: formattedReview
    });
  } catch (error) {
    console.error('Erro inesperado:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro inesperado' },
      { status: 500 }
    );
  }
}
