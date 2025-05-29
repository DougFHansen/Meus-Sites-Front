'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      console.error('Login Error:', error);
    } else {
      router.push('/');
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      console.error('Sign Up Error:', error);
    } else {
      if (data.user) {
        alert('Sign up successful! You can now log in.');
        setIsLoginView(true);
      } else if (data.session) {
        router.push('/');
      } else {
        alert('Sign up successful! Please check your email for a confirmation link.');
        setIsLoginView(true);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="pt-16 sm:pt-20 bg-[#19325b] min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{isLoginView ? 'Entrar na Conta' : 'Criar Conta'}</h2>
          <form onSubmit={isLoginView ? handleLogin : handleSignUp}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail:</label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>
            )}
            <div className="flex flex-col items-center justify-center">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (isLoginView ? 'Entrando...' : 'Criando...') : (isLoginView ? 'Entrar' : 'Criar Conta')}
              </button>
              <button
                type="button"
                onClick={() => setIsLoginView(!isLoginView)}
                className="mt-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 bg-transparent border-none cursor-pointer p-0"
              >
                {isLoginView ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
} 