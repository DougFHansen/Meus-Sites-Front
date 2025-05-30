'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [state, setState] = useState('');
  const [cep, setCep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [isRecoveryView, setIsRecoveryView] = useState(false);
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

    try {
      // Validate required fields
      if (!email || !password || !fullName || !phone) {
        throw new Error('Por favor, preencha todos os campos obrigatórios');
      }

      // Prepare user metadata
      const userMetadata = {
        login,
        full_name: fullName,
        phone,
        ...(city && { city }),
        ...(neighborhood && { neighborhood }),
        ...(state && { state }),
        ...(cep && { cep })
      };

      // First, create the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata
        }
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Erro ao criar usuário');
      }

      // Then, insert additional data into the profiles table
      const profileData: Record<string, any> = {
        id: authData.user.id,
        login,
        full_name: fullName,
        phone,
        updated_at: new Date().toISOString()
      };

      // Only include optional fields if they have values
      if (city) profileData.city = city;
      if (neighborhood) profileData.neighborhood = neighborhood;
      if (state) profileData.state = state;
      if (cep) profileData.cep = cep;

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(profileData, {
          onConflict: 'id'
        });

      if (profileError) {
        console.error('Profile Creation Error Details:', profileError);
        throw new Error('Erro ao criar perfil: ' + profileError.message);
      }

      // Se chegou aqui, tudo deu certo
      alert('Cadastro realizado com sucesso! Por favor, verifique seu email para confirmar a conta.');
      setIsLoginView(true);
      
      // Limpar os campos
      setLogin('');
      setFullName('');
      setPhone('');
      setCity('');
      setNeighborhood('');
      setState('');
      setCep('');
      setEmail('');
      setPassword('');

    } catch (error) {
      console.error('Sign Up Error:', error);
      setError(error instanceof Error ? error.message : 'Erro ao realizar cadastro');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      console.error('Password Recovery Error:', error);
    } else {
      alert('Se o email estiver cadastrado, você receberá um link para redefinir sua senha.');
      setIsRecoveryView(false);
      setIsLoginView(true);
    }
  };

  // Função para formatar o telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  // Função para formatar o CEP
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCEP(e.target.value);
    setCep(formatted);
  };

  return (
    <>
      <Header />
      <div className="pt-16 sm:pt-20 bg-[#171313] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center w-full max-w-md mt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-white">Bem-Vindo(a) a </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">VOLTRIS</span>
          </h1>
          <div className="w-full bg-[#171313] p-8 rounded-lg shadow-lg border border-[#8B31FF]/10">
            <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
              {isRecoveryView ? 'Recuperar Senha' : (isLoginView ? 'Entrar na Conta' : 'Criar Conta')}
            </h2>
            <form onSubmit={isRecoveryView ? handlePasswordRecovery : (isLoginView ? handleLogin : handleSignUp)} className="space-y-4">
              {!isLoginView && !isRecoveryView && (
                <>
                  <div>
                    <label htmlFor="login" className="block text-white text-sm font-bold mb-2">Login:</label>
                    <input
                      type="text"
                      id="login"
                      className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="fullName" className="block text-white text-sm font-bold mb-2">Nome Completo:</label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-white text-sm font-bold mb-2">Telefone:</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-white text-sm font-bold mb-2">Cidade:</label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="neighborhood" className="block text-white text-sm font-bold mb-2">Bairro:</label>
                      <input
                        type="text"
                        id="neighborhood"
                        className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-white text-sm font-bold mb-2">Estado:</label>
                      <input
                        type="text"
                        id="state"
                        className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        maxLength={2}
                        placeholder="SP"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cep" className="block text-white text-sm font-bold mb-2">CEP:</label>
                      <input
                        type="text"
                        id="cep"
                        className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                        value={cep}
                        onChange={handleCEPChange}
                        placeholder="00000-000"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="email" className="block text-white text-sm font-bold mb-2">E-mail:</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {!isRecoveryView && (
                <div>
                  <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Senha:</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              
              {error && (
                <p className="text-[#FF4B6B] text-sm italic text-center">{error}</p>
              )}
              
              <div className="flex flex-col items-center justify-center pt-4">
                <button
                  type="submit"
                  className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white font-semibold hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? (isRecoveryView ? 'Enviando...' : (isLoginView ? 'Entrando...' : 'Criando...')) : (isRecoveryView ? 'Enviar Link de Recuperação' : (isLoginView ? 'Entrar' : 'Criar Conta'))}
                </button>
                
                {isLoginView && !isRecoveryView && (
                  <button
                    type="button"
                    onClick={() => setIsRecoveryView(true)}
                    className="mt-4 text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] hover:opacity-80 transition-all duration-300"
                  >
                    Esqueceu sua senha?
                  </button>
                )}

                {!isRecoveryView && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoginView(!isLoginView);
                      setIsRecoveryView(false);
                    }}
                    className="mt-4 font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] hover:opacity-80 transition-all duration-300"
                  >
                    {isLoginView ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
                  </button>
                )}

                {isRecoveryView && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecoveryView(false);
                      setIsLoginView(true);
                    }}
                    className="mt-4 font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] hover:opacity-80 transition-all duration-300"
                  >
                    Voltar para o login
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 