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

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
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
      await fetchOrders(user.id);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
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
              <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
                Meu Perfil
              </h1>
              <div className="text-white">
                <p className="mb-2">
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Membro desde:</span>{' '}
                  {new Date(user?.created_at).toLocaleDateString('pt-BR')}
                </p>
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