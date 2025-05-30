import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const fullName = String(formData.get('fullName') || '');
  const phone = String(formData.get('phone') || '');
  const address = String(formData.get('address') || '');
  const isSignUp = formData.get('isSignUp') === 'true';

  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    if (isSignUp) {
      // Sign up
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            address,
          },
          emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        return NextResponse.json(
          { error: signUpError.message },
          { status: signUpError.status || 400 }
        );
      }

      return NextResponse.json({
        message: 'Sign up successful! Please check your email to confirm your account.',
        user: signUpData.user,
      });
    } else {
      // Sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        return NextResponse.json(
          { error: signInError.message },
          { status: signInError.status || 400 }
        );
      }

      return NextResponse.json({
        message: 'Sign in successful!',
        user: signInData.user,
      });
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (token) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status || 400 }
      );
    }

    return NextResponse.json({ message: 'Email verified successfully!', data });
  }

  return NextResponse.json({ error: 'No token provided' }, { status: 400 });
}
