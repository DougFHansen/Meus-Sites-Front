'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Define a type for service requests for better type safety
interface ServiceRequest {
  id: string;
  created_at: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  requested_services: { name: string; price: number; }[];
  scheduling_type: string;
  requested_datetime: string | null;
  scheduled_datetime: string | null;
  admin_notes: string | null;
  final_price: number | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        // If no user is logged in, redirect to login page
        router.push('/login');
        return;
      }

      // Fetch service requests for the logged-in user
      const { data: requests, error: fetchError } = await supabase
        .from('service_requests')
        .select('*') // Select all columns
        .eq('user_id', user.id) // Filter by the logged-in user's ID
        .order('created_at', { ascending: false }); // Order by creation date

      setLoading(false);

      if (fetchError) {
        console.error('Error fetching service requests:', fetchError);
        setError('Ocorreu um erro ao carregar suas solicitações de serviço.');
        setServiceRequests([]); // Ensure the list is empty on error
      } else {
        setServiceRequests(requests || []); // Set the fetched requests
      }
    };

    fetchData();

     // Optional: Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        // If user logs out from another tab, redirect from profile page
        if (!session?.user) {
             router.push('/login');
        }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, [supabase.auth, router]); // Depend on supabase.auth and router

  if (loading) {
    return (
        <>
            <Header />
             {/* Adjust padding top to match header height */}
            <div className="pt-16 sm:pt-20 bg-[#19325b] min-h-screen flex items-center justify-center">
                <p className="text-white">Carregando solicitações...</p>
            </div>
            <Footer />
        </>
    );
  }

  if (error) {
       return (
        <>
            <Header />
             {/* Adjust padding top to match header height */}
            <div className="pt-16 sm:pt-20 bg-[#19325b] min-h-screen flex items-center justify-center">
                <p className="text-red-500">Erro: {error}</p>
            </div>
            <Footer />
        </>
    );
  }

    // If user is null after loading, it means the redirect to login is happening
    if (!user) {
        return null; // Or a loading spinner/message while redirecting
    }

  return (
    <>
      <Header />
      {/* Main Content Wrapper for Padding below Header */}
       {/* Adjust padding top to match header height */}
      <div className="pt-16 sm:pt-20 bg-[#19325b] min-h-screen py-8 px-4">
         <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Minhas Solicitações de Serviço</h2>

            {serviceRequests.length === 0 ? (
                <p className="text-center text-gray-600">Você ainda não solicitou nenhum serviço.</p>
            ) : (
                <div className="space-y-6">
                    {serviceRequests.map((request) => (
                        <div key={request.id} className="border border-gray-300 rounded-md p-4 shadow-sm">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-gray-800">Solicitação #{request.created_at.substring(0, 10)}</h3> {/* Simple display of date */}
                                <span className={`px-3 py-1 rounded-full text-sm font-medium
                                    ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                    ${request.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                                    ${request.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                                    ${request.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                `}>{request.status}</span>
                            </div>
                            <div className="mb-3">
                                <p className="text-gray-700 font-medium mb-1">Serviços Solicitados:</p>
                                <ul className="list-disc list-inside text-gray-600 text-sm">
                                    {request.requested_services.map((service, index) => (
                                        <li key={index}>{service.name} - R${service.price.toFixed(2).replace('.', ',')}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-gray-700 text-sm mb-2">
                                <span className="font-medium">Atendimento:</span> {request.scheduling_type === 'now' ? 'Na Hora' : 'Agendado'}
                            </div>
                             {request.requested_datetime && (
                                <div className="text-gray-700 text-sm mb-2">
                                     <span className="font-medium">Data/Hora Solicitada:</span> {new Date(request.requested_datetime).toLocaleString('pt-BR')}
                                </div>
                             )}
                              {request.scheduled_datetime && (
                                <div className="text-gray-700 text-sm mb-2">
                                     <span className="font-medium">Data/Hora Agendada:</span> {new Date(request.scheduled_datetime).toLocaleString('pt-BR')}
                                </div>
                             )}
                             {request.admin_notes && (
                                 <div className="text-gray-700 text-sm mb-2">
                                     <span className="font-medium">Notas do Atendimento:</span> {request.admin_notes}
                                 </div>
                             )}
                             {request.final_price !== null && ( // Check specifically for null as 0 is a valid price
                                 <div className="text-gray-700 text-sm">
                                     <span className="font-medium">Preço Final:</span> R${request.final_price.toFixed(2).replace('.', ',')}
                                 </div>
                             )}
                            {/* Add action buttons here later if needed (e.g., Cancel) */}
                        </div>
                    ))}
                </div>
            )}
         </div>
      </div>
      <Footer />
    </>
  );
} 