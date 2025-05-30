import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';
import ReviewsSlider from '@/components/ReviewsSlider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReviewsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#171313] pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
            Avaliações dos Clientes
          </h1>
          
          <div className="mb-16">
            <ReviewsSlider />
          </div>

          <div className="mb-16">
            <ReviewForm />
          </div>

          <ReviewList />
        </div>
      </div>
      <Footer />
    </>
  );
} 