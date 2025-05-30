'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FAQPage() {
  const faqData = [
    {
      question: 'Como funciona o processo de compra?',
      answer: 'Nosso processo de compra é simples e intuitivo. Primeiro, navegue pelos nossos produtos e adicione os itens desejados ao carrinho. Em seguida, vá para o checkout, preencha seus dados de entrega e pagamento. Após a confirmação do pagamento, seu pedido será processado e enviado.'
    },
    {
      question: 'Quais são as formas de pagamento aceitas?',
      answer: 'Aceitamos diversas formas de pagamento, incluindo cartões de crédito (Visa, MasterCard, Elo, Amex), boleto bancário e PIX. Você poderá escolher a opção que preferir na finalização da compra.'
    },
    {
      question: 'Como funcionará o serviço?',
      answer: 'O processo é simples e eficiente: primeiro, você escolhe o serviço desejado e realiza a compra. Em seguida, receberá o contrato do serviço por email. Após fazer login em sua conta, você poderá visualizar sua solicitação no painel e escolher entre atendimento imediato ou agendado. Para realizar o serviço, utilizaremos ferramentas de acesso remoto como AnyDesk ou TeamViewer, que permitem que nossos técnicos acessem seu computador de forma segura para executar o serviço solicitado.'
    },
    {
      question: 'Quanto tempo leva para realizar um serviço?',
      answer: 'O tempo de execução varia de acordo com o serviço solicitado. Uma formatação básica pode levar em torno de 1-2 horas, enquanto serviços mais complexos como recuperação de dados podem levar mais tempo. Durante o atendimento, nosso técnico fornecerá uma estimativa mais precisa.'
    },
    {
      question: 'O serviço é seguro? Como posso confiar no acesso remoto?',
      answer: 'Sim, nosso serviço é totalmente seguro. Utilizamos ferramentas reconhecidas mundialmente como AnyDesk e TeamViewer, que possuem criptografia de ponta a ponta. Além disso, você mantém total controle sobre o acesso ao seu computador e pode encerrar a sessão a qualquer momento.'
    },
    {
      question: 'E se eu perder meus arquivos durante o serviço?',
      answer: 'Antes de qualquer serviço que possa afetar seus arquivos (como formatação), realizamos um backup completo dos dados importantes que você indicar. Além disso, nossos técnicos são treinados para trabalhar com máximo cuidado e segurança.'
    },
    {
      question: 'Vocês oferecem garantia dos serviços?',
      answer: 'Sim, oferecemos garantia em todos os nossos serviços. O período de garantia varia de acordo com o tipo de serviço realizado, mas geralmente é de 30 dias para problemas relacionados diretamente ao serviço prestado.'
    },
    {
      question: 'Como funciona o suporte pós-atendimento?',
      answer: 'Após a conclusão do serviço, você tem acesso ao nosso suporte por 7 dias para tirar dúvidas ou resolver pequenos ajustes relacionados ao serviço realizado. Para problemas diferentes ou após esse período, será necessário um novo atendimento.'
    },
    {
      question: 'Posso agendar o serviço para um horário específico?',
      answer: 'Sim! Oferecemos tanto atendimento imediato quanto agendado. Você pode escolher o melhor horário para você dentro de nossa disponibilidade, incluindo horários noturnos e fins de semana.'
    },
    {
      question: 'O que acontece se o serviço não puder ser concluído remotamente?',
      answer: 'Se identificarmos que o problema não pode ser resolvido remotamente (por exemplo, em caso de problemas físicos no hardware), orientaremos você sobre as melhores opções e, se necessário, indicaremos profissionais confiáveis em sua região.'
    },
    {
      question: 'Vocês atendem a empresas também?',
      answer: 'Sim! Temos planos especiais para empresas, com prioridade no atendimento e possibilidade de contrato de suporte contínuo. Entre em contato conosco para conhecer nossas soluções corporativas.'
    },
    {
      question: 'Como é feito o pagamento dos serviços?',
      answer: 'O pagamento é realizado antes do início do serviço através das opções disponíveis (cartão de crédito, PIX ou boleto). Para empresas com contrato, podem ser estabelecidas condições especiais de pagamento.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#171313] pt-24">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
              Dúvidas Frequentes
            </span>
          </h1>
          
          <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <div key={index} className="mb-6">
                <button
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ease-in-out flex justify-between items-center ${
                    activeIndex === index
                      ? 'bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white'
                      : 'bg-[#1c1c1e] text-white hover:bg-[#2a2a2e]'
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    activeIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-4 bg-[#1c1c1e] text-[#e2e8f0] rounded-b-lg">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 