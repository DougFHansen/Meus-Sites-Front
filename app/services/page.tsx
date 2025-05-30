"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
};

type SchedulingType = 'now' | 'schedule' | 'later' | null;

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([
    {
      id: 'formatting',
      name: 'Formatação de Computador',
      description: 'Formatação completa com instalação do Windows e drivers',
      price: 120.00,
      selected: false
    },
    {
      id: 'optimization',
      name: 'Otimização',
      description: 'Limpeza e otimização de desempenho',
      price: 80.00,
      selected: false
    },
    {
      id: 'antivirus',
      name: 'Remoção de Vírus',
      description: 'Limpeza completa de vírus e malwares',
      price: 100.00,
      selected: false
    },
    {
      id: 'software',
      name: 'Instalação de Programas',
      description: 'Instalação de pacote Office, navegadores e outros softwares',
      price: 50.00,
      selected: false
    },
    {
      id: 'printer',
      name: 'Instalação de Impressora',
      description: 'Configuração de impressora local ou em rede',
      price: 60.00,
      selected: false
    },
    {
      id: 'gaming',
      name: 'Otimização Gamer',
      description: 'Configurações avançadas para melhor desempenho em jogos',
      price: 150.00,
      selected: false
    }
  ]);

  const [schedulingType, setSchedulingType] = useState<SchedulingType>(null);
  const [appointmentDateTime, setAppointmentDateTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Input sanitization functions
  const sanitizeText = (text: string): string => {
    return text.replace(/[<>]/g, '').trim();
  };

  const sanitizePhone = (phone: string): string => {
    return phone.replace(/[^0-9+\-()\s]/g, '').trim();
  };

  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Email is optional
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Validate name
    const sanitizedName = sanitizeText(name);
    if (!sanitizedName) {
      errors.name = 'Por favor, informe seu nome.';
      isValid = false;
    } else if (sanitizedName.length < 3) {
      errors.name = 'O nome deve ter pelo menos 3 caracteres.';
      isValid = false;
    }

    // Validate phone
    const sanitizedPhone = sanitizePhone(phone);
    if (!sanitizedPhone) {
      errors.phone = 'Por favor, informe seu telefone.';
      isValid = false;
    } else if (sanitizedPhone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Por favor, informe um telefone válido.';
      isValid = false;
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
      errors.email = 'Por favor, informe um e-mail válido.';
      isValid = false;
    }

    // Validate services
    const selectedServices = services.filter(service => service.selected);
    if (selectedServices.length === 0) {
      errors.services = 'Por favor, selecione pelo menos um serviço.';
      isValid = false;
    }

    // Validate scheduling type
    if (!schedulingType) {
      errors.scheduling = 'Por favor, selecione quando deseja ser atendido.';
      isValid = false;
    } else if (schedulingType === 'schedule' && !appointmentDateTime) {
      errors.appointment = 'Por favor, selecione a data e hora para o agendamento.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const toggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, selected: !service.selected } : service
    ));
  };

  const calculateTotal = () => {
    return services
      .filter(service => service.selected)
      .reduce((total, service) => total + service.price, 0);
  };

  const generateWhatsAppMessage = (): string => {
    const selectedServices = services.filter(service => service.selected);
    if (selectedServices.length === 0) {
      alert('Por favor, selecione pelo menos um serviço.');
      return '#';
    }

    if (!name.trim()) {
      alert('Por favor, informe seu nome.');
      return '#';
    }

    if (!phone.trim()) {
      alert('Por favor, informe seu telefone.');
      return '#';
    }

    if (schedulingType === 'schedule' && !appointmentDateTime) {
      alert('Por favor, selecione a data e hora para o agendamento.');
      return '#';
    }

    let message = `*NOVO PEDIDO DE SERVIÇO*\n\n`;
    message += `*Nome:* ${name}\n`;
    message += `*Telefone:* ${phone}\n`;
    if (email) message += `*E-mail:* ${email}\n`;
    message += `\n*Serviços Selecionados:*\n`;
    
    selectedServices.forEach(service => {
      message += `- ${service.name}: R$ ${service.price.toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n`;
    
    if (additionalInfo) {
      message += `*Informações Adicionais:*\n${additionalInfo}\n\n`;
    }

    const totalPrice = calculateTotal();
    message += `*Total:* R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

    const phoneNumber = '+5511999999999'; // Replace with your WhatsApp business number
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.MouseEvent): string => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = Object.keys(formErrors)[0];
      if (firstError) {
        const element = document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return '#';
    }
    
    return generateWhatsAppMessage();
  };

  const totalPrice = calculateTotal();

  return (
    <div className="min-h-screen bg-[#171313] text-white">
      <Header />
      <main className="pt-32 sm:pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-transparent bg-clip-text">
              Nossos Serviços
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Selecione os serviços desejados e preencha o formulário para agendar seu atendimento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Services List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-200 mb-6">Selecione os Serviços</h2>
              <div className="space-y-4">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      service.selected 
                        ? 'bg-gradient-to-r from-[#8B31FF] to-[#31A8FF] shadow-lg shadow-[#8B31FF]/30' 
                        : 'bg-gray-800 hover:bg-gray-700/80'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-lg font-medium ${
                          service.selected ? 'text-white' : 'text-white'
                        }`}>
                          {service.name}
                        </h3>
                        <p className="text-sm mt-1 text-gray-300">
                          {service.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-white">
                          R$ {service.price.toFixed(2).replace('.', ',')}
                        </div>
                        <div className="text-xs text-gray-300 mt-1">
                          {service.selected ? 'Selecionado' : 'Selecionar'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gray-800/50 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] text-transparent bg-clip-text">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            {/* Scheduling Form */}
            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <h2 className="text-2xl font-semibold text-gray-200 mb-6">Agendamento</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#8B31FF] focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#8B31FF] focus:border-transparent"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#8B31FF] focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Quando deseja ser atendido? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setSchedulingType('now')}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        schedulingType === 'now'
                          ? 'bg-[#8B31FF] text-white'
                          : 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50'
                      }`}
                    >
                      Agora
                    </button>
                    <button
                      type="button"
                      onClick={() => setSchedulingType('schedule')}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        schedulingType === 'schedule'
                          ? 'bg-[#8B31FF] text-white'
                          : 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50'
                      }`}
                    >
                      Agendar
                    </button>
                    <button
                      type="button"
                      onClick={() => setSchedulingType('later')}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        schedulingType === 'later'
                          ? 'bg-[#8B31FF] text-white'
                          : 'bg-gray-700/50 text-gray-200 hover:bg-gray-600/50'
                      }`}
                    >
                      Entro em contato
                    </button>
                  </div>
                </div>

                {schedulingType === 'schedule' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Data e Hora para Atendimento *
                    </label>
                    <input
                      type="datetime-local"
                      value={appointmentDateTime}
                      onChange={(e) => setAppointmentDateTime(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#8B31FF] focus:border-transparent"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Informações Adicionais
                  </label>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#8B31FF] focus:border-transparent"
                    placeholder="Descreva detalhes adicionais sobre o serviço necessário..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      const whatsappUrl = handleSubmit(e);
                      if (whatsappUrl && whatsappUrl !== '#') {
                        window.open(whatsappUrl, '_blank');
                      }
                    }}
                    className="w-full inline-flex justify-center items-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] hover:from-[#FF4B6B]/90 hover:via-[#8B31FF]/90 hover:to-[#31A8FF]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B31FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#8B31FF]/30"
                  >
                    <span className="mr-2">Enviar Pedido</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
