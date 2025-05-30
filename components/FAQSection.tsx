'use client';

import { useState } from 'react';
// Import Font Awesome icons if using a React library like react-icons
// import { FaChevronDown } from 'react-icons/fa'; 

// Assuming Font Awesome is loaded globally via app/layout.tsx for now

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mb-4 rounded-lg shadow-md overflow-hidden ${isOpen ? 'active' : ''}`}>
      <button className="w-full bg-[#111827] border-none p-5 text-lg font-semibold text-[#A78BFA] text-left cursor-pointer flex justify-between items-center transition-colors duration-300 ease-in-out hover:bg-[#1E293B]" onClick={toggleOpen}>
        <span>{question}</span>
        {/* Replace SVG with react-icons if used */}
        <svg className={`w-6 h-6 transition-transform duration-300 ease-in-out stroke-[#6D28D9] ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        {/* Example with react-icons: <FaChevronDown className={`faq-icon ${isOpen ? 'rotate-180' : ''}`} /> */}
      </button>
      {/* The actual height transition will be handled by CSS classes */}
      <div className={`overflow-hidden transition-[max-height] duration-400 ease-out bg-[#111827] text-[#E2E8F0] text-base leading-relaxed ${isOpen ? 'max-h-[1000px] py-5 px-5' : 'max-h-0 py-0 px-5'}`}> {/* Use a large enough max-height or calculate dynamically if needed */}
          <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
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
      question: 'Qual o prazo de entrega?',
      answer: 'O prazo de entrega varia de acordo com a sua localidade e a modalidade de frete escolhida. Você pode calcular o prazo estimado diretamente na página do produto ou no carrinho, inserindo seu CEP.'
    },
    {
      question: 'Posso trocar ou devolver um produto?',
      answer: 'Sim, nossa política de trocas e devoluções segue o Código de Defesa do Consumidor. Você tem até 7 dias corridos após o recebimento para solicitar a devolução por arrependimento e até 30 dias para troca em caso de defeito. Consulte nossa página de "Trocas e Devoluções" para mais detalhes.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-10 px-4 text-center bg-[#171313]" id="doubts">
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
        
        <div className="mt-10">
          <a
            href="/faq"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white font-semibold hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] transition-all duration-300 ease-out hover:scale-105"
          >
            Ver mais dúvidas
          </a>
        </div>
      </div>
    </section>
  );
} 