'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  const [openAccordionItem, setOpenAccordionItem] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: { name: string, price: number } }>({});
  const [schedulingType, setSchedulingType] = useState('now');
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const toggleAccordion = (index: number) => {
    setOpenAccordionItem(openAccordionItem === index ? null : index);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset, checked } = e.target;
    const price = parseFloat(value);
    const serviceName = dataset.serviceName || name;
    
    if (checked) {
        setSelectedServices(prev => ({
           ...prev,
           [name]: { name: serviceName, price: price }
        }));
    }
  };

  const handleSchedulingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchedulingType(e.target.value);
    if (e.target.value === 'now') {
        setAppointmentDateTime('');
    }
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentDateTime(e.target.value);
  };

  useEffect(() => {
    let total = 0;
    Object.values(selectedServices).filter(service => service !== undefined).forEach(service => {
       if (service) {
         total += service.price;
       }
    });
    setTotalPrice(total);
    setSubmitSuccess(false);
    setSubmitError(null);
  }, [selectedServices]);

  const handleSubmitRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            alert('Você precisa estar logado para solicitar um serviço.');
            router.push('/login');
            return;
        }

        const servicesArray = Object.values(selectedServices).filter(service => service !== undefined);

        if (servicesArray.length === 0) {
            setSubmitError('Por favor, selecione pelo menos um serviço principal.');
            return;
        }

        if (schedulingType === 'later' && !appointmentDateTime) {
             setSubmitError('Por favor, selecione a data e hora para agendar o atendimento.');
             return;
        }

        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        const requestedDt = schedulingType === 'later' && appointmentDateTime ? new Date(appointmentDateTime).toISOString() : null;

        const { data, error } = await supabase
            .from('service_requests')
            .insert([
                {
                    user_id: user.id,
                    requested_services: servicesArray,
                    scheduling_type: schedulingType,
                    requested_datetime: requestedDt,
                    status: 'pending',
                },
            ])
            .select();

        setIsSubmitting(false);

        if (error) {
            console.error('Error submitting service request:', error);
            setSubmitError('Ocorreu um erro ao enviar sua solicitação. Tente novamente.');
        } else {
            console.log('Service request submitted successfully:', data);
            setSubmitSuccess(true);
        }
   };

  const generateWhatsAppMessage = () => {
    let message = "Olá! Gostaria de solicitar os seguintes serviços:\n";
    const selectedServiceList = Object.values(selectedServices).filter(service => service !== undefined);

    if (selectedServiceList.length > 0) {
        message += selectedServiceList.map(service => `- ${service?.name}: R$${service?.price.toFixed(2).replace('.', ',')}`).join('\n') + '\n\n';
    } else {
        message += "(Nenhum serviço principal selecionado)\n\n";
    }

    let schedulingInfo = "Atendimento: Imediato (sujeito à disponibilidade)";
    if (schedulingType === 'later' && appointmentDateTime) {
        try {
            const dateObj = new Date(appointmentDateTime);
            const formattedDate = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const formattedTime = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            schedulingInfo = `Atendimento Agendado para: ${formattedDate} às ${formattedTime}`;
        } catch (e) {
            console.error("Erro ao formatar data/hora: ", e);
            schedulingInfo = "Atendimento Agendado: (Data/hora a confirmar)";
        }
    } else if (schedulingType === 'later') {
         schedulingInfo = "Atendimento Agendado: (Por favor, selecione data e hora)";
    }

    message += schedulingInfo + '\n\n';
    message += "Total Estimado: R$" + totalPrice.toFixed(2).replace('.', ',');

    const yourPhoneNumber = 'SEUNUMERODOWHATSAPP';

    if (yourPhoneNumber === 'SEUNUMERODOWHATSAPP') {
        console.error('WhatsApp number not configured.');
        alert('Please configure the WhatsApp number in the code.');
        return '#';
    }

    return `https://wa.me/${yourPhoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <Header />
      <section className="pt-32 sm:pt-24 pb-12 px-4 bg-[#19325b] min-h-screen">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-center text-3xl font-semibold text-gray-800 mb-2">Monte Seu Plano de Serviços de TI</h2>
              <p className="text-center text-sm text-gray-600 mb-8">Selecione os serviços desejados e escolha como prefere o atendimento.</p>

              <form onSubmit={handleSubmitRequest}>
                  <div className="service-categories">
                      <div className={`border border-gray-300 rounded-md mb-4 overflow-hidden ${openAccordionItem === 0 ? 'shadow-sm' : ''}`}>
                          <button type="button" className={`w-full bg-gray-100 text-gray-800 cursor-pointer py-4 px-6 border-none text-left text-lg font-medium transition-colors duration-300 ease-in-out flex justify-between items-center focus:outline-none ${openAccordionItem === 0 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`} onClick={() => toggleAccordion(0)}>
                              Formatação Completa
                              <span className="transform transition-transform duration-300 ease-in-out"><i className={`fas fa-chevron-down text-sm ${openAccordionItem === 0 ? 'rotate-180 text-white' : 'text-blue-600'}`}></i></span>
                          </button>
                          <div className={`transition-[max-height] duration-400 ease-out overflow-hidden bg-white ${openAccordionItem === 0 ? 'max-h-[1000px] py-6 px-6' : 'max-h-0 py-0 px-6'}`}>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="formatacao_basica" name="formatacao" value="100" data-service-name="Formatação Básica" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.formatacao?.name === 'Formatação Básica'}/>
                                      <label htmlFor="formatacao_basica" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Básica</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$100,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Backup, formatação, instalação de drivers e atualizações.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="formatacao_media" name="formatacao" value="150" data-service-name="Formatação Média" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.formatacao?.name === 'Formatação Média'}/>
                                      <label htmlFor="formatacao_media" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Média</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$150,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Inclui "Básica" + antivírus e otimização básica.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="formatacao_avancada" name="formatacao" value="200" data-service-name="Formatação Avançada" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.formatacao?.name === 'Formatação Avançada'}/>
                                      <label htmlFor="formatacao_avancada" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Avançada</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$200,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Inclui "Média" + otimização média de desempenho.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="formatacao_corporativa" name="formatacao" value="350" data-service-name="Formatação Corporativa" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.formatacao?.name === 'Formatação Corporativa'}/>
                                      <label htmlFor="formatacao_corporativa" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Corporativa</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$350,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Inclui "Avançada" + Pacote Office (permanente*) e otimização avançada.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="formatacao_gamer" name="formatacao" value="450" data-service-name="Formatação Gamer" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.formatacao?.name === 'Formatação Gamer'}/>
                                      <label htmlFor="formatacao_gamer" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Gamer</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$450,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Inclui "Avançada" + Pacote Office (opcional) e otimização extrema para jogos (FPS, input lag, etc.).</p>
                                      </label>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className={`border border-gray-300 rounded-md mb-4 overflow-hidden ${openAccordionItem === 1 ? 'shadow-sm' : ''}`}>
                          <button type="button" className={`w-full bg-gray-100 text-gray-800 cursor-pointer py-4 px-6 border-none text-left text-lg font-medium transition-colors duration-300 ease-in-out flex justify-between items-center focus:outline-none ${openAccordionItem === 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`} onClick={() => toggleAccordion(1)}>
                              Otimização de Desempenho (Sem Formatar)
                              <span className="transform transition-transform duration-300 ease-in-out"><i className={`fas fa-chevron-down text-sm ${openAccordionItem === 1 ? 'rotate-180 text-white' : 'text-blue-600'}`}></i></span>
                          </button>
                          <div className={`transition-[max-height] duration-400 ease-out overflow-hidden bg-white ${openAccordionItem === 1 ? 'max-h-[1000px] py-6 px-6' : 'max-h-0 py-0 px-6'}`}>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="otimizacao_basica" name="otimizacao" value="70" data-service-name="Otimização Básica" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.otimizacao?.name === 'Otimização Básica'}/>
                                      <label htmlFor="otimizacao_basica" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Básica</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$70,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Drivers, atualizações, correção de erros e otimização básica.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="otimizacao_media" name="otimizacao" value="100" data-service-name="Otimização Média" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.otimizacao?.name === 'Otimização Média'}/>
                                      <label htmlFor="otimizacao_media" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Média</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$100,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Inclui "Básica" + otimização média de performance.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="otimizacao_avancada" name="otimizacao" value="150" data-service-name="Otimização Avançada" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.otimizacao?.name === 'Otimização Avançada'}/>
                                      <label htmlFor="otimizacao_avancada" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Avançada</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$150,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Inclui "Média" + otimização avançada de performance.</p>
                                      </label>
                                  </div>
                               </div>
                           </div>
                       </div>
                       <div className={`border border-gray-300 rounded-md mb-4 overflow-hidden ${openAccordionItem === 2 ? 'shadow-sm' : ''}`}>
                          <button type="button" className={`w-full bg-gray-100 text-gray-800 cursor-pointer py-4 px-6 border-none text-left text-lg font-medium transition-colors duration-300 ease-in-out flex justify-between items-center focus:outline-none ${openAccordionItem === 2 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`} onClick={() => toggleAccordion(2)}>
                              Recuperação de Dados
                              <span className="transform transition-transform duration-300 ease-in-out"><i className={`fas fa-chevron-down text-sm ${openAccordionItem === 2 ? 'rotate-180 text-white' : 'text-blue-600'}`}></i></span>
                          </button>
                          <div className={`transition-[max-height] duration-400 ease-out overflow-hidden bg-white ${openAccordionItem === 2 ? 'max-h-[1000px] py-6 px-6' : 'max-h-0 py-0 px-6'}`}>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="recuperacao_basica" name="recuperacao" value="100" data-service-name="Recuperação Básica" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.recuperacao?.name === 'Recuperação Básica'}/>
                                      <label htmlFor="recuperacao_basica" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Básica</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$100,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Recuperação de arquivos deletados/corrompidos (softwares padrão).</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="recuperacao_media" name="recuperacao" value="150" data-service-name="Recuperação Média" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.recuperacao?.name === 'Recuperação Média'}/>
                                      <label htmlFor="recuperacao_media" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Média</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$150,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Casos complexos, ferramentas especializadas, análise de setores.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="recuperacao_avancada" name="recuperacao" value="200" data-service-name="Recuperação Avançada" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.recuperacao?.name === 'Recuperação Avançada'}/>
                                      <label htmlFor="recuperacao_avancada" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Avançada</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$200,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Discos com falhas graves, clonagem, tratamento de bad blocks.</p>
                                      </label>
                                  </div>
                               </div>
                           </div>
                       </div>
                       <div className={`border border-gray-300 rounded-md mb-4 overflow-hidden ${openAccordionItem === 3 ? 'shadow-sm' : ''}`}>
                          <button type="button" className={`w-full bg-gray-100 text-gray-800 cursor-pointer py-4 px-6 border-none text-left text-lg font-medium transition-colors duration-300 ease-in-out flex justify-between items-center focus:outline-none ${openAccordionItem === 3 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`} onClick={() => toggleAccordion(3)}>
                              Instalação de Programas
                              <span className="transform transition-transform duration-300 ease-in-out"><i className={`fas fa-chevron-down text-sm ${openAccordionItem === 3 ? 'rotate-180 text-white' : 'text-blue-600'}`}></i></span>
                          </button>
                          <div className={`transition-[max-height] duration-400 ease-out overflow-hidden bg-white ${openAccordionItem === 3 ? 'max-h-[1000px] py-6 px-6' : 'max-h-0 py-0 px-6'}`}>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="programas_basica" name="instalacao_programas" value="100" data-service-name="Instalação Básica de Programas" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.instalacao_programas?.name === 'Instalação Básica de Programas'}/>
                                      <label htmlFor="programas_basica" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Básica</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$100,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Até 5 programas essenciais, atualizações e ajustes.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="programas_media" name="instalacao_programas" value="150" data-service-name="Instalação Média de Programas" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.instalacao_programas?.name === 'Instalação Média de Programas'}/>
                                      <label htmlFor="programas_media" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Média</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$150,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Até 10 programas, configurações personalizadas e drivers.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="programas_avancada" name="instalacao_programas" value="200" data-service-name="Instalação Avançada de Programas" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.instalacao_programas?.name === 'Instalação Avançada de Programas'}/>
                                      <label htmlFor="programas_avancada" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Avançada</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$200,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Instalação completa, configuração avançada e personalização.</p>
                                      </label>
                                  </div>
                               </div>
                           </div>
                       </div>
                       <div className={`border border-gray-300 rounded-md mb-4 overflow-hidden ${openAccordionItem === 4 ? 'shadow-sm' : ''}`}>
                          <button type="button" className={`w-full bg-gray-100 text-gray-800 cursor-pointer py-4 px-6 border-none text-left text-lg font-medium transition-colors duration-300 ease-in-out flex justify-between items-center focus:outline-none ${openAccordionItem === 4 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`} onClick={() => toggleAccordion(4)}>
                              Instalação de Impressora
                              <span className="transform transition-transform duration-300 ease-in-out"><i className={`fas fa-chevron-down text-sm ${openAccordionItem === 4 ? 'rotate-180 text-white' : 'text-blue-600'}`}></i></span>
                          </button>
                          <div className={`transition-[max-height] duration-400 ease-out overflow-hidden bg-white ${openAccordionItem === 4 ? 'max-h-[1000px] py-6 px-6' : 'max-h-0 py-0 px-6'}`}>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="impressora_basica" name="instalacao_impressora" value="100" data-service-name="Instalação Básica de Impressora" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.instalacao_impressora?.name === 'Instalação Básica de Impressora'}/>
                                      <label htmlFor="impressora_basica" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Básica</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$100,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Instalação simples, driver e teste de impressão local.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="impressora_media" name="instalacao_impressora" value="150" data-service-name="Instalação Média de Impressora" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.instalacao_impressora?.name === 'Instalação Média de Impressora'}/>
                                      <label htmlFor="impressora_media" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Média</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$150,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Instalação local e em rede, múltiplos usuários, teste completo.</p>
                                      </label>
                                  </div>
                                   <div className="border border-gray-300 rounded-md relative transition-colors duration-300 ease-in-out hover:border-blue-600">
                                      <input type="radio" id="impressora_avancada" name="instalacao_impressora" value="200" data-service-name="Instalação Avançada de Impressora" className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer m-0 z-10" onChange={handleServiceChange} checked={selectedServices.instalacao_impressora?.name === 'Instalação Avançada de Impressora'}/>
                                      <label htmlFor="impressora_avancada" className="flex flex-col p-5 cursor-pointer h-full box-border rounded-md has-[:checked]:border-2 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-inner">
                                          <span className="text-base font-semibold text-gray-800 mb-1">Avançada</span>
                                          <span className="text-base font-bold text-blue-600 mb-2">R$200,00</span>
                                          <p className="text-sm text-gray-600 leading-relaxed m-0 flex-grow">Integração nuvem, digitalização, fax, treinamento básico.</p>
                                      </label>
                                  </div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div className="scheduling-section mt-10 pt-8 border-t border-gray-300 text-center">
                       <h3 className="text-xl text-gray-800 mb-5 font-semibold">Como prefere o atendimento?</h3>
                       <div className="flex justify-center gap-8 mb-5 flex-wrap">
                           <div className="flex items-center">
                               <input type="radio" id="schedule_now" name="scheduling_type" value="now" checked={schedulingType === 'now'} onChange={handleSchedulingChange} className="mr-2 accent-blue-600"/>
                               <label htmlFor="schedule_now" className="text-base text-gray-700 cursor-pointer">Na Hora (Sujeito à disponibilidade)</label>
                           </div>
                           <div className="flex items-center">
                               <input type="radio" id="schedule_later" name="scheduling_type" value="later" checked={schedulingType === 'later'} onChange={handleSchedulingChange} className="mr-2 accent-blue-600"/>
                               <label htmlFor="schedule_later" className="text-base text-gray-700 cursor-pointer">Agendar Atendimento</label>
                           </div>
                       </div>
                       {schedulingType === 'later' && (
                           <div id="date-time-picker" className="mt-4">
                               <label htmlFor="appointment_datetime" className="block mb-2 text-base">Escolha data e hora:</label>
                               <input type="datetime-local" id="appointment_datetime" name="appointment_datetime" value={appointmentDateTime} onChange={handleDateTimeChange} className="py-2 px-4 border border-gray-300 rounded-md text-base min-w-[250px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"/>
                           </div>
                       )}
                   </div>

                   <div className="summary-section mt-10 pt-8 border-t border-gray-300 text-center">
                       <p className="text-2xl font-bold text-gray-800 mb-6">Total Estimado: <span id="total-display" className="text-green-600">R${totalPrice.toFixed(2).replace('.', ',')}</span></p>

                       {user ? (
                            <button
                                type="submit"
                                className={`inline-flex items-center justify-center py-4 px-8 bg-blue-600 text-white text-lg font-semibold rounded-md transition-colors duration-300 ease-in-out shadow-sm hover:bg-blue-700 ${totalPrice === 0 || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={totalPrice === 0 || isSubmitting}
                            >
                                {isSubmitting ? 'Enviando...' : 'Solicitar Serviço'}
                            </button>
                       ) : (
                            <a id="whatsapp-btn" className={`inline-flex items-center justify-center py-4 px-8 bg-green-500 text-white text-lg font-semibold rounded-md transition-colors duration-300 ease-in-out shadow-sm hover:bg-green-600 ${totalPrice === 0 ? 'opacity-70 cursor-not-allowed' : ''}`}
                               href={generateWhatsAppMessage()} target="_blank" rel="noopener noreferrer" aria-label="Enviar pedido pelo WhatsApp" onClick={(e) => { if (totalPrice === 0) e.preventDefault(); }}>
                                <i className="fab fa-whatsapp mr-3 text-xl"></i> Enviar via WhatsApp (Não logado)
                            </a>
                       )}

                       {submitSuccess && (
                           <p className="text-green-600 text-sm mt-4">Solicitação de serviço enviada com sucesso! Você pode ver suas solicitações na página de perfil.</p>
                       )}
                       {submitError && (
                           <p className="text-red-500 text-sm mt-4">Erro: {submitError}</p>
                       )}

                       {totalPrice === 0 && !submitSuccess && !submitError && (
                            <p className="text-sm text-gray-600 mt-4">Selecione pelo menos um serviço para solicitar.</p>
                       )}

                        {!user && (
                            <p className="text-sm text-blue-600 mt-4">Logue ou cadastre-se para solicitar diretamente pelo site e acompanhar pela página de perfil.</p>
                        )}

                   </div>
               </form>
           </div>
       </section>

       <Footer />
    </>
  );
} 