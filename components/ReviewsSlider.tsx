'use client';

import { useState, useEffect, useRef } from 'react';
// Assuming Font Awesome is loaded globally via app/layout.tsx for now

interface Review {
  name: string;
  avatar: string;
  rating: number; // Number of full stars
  text: string;
  date: string;
}

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  // Helper to render stars
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="text-yellow-500">&#9733;</span>); // Full star
      } else {
        stars.push(<span key={i} className="text-gray-300">&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="min-w-full box-border bg-white rounded-lg p-8 shadow-lg text-left flex flex-col justify-between backface-hidden">
      <div className="review-card-header">
        {/* Update image source for Next.js public folder */}
        {/* Using a simple img tag for now, consider next/image for optimization */}
        <img src={review.avatar} alt={review.name} className="w-20 h-20 rounded-full object-cover mr-5 border-3 border-blue-600" />
        <div className="reviewer-info">
          <h4 className="text-xl font-semibold text-gray-800 m-0 mb-1">{review.name}</h4>
          <div className="review-stars">
            {renderStars(review.rating)}
          </div>
        </div>
      </div>
      <p className="text-lg leading-relaxed text-gray-700 mb-5 flex-grow">{`"${review.text}"`}</p> {/* Add quotes around review text */}
      <span className="text-sm text-gray-600 text-right mt-auto block">{review.date}</span>
    </div>
  );
}

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slides = [ // Sample data, replace with your actual review data
    {
      name: 'Ana Silva',
      avatar: '/people.jpg', // Assuming people.jpg is in public folder
      rating: 5,
      text: 'Estou impressionada com a qualidade do produto e o atendimento ao cliente foi excepcional. Com certeza comprarei novamente!',
      date: '20 de Maio, 2025',
    },
    {
      name: 'Carlos Pereira',
      avatar: '/people.jpg', // Assuming people.jpg is in public folder
      rating: 4,
      text: 'Ótimo custo-benefício. A entrega foi rápida e o item chegou em perfeitas condições. Recomendo a todos.',
      date: '15 de Maio, 2025',
    },
     {
      name: 'Mariana Costa',
      avatar: '/people.jpg', // Assuming people.jpg is in public folder
      rating: 5,
      text: 'Experiência de compra fantástica! O site é fácil de navegar e o suporte é muito atencioso. Produto de alta qualidade.',
      date: '10 de Maio, 2025',
    },
     {
      name: 'Rafael Lima',
      avatar: '/people.jpg', // Assuming people.jpg is in public folder
      rating: 5,
      text: 'Superou minhas expectativas! Desde a embalagem até a funcionalidade do produto, tudo perfeito. Virei cliente fiel.',
      date: '05 de Maio, 2025',
    },
    // Add more reviews here
  ];
  const totalSlides = slides.length;

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Update slider position when currentIndex changes
  useEffect(() => {
    if (trackRef.current) {
      const offset = currentIndex * 100; // Move 100% for each slide
      trackRef.current.style.transform = `translateX(-${offset}%)`;
    }
  }, [currentIndex]);

  const moveToSlide = (index: number) => {
     // Stop autoplay temporarily or reset timer on manual navigation if desired
     // For simplicity, autoplay continues here.
     setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  return (
    <section className="py-16 px-4 text-center" id="reviews">
      <h2 className="text-4xl text-gray-800 mb-12">
        O que nossos <span className="text-blue-600">Clientes Dizem</span>
      </h2>
      <div className="max-w-2xl mx-auto relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out will-change-transform backface-hidden" ref={trackRef}>
          {slides.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>

        {/* Slider Navigation Buttons */}
        <button className="absolute top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 border-none rounded-full w-12 h-12 cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out z-10 left-0 hover:bg-blue-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white" aria-label="Review Anterior" onClick={handlePrev}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" className="fill-blue-600 group-hover:fill-white"/>
            </svg>
        </button>
        <button className="absolute top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 border-none rounded-full w-12 h-12 cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out z-10 right-0 hover:bg-blue-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white" aria-label="Próximo Review" onClick={handleNext}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" className="fill-blue-600 group-hover:fill-white"/>
            </svg>
        </button>

        {/* Slider Dots */}
        <div className="text-center mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`inline-block w-3 h-3 bg-gray-400 rounded-full mx-1 cursor-pointer transition-all duration-300 ease-in-out ${index === currentIndex ? 'bg-blue-600 scale-125' : ''}`}
              aria-label={`Ir para review ${index + 1}`}
              onClick={() => moveToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 