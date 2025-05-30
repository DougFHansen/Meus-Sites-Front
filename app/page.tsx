"use client";
import Image from "next/image";
import FAQSection from "@/components/FAQSection";
import ReviewsSlider from "@/components/ReviewsSlider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeBlogSection from "@/components/blog/HomeBlogSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="pt-32 sm:pt-24 bg-[#171313]">
        {/* Home Section */}
        <div className="bg-[url('/home-img.jpg')] bg-[length:100%_100%] bg-center bg-no-repeat h-screen -mt-16 sm:-mt-24 flex items-center bg-blend-overlay bg-[#171313]/40">
          <section id="home" className="flex items-center min-h-screen w-full">
            <div className="max-w-[100rem] relative px-4 flex flex-col items-start gap-1 ml-16 translate-x-40 translate-y-6">
              <div className="mb-8">
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-[2.3rem] font-extrabold tracking-tight">
                  INFORMÁTICA REMOTA EM TODO O BRASIL
                </h3>
                <h3 className="text-white font-light text-[2.0rem]">
                  AGENDE OU SEJA ATENDIDO(A) NA HORA
                </h3>
              </div>
              
              <div className="flex flex-col gap-1">
                <p className="text-[1.5rem] font-light">
                  <span className="text-[#FF4B6B] font-semibold">Formatação</span>
                </p>
                <p className="text-[1.5rem] font-light">
                  <span className="text-[#8B31FF] font-semibold">Otimização</span> 
                  <span className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-transparent bg-clip-text"> de PCs e Notebooks</span>
                </p>
                <p className="text-[1.5rem] font-light">
                  <span className="text-[#31A8FF] font-semibold">Instalação</span> 
                  <span className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-transparent bg-clip-text"> de Programas e Impressora</span>
                </p>
                <p className="text-[1.5rem] font-light">
                  <span className="text-[#FF4B6B] font-semibold">Remoção de Vírus</span> 
                  <span className="bg-gradient-to-r from-[#8B31FF] to-[#31A8FF] text-transparent bg-clip-text"> e Suporte ao Windows</span>
                </p>
                <p className="text-[1.5rem] font-light">
                  <span className="text-[#FF4B6B] font-semibold">Serviços Para Gamers</span> 
                  <span className="bg-gradient-to-r from-[#8B31FF] to-[#31A8FF] text-transparent bg-clip-text"></span>
                </p>
              </div>
              
              <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-3 text-[1.4rem] cursor-pointer mt-8 hover:shadow-[0_0_20px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block hover:scale-105">
                Contratar Serviço
              </a>
            </div>
          </section>
        </div>

        {/* About Section */}
        <section className="py-12 px-4 flex flex-col items-center" id="about">
          <div className="w-full flex justify-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold relative inline-block text-center">
              <span className="text-[#FF4B6B]">Sobre</span>{" "}
              <span className="text-white">Nós</span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FF4B6B] to-[#31A8FF]"></div>
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] gap-[1.8rem] p-8 rounded-lg max-w-7xl mx-auto w-full">
            <div className="flex-1 flex justify-center perspective">
              <div className="relative w-full group transition-transform duration-700 ease-out hover:rotate-y-8 preserve-3d">
                {/* Main image container */}
                <div className="relative overflow-hidden rounded-[10px] shadow-2xl w-full h-full">
                  <img 
                    src="/about-img.jpg" 
                    alt="About Us" 
                    className="w-full h-full object-contain transition-transform duration-700 ease-out"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out"></div>
                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1500 ease-in-out"></div>
                  </div>

                  {/* 3D Depth effect */}
                  <div className="absolute inset-0 rounded-[10px] shadow-[inset_0_0_30px_rgba(0,0,0,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Interactive corners */}
                  <div className="absolute inset-0 p-4">
                    <div className="absolute top-0 left-0 w-16 h-16">
                      <div className="w-full h-full border-l-2 border-t-2 border-white/40 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-left"></div>
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16">
                      <div className="w-full h-full border-r-2 border-t-2 border-white/40 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-top-right"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-16 h-16">
                      <div className="w-full h-full border-l-2 border-b-2 border-white/40 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-left"></div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-16 h-16">
                      <div className="w-full h-full border-r-2 border-b-2 border-white/40 transform scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-right"></div>
                    </div>
                  </div>

                  {/* Hover overlay with subtle depth */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[10px]"></div>
                </div>

                {/* 3D shadow effect */}
                <div className="absolute -bottom-10 inset-x-0 h-20 bg-black/20 blur-xl rounded-full transform scale-90 translate-z-50 transition-all duration-700 group-hover:translate-z-70 opacity-50"></div>
              </div>
            </div>
            <div className="flex-1 p-8 flex flex-col items-center justify-center">
              <h3 className="text-[1.6rem] text-white mb-4 text-center">O QUE FAZ NOSSO SERVIÇO DIFERENCIAL</h3>
              <p className="text-[1.2rem] text-[#F8FAFC] py-3 leading-[1.6] text-center">
                Somos especialistas em suporte técnico remoto, oferecendo soluções rápidas e eficientes para todo o Brasil. Nossa equipe altamente qualificada está preparada para resolver problemas de formatação, otimização e manutenção do seu computador sem que você precise sair de casa.
              </p>
              <p className="text-[1.2rem] text-[#F8FAFC] py-3 leading-[1.6] text-center">
                Com atendimento personalizado e tecnologia de ponta, garantimos a segurança dos seus dados e a qualidade do serviço. Seja para formatação completa, remoção de vírus, instalação de programas ou suporte ao Windows, estamos prontos para atender suas necessidades com agilidade e profissionalismo.
              </p>
              <div className="text-center mt-6">
                <a 
                  href="/about" 
                  className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-300 ease-in-out"
                >
                  <span className="absolute inset-0 w-full h-full bg-white rounded-lg"></span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg transition-transform duration-300 group-hover:scale-105"></span>
                  <span className="relative flex items-center gap-2">
                    Saiba Mais
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 px-4 max-w-[2000px] mx-auto" id="services">
          <div className="w-full flex justify-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold relative inline-block text-center">
              <span className="text-[#FF4B6B]">Serviços</span>{" "}
              <span className="text-white">Prestados</span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FF4B6B] to-[#31A8FF]"></div>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {/* Service Box Example */}
              <div className="w-full max-w-sm text-center bg-[#171313]/80 backdrop-blur-sm border border-[#8B31FF]/30 rounded-2xl p-5 hover:bg-[#171313]/90 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B6B]/10 to-[#31A8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <i className="fas fa-laptop text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]"></i>
                </div>
                <h3 className="text-white text-lg font-medium mb-3 group-hover:text-[#FF4B6B] transition-colors duration-300">Formatação</h3>
                <div className="text-white text-lg mb-5 group-hover:text-[#FF4B6B] transition-colors duration-300">
                  R$100,00 <span className="text-sm line-through font-thin opacity-50">R$120,00</span>
                </div>
                <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-2.5 text-sm font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block relative z-10">Contratar Serviço</a>
                <div className="absolute inset-0 bg-[#171313]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    • Formatação Básica: Windows + Drivers essenciais<br/>
                    • Formatação Média: Windows + Drivers + Programas básicos<br/>
                    • Formatação Avançada: Windows + Drivers + Pacote Office + Programas<br/>
                    • Formatação Corporativa: Inclui configuração completa para empresas
                  </p>
                </div>
              </div>

              {/* Service Box Example 2 */}
              <div className="w-full max-w-sm text-center bg-[#171313]/80 backdrop-blur-sm border border-[#8B31FF]/30 rounded-2xl p-5 hover:bg-[#171313]/90 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B6B]/10 to-[#31A8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <i className="fas fa-tachometer-alt text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]"></i>
                </div>
                <h3 className="text-white text-lg font-medium mb-3 group-hover:text-[#FF4B6B] transition-colors duration-300">Otimização</h3>
                <div className="text-white text-lg mb-5 group-hover:text-[#FF4B6B] transition-colors duration-300">
                  R$100,00 <span className="text-sm line-through font-thin opacity-50">R$120,00</span>
                </div>
                <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-2.5 text-sm font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block relative z-10">Contratar Serviço</a>
                <div className="absolute inset-0 bg-[#171313]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    • Otimização Básica: Limpeza e ajustes simples<br/>
                    • Otimização Média: Limpeza + otimização de performance<br/>
                    • Otimização Avançada: Limpeza completa + performance máxima<br/>
                    • Inclui remoção de arquivos temporários e otimização do sistema
                  </p>
                </div>
              </div>

              {/* Service Box Example 3 */}
              <div className="w-full max-w-sm text-center bg-[#171313]/80 backdrop-blur-sm border border-[#8B31FF]/30 rounded-2xl p-5 hover:bg-[#171313]/90 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B6B]/10 to-[#31A8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <i className="fas fa-database text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]"></i>
                </div>
                <h3 className="text-white text-lg font-medium mb-3 group-hover:text-[#FF4B6B] transition-colors duration-300">Recuperação</h3>
                <div className="text-white text-lg mb-5 group-hover:text-[#FF4B6B] transition-colors duration-300">
                  R$100,00 <span className="text-sm line-through font-thin opacity-50">R$120,00</span>
                </div>
                <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-2.5 text-sm font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block relative z-10">Contratar Serviço</a>
                <div className="absolute inset-0 bg-[#171313]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    • Recuperação de arquivos deletados<br/>
                    • Recuperação de partições danificadas<br/>
                    • Recuperação de HDs com bad sectors<br/>
                    • Recuperação de pendrives e cartões de memória
                  </p>
                </div>
              </div>

              {/* Service Box Example 4 */}
              <div className="w-full max-w-sm text-center bg-[#171313]/80 backdrop-blur-sm border border-[#8B31FF]/30 rounded-2xl p-5 hover:bg-[#171313]/90 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B6B]/10 to-[#31A8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <i className="fas fa-download text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]"></i>
                </div>
                <h3 className="text-white text-lg font-medium mb-3 group-hover:text-[#FF4B6B] transition-colors duration-300">Instalação de Programas</h3>
                <div className="text-white text-lg mb-5 group-hover:text-[#FF4B6B] transition-colors duration-300">
                  R$100,00 <span className="text-sm line-through font-thin opacity-50">R$120,00</span>
                </div>
                <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-2.5 text-sm font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block relative z-10">Contratar Serviço</a>
                <div className="absolute inset-0 bg-[#171313]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    • Instalação de programas básicos<br/>
                    • Instalação de pacote Office completo<br/>
                    • Instalação de programas específicos<br/>
                    • Configuração e personalização de software
                  </p>
                </div>
              </div>

              {/* Service Box Example 5 */}
              <div className="w-full max-w-sm text-center bg-[#171313]/80 backdrop-blur-sm border border-[#8B31FF]/30 rounded-2xl p-5 hover:bg-[#171313]/90 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B6B]/10 to-[#31A8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <i className="fas fa-print text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]"></i>
                </div>
                <h3 className="text-white text-lg font-medium mb-3 group-hover:text-[#FF4B6B] transition-colors duration-300">Instalação de Impressora</h3>
                <div className="text-white text-lg mb-5 group-hover:text-[#FF4B6B] transition-colors duration-300">
                  R$100,00 <span className="text-sm line-through font-thin opacity-50">R$120,00</span>
                </div>
                <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-2.5 text-sm font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block relative z-10">Contratar Serviço</a>
                <div className="absolute inset-0 bg-[#171313]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    • Instalação de impressora local<br/>
                    • Configuração de impressora em rede<br/>
                    • Instalação de scanner e multifuncional<br/>
                    • Configuração de compartilhamento
                  </p>
                </div>
              </div>

              {/* Service Box Example 6 */}
              <div className="w-full max-w-sm text-center bg-[#171313]/80 backdrop-blur-sm border border-[#8B31FF]/30 rounded-2xl p-5 hover:bg-[#171313]/90 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B6B]/10 to-[#31A8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <i className="fas fa-shield-virus text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]"></i>
                </div>
                <h3 className="text-white text-lg font-medium mb-3 group-hover:text-[#FF4B6B] transition-colors duration-300">Remoção de Vírus</h3>
                <div className="text-white text-lg mb-5 group-hover:text-[#FF4B6B] transition-colors duration-300">
                  R$100,00 <span className="text-sm line-through font-thin opacity-50">R$120,00</span>
                </div>
                <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-2.5 text-sm font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block relative z-10">Contratar Serviço</a>
                <div className="absolute inset-0 bg-[#171313]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    • Remoção de vírus e malware<br/>
                    • Limpeza de arquivos infectados<br/>
                    • Instalação de antivírus<br/>
                    • Configuração de proteção em tempo real
                  </p>
                </div>
              </div>

              {/* Service Box Example 7 */}
              <div className="w-full max-w-sm text-center bg-[#171313]/80 backdrop-blur-sm border border-[#8B31FF]/30 rounded-2xl p-5 hover:bg-[#171313]/90 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B6B]/10 to-[#31A8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <i className="fas fa-globe text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]"></i>
                </div>
                <h3 className="text-white text-lg font-medium mb-3 group-hover:text-[#FF4B6B] transition-colors duration-300">Criação de Sites</h3>
                <div className="text-white text-lg mb-5 group-hover:text-[#FF4B6B] transition-colors duration-300">
                  R$100,00 <span className="text-sm line-through font-thin opacity-50">R$120,00</span>
                </div>
                <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-2.5 text-sm font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block relative z-10">Contratar Serviço</a>
                <div className="absolute inset-0 bg-[#171313]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    • Sites responsivos e modernos<br/>
                    • Landing pages profissionais<br/>
                    • E-commerce completo<br/>
                    • Otimização para SEO
                  </p>
                </div>
              </div>

              {/* Service Box Example 8 */}
              <div className="w-full max-w-sm text-center bg-[#171313]/80 backdrop-blur-sm border border-[#8B31FF]/30 rounded-2xl p-5 hover:bg-[#171313]/90 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B6B]/10 to-[#31A8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <i className="fas fa-wrench text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]"></i>
                </div>
                <h3 className="text-white text-lg font-medium mb-3 group-hover:text-[#FF4B6B] transition-colors duration-300">Correção de Erros no Windows</h3>
                <div className="text-white text-lg mb-5 group-hover:text-[#FF4B6B] transition-colors duration-300">
                  R$100,00 <span className="text-sm line-through font-thin opacity-50">R$120,00</span>
                </div>
                <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-2.5 text-sm font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block relative z-10">Contratar Serviço</a>
                <div className="absolute inset-0 bg-[#171313]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    • Correção de erros do sistema<br/>
                    • Reparo de arquivos corrompidos<br/>
                    • Solução de tela azul<br/>
                    • Correção de problemas de inicialização
                  </p>
                </div>
              </div>

              {/* Service Box Example 9 */}
              <div className="w-full max-w-sm text-center bg-[#171313]/80 backdrop-blur-sm border border-[#8B31FF]/30 rounded-2xl p-5 hover:bg-[#171313]/90 group transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,49,255,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B6B]/10 to-[#31A8FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                <div className="h-48 w-full flex items-center justify-center mb-4">
                  <i className="fab fa-windows text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]"></i>
                </div>
                <h3 className="text-white text-lg font-medium mb-3 group-hover:text-[#FF4B6B] transition-colors duration-300">Suporte ao Windows</h3>
                <div className="text-white text-lg mb-5 group-hover:text-[#FF4B6B] transition-colors duration-300">
                  R$100,00 <span className="text-sm line-through font-thin opacity-50">R$120,00</span>
                </div>
                <a href="/services" className="bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] rounded-lg text-white px-6 py-2.5 text-sm font-medium cursor-pointer hover:shadow-[0_0_15px_rgba(139,49,255,0.5)] transition-all duration-300 ease-out inline-block relative z-10">Contratar Serviço</a>
                <div className="absolute inset-0 bg-[#171313]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                  <p className="text-[#F8FAFC] text-sm leading-relaxed">
                    • Suporte remoto ao Windows<br/>
                    • Resolução de problemas gerais<br/>
                    • Configurações do sistema<br/>
                    • Atualizações e manutenção
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VOLTRIS OPTIMIZER Section */}
        <section id="optimizer" className="py-20 relative overflow-hidden bg-[#171313]">
          {/* Background Effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF4B6B] opacity-10 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B31FF] opacity-10 rounded-full filter blur-[100px]" />
          
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
                  VOLTRIS OPTIMIZER
                </span>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FF4B6B] to-[#31A8FF]"></div>
              </h2>
              <p className="text-[#e2e8f0] text-lg md:text-xl max-w-3xl mx-auto mt-8">
                Revolucione sua experiência gaming com nossa tecnologia exclusiva de otimização
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-[#1c1c1e] to-[#2a2a2e] p-6 rounded-xl border border-[#FF4B6B]/10 hover:border-[#8B31FF]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] rounded-lg p-3">
                      <i className="fas fa-rocket text-white text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Boost de Performance</h3>
                      <p className="text-[#e2e8f0]">Aumento significativo de FPS e redução de latência com otimizações exclusivas</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1c1c1e] to-[#2a2a2e] p-6 rounded-xl border border-[#FF4B6B]/10 hover:border-[#8B31FF]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] rounded-lg p-3">
                      <i className="fas fa-microchip text-white text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Otimização Inteligente</h3>
                      <p className="text-[#e2e8f0]">Sistema adaptativo que ajusta configurações em tempo real para máxima performance</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1c1c1e] to-[#2a2a2e] p-6 rounded-xl border border-[#FF4B6B]/10 hover:border-[#8B31FF]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] rounded-lg p-3">
                      <i className="fas fa-shield-alt text-white text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Estabilidade Garantida</h3>
                      <p className="text-[#e2e8f0]">Elimine travamentos, stutters e outros problemas que atrapalham sua gameplay</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-[#1c1c1e] to-[#2a2a2e] p-8 rounded-2xl border border-[#FF4B6B]/10">
                  <h3 className="text-2xl font-bold text-white mb-6">Recursos Exclusivos</h3>
                  <ul className="space-y-4">
                    {[
                      "Otimização automática de memória RAM",
                      "Priorização inteligente de processos",
                      "Redução de latência de rede",
                      "Perfis otimizados por jogo",
                      "Monitoramento em tempo real",
                      "Atualizações automáticas"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center text-[#e2e8f0]">
                        <i className="fas fa-check text-[#FF4B6B] mr-3"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">Ganho médio de FPS</span>
                      <span className="text-[#FF4B6B] font-bold">+40%</span>
                    </div>
                    <div className="w-full bg-[#2a2a2e] rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <Link
                    href="/gamers"
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,49,255,0.5)] hover:scale-[1.02]"
                  >
                    Saiba Mais
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#FF4B6B] to-[#8B31FF] rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-[#8B31FF] to-[#31A8FF] rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <HomeBlogSection />

        {/* Reviews Section */}
        <section className="py-12">
          <div className="w-full flex justify-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold relative inline-block text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
                O que nossos clientes dizem
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FF4B6B] to-[#31A8FF]"></div>
            </h2>
          </div>
          <ReviewsSlider />
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="w-full flex justify-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold relative inline-block text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4B6B] via-[#8B31FF] to-[#31A8FF]">
                Dúvidas Frequentes
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FF4B6B] to-[#31A8FF]"></div>
            </h2>
          </div>
          <FAQSection />
        </section>
      </div>
      <Footer />
    </>
  );
}
