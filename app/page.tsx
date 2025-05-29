import Image from "next/image";
import FAQSection from "@/components/FAQSection"; // Import the FAQ component
import ReviewsSlider from "@/components/ReviewsSlider"; // Import the ReviewsSlider component
import Header from "@/components/Header"; // Import the Header component
import Footer from "@/components/Footer"; // Import the Footer component

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content Wrapper for Padding below Header */}
      <div className="pt-32 sm:pt-24">

        {/* Home Section */}
        <div className="bg-[url('/home-img.jpg')] bg-cover bg-center bg-no-repeat h-screen -mt-16 sm:-mt-24 flex items-center">
            <section id="home" className="flex items-center min-h-screen w-full">
                <div className="max-w-screen-lg mx-auto px-4 flex flex-col items-start gap-4">
                    <h3 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                        INFORMÁTICA REMOTA EM TODO O BRASIL <br /> AGENDE OU SEJA ATENDIDO(A) NA HORA
                    </h3>
                    <p className="text-white text-xl sm:text-2xl md:text-3xl font-light leading-relaxed">
                        Formatação <br />
                        Otimização de PCs e Notebooks <br />
                        Instalação de Programas e Impressora <br />
                        Remoção de Vírus e Suporte ao Windows.
                    </p>
                    <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-4 text-xl cursor-pointer mt-4 hover:tracking-wide hover:bg-white hover:text-black transition-all duration-200 ease-linear inline-block">Agendar</a>
                </div>
            </section>
        </div>

        {/* About Section */}
        <section className="about py-12 px-4" id="about">
          <h2 className="text-4xl text-[#d3ad7f] text-center uppercase mb-16">
              Sobre <span className="text-white">Nós</span>
          </h2>
          <div className="flex flex-col lg:flex-row items-center bg-gray-800 bg-opacity-30 gap-8 p-8 rounded-lg">

              <div className="flex-1 flex justify-center">
                  {/* Update image source for Next.js public folder */}
                  <img src="/about-img.jpg" alt="About Us" className="rounded-lg cursor-pointer object-cover w-full h-full" />
              </div>
              <div className="flex-1 px-4">
                  <h3 className="text-3xl text-white mb-4">O QUE FAZ NOSSO SERVIÇO DIFERENCIAL</h3>
                  <p className="text-lg text-white opacity-80 leading-relaxed mb-4">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem, eos. Mollitia, architecto. Quo
                      quam debitis eveniet facilis aperiam architecto, optio dolorum quisquam exercitationem nostrum,
                      temporibus enim nemo quidem inventore at?
                  </p>
                  <p className="text-lg text-white opacity-80 leading-relaxed mb-8">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt, provident molestias earum qui cum
                      jure commodi vitae excepturi beatae, dicta fuga! Pariatur saepe libero aperiam a amet magni
                      excepturi cupiditate.
                  </p>

                  <div className="text-center">
                      <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-4 text-xl cursor-pointer hover:tracking-wide hover:bg-white hover:text-black transition-all duration-200 ease-linear inline-block">Saiba Mais</a>
                  </div>
              </div>
          </div>
      </section>

      {/* Services Section - Note: This section lists services statically, the /services page will be dynamic */}
      <section className="services py-12 px-4" id="services">
          <h2 className="text-4xl text-[#d3ad7f] text-center uppercase mb-16">
              Serviços <span className="text-white">Prestados</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Service Box Example */}
              <div className="flex flex-col items-center text-center border border-[#d3ad7f] rounded-lg p-6 cursor-pointer hover:bg-white group transition-colors duration-200 ease-linear">
                  {/* Update image source for Next.js public folder */}
                  <img src="/formatacao.png" alt="Formatação" className="h-56 mb-4 object-cover" />
                  <h3 className="text-white text-2xl mb-2 group-hover:text-black transition-colors duration-200 ease-linear">Formatação</h3>
                  <div className="text-white text-2xl mb-8 group-hover:text-black transition-colors duration-200 ease-linear">
                      R$100,00 <span className="text-xl line-through font-light">R$120,00</span>
                  </div>
                  <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-3 text-lg cursor-pointer hover:tracking-wide hover:bg-black hover:text-white transition-all duration-200 ease-linear inline-block -mt-8">Contratar Serviço</a>
              </div>
              {/* Repeat for other service boxes - need to duplicate this structure for each service */} 
              {/* Service Box Example 2 */}
              <div className="flex flex-col items-center text-center border border-[#d3ad7f] rounded-lg p-6 cursor-pointer hover:bg-white group transition-colors duration-200 ease-linear">
                  <img src="/formatacao.png" alt="Otimização" className="h-56 mb-4 object-cover" />
                  <h3 className="text-white text-2xl mb-2 group-hover:text-black transition-colors duration-200 ease-linear">Otimização</h3>
                  <div className="text-white text-2xl mb-8 group-hover:text-black transition-colors duration-200 ease-linear">
                      R$100,00 <span className="text-xl line-through font-light">R$120,00</span>
                  </div>
                  <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-3 text-lg cursor-pointer hover:tracking-wide hover:bg-black hover:text-white transition-all duration-200 ease-linear inline-block -mt-8">Contratar Serviço</a>
              </div>
              {/* Service Box Example 3 */}
              <div className="flex flex-col items-center text-center border border-[#d3ad7f] rounded-lg p-6 cursor-pointer hover:bg-white group transition-colors duration-200 ease-linear">
                  <img src="/formatacao.png" alt="Recuperação De Dados" className="h-56 mb-4 object-cover" />
                  <h3 className="text-white text-2xl mb-2 group-hover:text-black transition-colors duration-200 ease-linear">Recuperação</h3>
                  <div className="text-white text-2xl mb-8 group-hover:text-black transition-colors duration-200 ease-linear">
                      R$100,00 <span className="text-xl line-through font-light">R$120,00</span>
                  </div>
                  <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-3 text-lg cursor-pointer hover:tracking-wide hover:bg-black hover:text-white transition-all duration-200 ease-linear inline-block -mt-8">Contratar Serviço</a>
              </div>
              {/* Service Box Example 4 */}
              <div className="flex flex-col items-center text-center border border-[#d3ad7f] rounded-lg p-6 cursor-pointer hover:bg-white group transition-colors duration-200 ease-linear">
                  <img src="/formatacao.png" alt="Instalação de Programas" className="h-56 mb-4 object-cover" />
                  <h3 className="text-white text-2xl mb-2 group-hover:text-black transition-colors duration-200 ease-linear">Instalação de Programas</h3>
                  <div className="text-white text-2xl mb-8 group-hover:text-black transition-colors duration-200 ease-linear">
                      R$100,00 <span className="text-xl line-through font-light">R$120,00</span>
                  </div>
                  <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-3 text-lg cursor-pointer hover:tracking-wide hover:bg-black hover:text-white transition-all duration-200 ease-linear inline-block -mt-8">Contratar Serviço</a>
              </div>
              {/* Service Box Example 5 */}
              <div className="flex flex-col items-center text-center border border-[#d3ad7f] rounded-lg p-6 cursor-pointer hover:bg-white group transition-colors duration-200 ease-linear">
                  <img src="/formatacao.png" alt="Instalação de Impressora" className="h-56 mb-4 object-cover" />
                  <h3 className="text-white text-2xl mb-2 group-hover:text-black transition-colors duration-200 ease-linear">Instalação de Impressora</h3>
                  <div className="text-white text-2xl mb-8 group-hover:text-black transition-colors duration-200 ease-linear">
                      R$100,00 <span className="text-xl line-through font-light">R$120,00</span>
                  </div>
                  <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-3 text-lg cursor-pointer hover:tracking-wide hover:bg-black hover:text-white transition-all duration-200 ease-linear inline-block -mt-8">Contratar Serviço</a>
              </div>
              {/* Service Box Example 6 */}
              <div className="flex flex-col items-center text-center border border-[#d3ad7f] rounded-lg p-6 cursor-pointer hover:bg-white group transition-colors duration-200 ease-linear">
                  <img src="/formatacao.png" alt="Remoção de Vírus" className="h-56 mb-4 object-cover" />
                  <h3 className="text-white text-2xl mb-2 group-hover:text-black transition-colors duration-200 ease-linear">Remoção de Vírus</h3>
                  <div className="text-white text-2xl mb-8 group-hover:text-black transition-colors duration-200 ease-linear">
                      R$100,00 <span className="text-xl line-through font-light">R$120,00</span>
                  </div>
                  <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-3 text-lg cursor-pointer hover:tracking-wide hover:bg-black hover:text-white transition-all duration-200 ease-linear inline-block -mt-8">Remover Vírus</a>
              </div>
              {/* Service Box Example 7 */}
              <div className="flex flex-col items-center text-center border border-[#d3ad7f] rounded-lg p-6 cursor-pointer hover:bg-white group transition-colors duration-200 ease-linear">
                  <img src="/formatacao.png" alt="Criação de Sites" className="h-56 mb-4 object-cover" />
                  <h3 className="text-white text-2xl mb-2 group-hover:text-black transition-colors duration-200 ease-linear">Criação de Sites</h3>
                  <div className="text-white text-2xl mb-8 group-hover:text-black transition-colors duration-200 ease-linear">
                      R$100,00 <span className="text-xl line-through font-light">R$120,00</span>
                  </div>
                  <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-3 text-lg cursor-pointer hover:tracking-wide hover:bg-black hover:text-white transition-all duration-200 ease-linear inline-block -mt-8">Contratar Serviço</a>
              </div>
              {/* Service Box Example 8 */}
              <div className="flex flex-col items-center text-center border border-[#d3ad7f] rounded-lg p-6 cursor-pointer hover:bg-white group transition-colors duration-200 ease-linear">
                  <img src="/formatacao.png" alt="Correção de Erros no Windows" className="h-56 mb-4 object-cover" />
                  <h3 className="text-white text-2xl mb-2 group-hover:text-black transition-colors duration-200 ease-linear">Correção de Erros no Windows</h3>
                  <div className="text-white text-2xl mb-8 group-hover:text-black transition-colors duration-200 ease-linear">
                      R$100,00 <span className="text-xl line-through font-light">R$120,00</span>
                  </div>
                  <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-3 text-lg cursor-pointer hover:tracking-wide hover:bg-black hover:text-white transition-all duration-200 ease-linear inline-block -mt-8">Contratar Serviço</a>
              </div>
              {/* Service Box Example 9 */}
              <div className="flex flex-col items-center text-center border border-[#d3ad7f] rounded-lg p-6 cursor-pointer hover:bg-white group transition-colors duration-200 ease-linear">
                  <img src="/formatacao.png" alt="Suporte ao Windows" className="h-56 mb-4 object-cover" />
                  <h3 className="text-white text-2xl mb-2 group-hover:text-black transition-colors duration-200 ease-linear">Suporte ao Windows</h3>
                  <div className="text-white text-2xl mb-8 group-hover:text-black transition-colors duration-200 ease-linear">
                      R$100,00 <span className="text-xl line-through font-light">R$120,00</span>
                  </div>
                  <a href="#" className="bg-[#d3ad7f] rounded text-white px-8 py-3 text-lg cursor-pointer hover:tracking-wide hover:bg-black hover:text-white transition-all duration-200 ease-linear inline-block -mt-8">Contratar Serviço</a>
              </div>
          </div>
      </section>

      {/* Doubts (FAQ) Section - Use the client component */}
      <FAQSection />

      {/* Customer Reviews Section - JS functionality needs to be added */}
      <ReviewsSlider />

      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
