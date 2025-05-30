'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: any[];
};

type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  updated_at: string | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState<{text: string; type: 'success' | 'error'} | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      await Promise.all([
        fetchProfile(user.id),
        fetchOrders(user.id)
      ]);
    } catch (error) {
      console.error('Error checking user:', error);
      setMessage({ text: 'Erro ao carregar perfil', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao carregar perfil');
      }
      
      setProfile(data.profile);
      setFormData({
        full_name: data.profile?.full_name || '',
        phone: data.profile?.phone || '',
        address: data.profile?.address || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'Erro ao carregar perfil',
        type: 'error' 
      });
    }
  };

  const fetchOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao atualizar perfil');
      }
      
      setProfile(data.profile);
      setEditing(false);
      setMessage({ 
        text: 'Perfil atualizado com sucesso!', 
        type: 'success' 
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'Erro ao atualizar perfil',
        type: 'error' 
      });
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#171313] pt-24 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4B6B]"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#171313] pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-[#171313] rounded-lg shadow-lg p-6 mb-8 border border-[#8B31FF]/10">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
                  Meu Perfil
                </h1>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Editar Perfil
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          full_name: profile?.full_name || '',
                          phone: profile?.phone || '',
                          address: profile?.address || ''
                        });
                      }}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-gradient-to-r from-[#8B31FF] to-[#31A8FF] text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </div>
              
              {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  message.type === 'success' ? 'bg-green-900/30 border border-green-500/50' : 'bg-red-900/30 border border-red-500/50'
                }`}>
                  <p className="text-white">{message.text}</p>
                </div>
              )}

              <div className="text-white space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-lg">{user?.email}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm mb-1">Membro desde</p>
                  <p className="text-lg">{new Date(user?.created_at).toLocaleDateString('pt-BR')}</p>
                </div>

                <div>
                  <label htmlFor="full_name" className="text-gray-400 text-sm mb-1 block">Nome Completo</label>
                  {editing ? (
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#2a2a2e] text-white rounded-lg border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                      placeholder="Seu nome completo"
                    />
                  ) : (
                    <p className="text-lg">{profile?.full_name || 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="text-gray-400 text-sm mb-1 block">Telefone</label>
                  {editing ? (
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-[#2a2a2e] text-white rounded-lg border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                      placeholder="(00) 00000-0000"
                    />
                  ) : (
                    <p className="text-lg">{profile?.phone || 'Não informado'}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="text-gray-400 text-sm mb-1 block">Endereço</label>
                  {editing ? (
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-[#2a2a2e] text-white rounded-lg border border-[#8B31FF]/30 focus:border-[#FF4B6B] focus:outline-none"
                      placeholder="Seu endereço completo"
                    />
                  ) : (
                    <p className="text-lg whitespace-pre-line">{profile?.address || 'Não informado'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-[#171313] rounded-lg shadow-lg p-6 border border-[#8B31FF]/10">
              <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
                Meus Pedidos
              </h2>

              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-[#2a2a2e] rounded-lg p-4 border border-[#8B31FF]/10"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-white font-semibold">
                            Pedido #{order.id}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {new Date(order.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">
                            R$ {order.total.toFixed(2)}
                          </p>
                          <span className={`text-sm px-2 py-1 rounded ${
                            order.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : order.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {order.status === 'completed'
                              ? 'Concluído'
                              : order.status === 'pending'
                              ? 'Pendente'
                              : 'Em Processamento'}
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-[#8B31FF]/10 pt-4">
                        <h4 className="text-white font-semibold mb-2">Itens do Pedido:</h4>
                        <ul className="space-y-2">
                          {order.items.map((item: any, index: number) => (
                            <li key={index} className="text-gray-300">
                              {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">Você ainda não tem pedidos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 