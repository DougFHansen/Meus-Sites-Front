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
      <button className="w-full bg-white border-none p-5 text-lg font-semibold text-[#d3ad7f] text-left cursor-pointer flex justify-between items-center transition-colors duration-300 ease-in-out hover:bg-gray-100" onClick={toggleOpen}>
        <span>{question}</span>
        {/* Replace SVG with react-icons if used */}
        <svg className={`w-6 h-6 transition-transform duration-300 ease-in-out stroke-blue-600 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        {/* Example with react-icons: <FaChevronDown className={`faq-icon ${isOpen ? 'rotate-180' : ''}`} /> */}
      </button>
      {/* The actual height transition will be handled by CSS classes */}
      <div className={`overflow-hidden transition-[max-height] duration-400 ease-out bg-white text-gray-700 text-base leading-relaxed ${isOpen ? 'max-h-[1000px] py-5 px-5' : 'max-h-0 py-0 px-5'}`}> {/* Use a large enough max-height or calculate dynamically if needed */}
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
      question: 'Qual o prazo de entrega?',
      answer: 'O prazo de entrega varia de acordo com a sua localidade e a modalidade de frete escolhida. Você pode calcular o prazo estimado diretamente na página do produto ou no carrinho, inserindo seu CEP.'
    },
    {
      question: 'Posso trocar ou devolver um produto?',
      answer: 'Sim, nossa política de trocas e devoluções segue o Código de Defesa do Consumidor. Você tem até 7 dias corridos após o recebimento para solicitar a devolução por arrependimento e até 30 dias para troca em caso de defeito. Consulte nossa página de "Trocas e Devoluções" para mais detalhes.'
    },
    // Add more FAQ items here
  ];

  return (
    <section className="py-10 px-4 text-center bg-[#19325b]" id="doubts">
      <h2 className="text-4xl text-[#d3ad7f] uppercase mb-10">
        Dúvidas <span className="text-white">Frequentes</span>
      </h2>
      <div className="max-w-3xl mx-auto text-left">
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
} 