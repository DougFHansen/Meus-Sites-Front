'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Define types for better type safety
interface ServiceRequest {
  id: string;
  user_id: string; // Add user_id to interface
  created_at: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  requested_services: { name: string; price: number; }[];
  scheduling_type: string;
  requested_datetime: string | null;
  scheduled_datetime: string | null;
  admin_notes: string | null;
  final_price: number | null;
}

// Assuming a profiles table exists with an is_admin column
interface UserProfile {
    id: string;
    full_name?: string;
    is_admin: boolean;
}

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // To track which request is being updated

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        // If no user is logged in, redirect to home or login page
        router.push('/'); // Or '/login'
        return;
      }

      // Fetch user profile to check admin status
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, is_admin')
        .eq('id', user.id)
        .single();

      if (profileError || !profileData || !profileData.is_admin) {
        // If profile fetch fails, no profile, or not admin, redirect
        console.error('Admin check failed:', profileError?.message || 'Not an admin.');
        router.push('/');
        return;
      }
      setProfile(profileData);

      // Fetch all service requests (only accessible if the user is admin and RLS is set up)
      const { data: requests, error: fetchError } = await supabase
        .from('service_requests')
        .select('*') // Admins can select all
        .order('created_at', { ascending: false });

      setLoading(false);

      if (fetchError) {
        console.error('Error fetching service requests:', fetchError);
        setError('Ocorreu um erro ao carregar as solicitações de serviço.');
        setServiceRequests([]);
      } else {
        setServiceRequests(requests || []);
      }
    };

    fetchData();

    // Optional: Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        // If user logs out from another tab or admin status changes, re-check
        if (!session?.user) {
             router.push('/'); // Redirect if logged out
        } else {
            // Could re-fetch profile here if admin status can change during session
        }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, [supabase.auth, router]); // Depend on supabase.auth and router

  // Handler to update service request status or schedule time
  const handleUpdateStatus = async (requestId: string, newStatus: ServiceRequest['status']) => {
       setIsUpdating(requestId); // Indicate which request is being updated
       const { error: updateError } = await supabase
           .from('service_requests')
           .update({ status: newStatus })
           .eq('id', requestId);

       setIsUpdating(null); // Reset updating state

       if (updateError) {
           console.error(`Error updating request ${requestId} status:`, updateError);
           // Optionally show an error message to the admin
       } else {
           // Update the local state to reflect the change immediately
           setServiceRequests(serviceRequests.map(req =>
               req.id === requestId ? { ...req, status: newStatus } : req
           ));
       }
  };

   const handleScheduleTime = async (requestId: string, scheduledTime: string) => {
        setIsUpdating(requestId); // Indicate which request is being updated
        const scheduledDt = scheduledTime ? new Date(scheduledTime).toISOString() : null;

        const { error: updateError } = await supabase
            .from('service_requests')
            .update({ scheduled_datetime: scheduledDt, status: 'scheduled' }) // Set status to scheduled when time is set
            .eq('id', requestId);

        setIsUpdating(null); // Reset updating state

        if (updateError) {
            console.error(`Error scheduling request ${requestId}:`, updateError);
            // Optionally show an error message
        } else {
            // Update local state
            setServiceRequests(serviceRequests.map(req =>
                req.id === requestId ? { ...req, scheduled_datetime: scheduledDt, status: 'scheduled' } : req
            ));
        }
   };

   const handleUpdateNotes = async (requestId: string, notes: string) => {
        setIsUpdating(requestId);
         const { error: updateError } = await supabase
            .from('service_requests')
            .update({ admin_notes: notes })
            .eq('id', requestId);

        setIsUpdating(null);

         if (updateError) {
            console.error(`Error updating notes for request ${requestId}:`, updateError);
         } else {
             setServiceRequests(serviceRequests.map(req =>
                req.id === requestId ? { ...req, admin_notes: notes } : req
            ));
         }
   };

   // Note: Implementing final price update is similar to the above handlers.


  if (loading) {
    return (
        <>
            <Header />
            <div className="pt-16 sm:pt-20 bg-[#19325b] min-h-screen flex items-center justify-center">
                <p className="text-white">Carregando...</p>
            </div>
            <Footer />
        </>
    );
  }

  // If not loading and user or profile is null, it means redirect happened
  if (!user || !profile) {
      return null; // Redirect is handled in useEffect
  }

  // If loaded but not admin (should be redirected by now, but a fallback check)
   if (!profile.is_admin) {
       return (
           <>
               <Header />
               <div className="pt-16 sm:pt-20 bg-[#19325b] min-h-screen flex items-center justify-center">
                   <p className="text-red-500">Acesso negado. Você não tem permissões de administrador.</p>
               </div>
               <Footer />
           </>
       );
   }

  // Render admin content if user is an admin
  return (
    <>
      <Header />
      {/* Main Content Wrapper for Padding below Header */}
      <div className="pt-16 sm:pt-20 bg-[#19325b] min-h-screen py-8 px-4">
         <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Painel do Administrador - Solicitações de Serviço</h2>

            {serviceRequests.length === 0 ? (
                <p className="text-center text-gray-600">Nenhuma solicitação de serviço encontrada.</p>
            ) : (
                <div className="space-y-6">
                    {serviceRequests.map((request) => (
                        <div key={request.id} className="border border-gray-300 rounded-md p-4 shadow-sm bg-gray-50">
                             <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-semibold text-gray-800">Solicitação #{request.created_at.substring(0, 10)}</h3>
                                 {/* Display user ID (or fetch/join with profiles for full name) */}
                                 <p className="text-sm text-gray-500">User ID: {request.user_id}</p>
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
                                <span className="font-medium">Atendimento Preferido:</span> {request.scheduling_type === 'now' ? 'Na Hora' : 'Agendado'}
                            </div>
                             {request.requested_datetime && (
                                <div className="text-gray-700 text-sm mb-2">
                                     <span className="font-medium">Data/Hora Solicitada:</span> {new Date(request.requested_datetime).toLocaleString('pt-BR')}
                                </div>
                             )}

                            {/* Admin Management Controls */}
                             <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                                 {/* Status Update */}
                                 <div>
                                     <label htmlFor={`status-${request.id}`} className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                                     <select
                                        id={`status-${request.id}`}
                                        value={request.status}
                                        onChange={(e) => handleUpdateStatus(request.id, e.target.value as ServiceRequest['status'])}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        disabled={isUpdating === request.id}
                                     >
                                         <option value="pending">Pending</option>
                                         <option value="scheduled">Scheduled</option>
                                         <option value="completed">Completed</option>
                                         <option value="cancelled">Cancelled</option>
                                     </select>
                                 </div>

                                 {/* Schedule Time */}
                                  <div>
                                     <label htmlFor={`scheduled-time-${request.id}`} className="block text-sm font-medium text-gray-700 mb-1">Agendar Data/Hora:</label>
                                     <input
                                        type="datetime-local"
                                        id={`scheduled-time-${request.id}`}
                                        value={request.scheduled_datetime ? new Date(request.scheduled_datetime).toISOString().substring(0, 16) : ''} // Format for datetime-local input
                                        onChange={(e) => handleScheduleTime(request.id, e.target.value)}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        disabled={isUpdating === request.id}
                                     />
                                      {request.scheduled_datetime && (
                                        <p className="mt-1 text-sm text-gray-500">Agendado para: {new Date(request.scheduled_datetime).toLocaleString('pt-BR')}</p>
                                      )}
                                  </div>

                                  {/* Admin Notes */}
                                   <div>
                                     <label htmlFor={`admin-notes-${request.id}`} className="block text-sm font-medium text-gray-700 mb-1">Notas do Admin:</label>
                                     <textarea
                                        id={`admin-notes-${request.id}`}
                                        value={request.admin_notes || ''}
                                        onChange={(e) => handleUpdateNotes(request.id, e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        disabled={isUpdating === request.id}
                                     ></textarea>
                                  </div>

                                  {/* Optional: Final Price */}
                                   {/* <div>
                                     <label htmlFor={`final-price-${request.id}`} className="block text-sm font-medium text-gray-700 mb-1">Preço Final:</label>
                                     <input
                                        type="number"
                                        id={`final-price-${request.id}`}
                                        value={request.final_price !== null ? request.final_price : ''}
                                        onChange={(e) => handleUpdatePrice(request.id, parseFloat(e.target.value))
                                        step="0.01"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        disabled={isUpdating === request.id}
                                     />
                                  </div> */}

                             </div>

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