import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado. Por favor, faça login para continuar.' },
        { status: 401 }
      );
    }

    // Get user profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return NextResponse.json(
        { error: 'Falha ao buscar perfil do usuário' },
        { status: 500 }
      );
    }

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Unexpected error in GET /api/profile:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro inesperado' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado. Por favor, faça login para continuar.' },
        { status: 401 }
      );
    }

    const { full_name, phone, address } = await request.json();

    // Update user profile
    const { data: profile, error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name,
        phone: phone || null,
        address: address || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return NextResponse.json(
        { error: 'Falha ao atualizar perfil' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Perfil atualizado com sucesso!',
      profile 
    });
  } catch (error) {
    console.error('Unexpected error in PUT /api/profile:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro inesperado' },
      { status: 500 }
    );
  }
}
