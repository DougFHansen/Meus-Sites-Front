'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Aqui você implementará a lógica de inscrição na newsletter
      // Por enquanto, vamos simular um sucesso após 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Inscrição realizada com sucesso! Obrigado por se inscrever.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Ocorreu um erro. Por favor, tente novamente.');
    }
  };

  return (
    <div className="bg-[#1c1c1e] rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Receba as Últimas Novidades
      </h3>
      <p className="text-[#e2e8f0] text-sm mb-6">
        Inscreva-se para receber dicas, tutoriais e novidades sobre tecnologia diretamente no seu email.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor email"
            className="w-full px-4 py-3 rounded-lg bg-[#2a2a2e] text-white border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none placeholder-[#6b7280]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white font-semibold hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] transition-all duration-300 ease-out ${
            status === 'loading' ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02]'
          }`}
        >
          {status === 'loading' ? 'Inscrevendo...' : 'Inscrever-se'}
        </button>

        {message && (
          <p
            className={`text-sm ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
} 