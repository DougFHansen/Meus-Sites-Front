'use client';

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1e] text-[#adb5bd] py-16">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-wrap justify-between gap-8">
        <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
          <h3 className="text-white text-2xl font-bold mb-4">[Nome da Sua Empresa de TI]</h3>
          <p>Soluções inovadoras em tecnologia para impulsionar o seu futuro digital. Transformamos desafios complexos
            em resultados eficientes e escaláveis.</p>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
          <h4 className="text-white text-xl font-semibold mb-4 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-blue-600 after:mt-2">Navegação</h4>
          <ul>
            <li><a href="/sobre-nos" className="text-[#adb5bd] hover:text-blue-600 transition-colors duration-300 ease-in-out inline-block mb-2 hover:pl-1">Sobre Nós</a></li>
            <li><a href="/servicos" className="text-[#adb5bd] hover:text-blue-600 transition-colors duration-300 ease-in-out inline-block mb-2 hover:pl-1">Nossos Serviços</a></li>
            <li><a href="/solucoes" className="text-[#adb5bd] hover:text-blue-600 transition-colors duration-300 ease-in-out inline-block mb-2 hover:pl-1">Soluções</a></li>
            <li><a href="/blog" className="text-[#adb5bd] hover:text-blue-600 transition-colors duration-300 ease-in-out inline-block mb-2 hover:pl-1">Insights & Blog</a></li>
            <li><a href="/contato" className="text-[#adb5bd] hover:text-blue-600 transition-colors duration-300 ease-in-out inline-block mb-2 hover:pl-1">Fale Conosco</a></li>
          </ul>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
          <h4 className="text-white text-xl font-semibold mb-4 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-blue-600 after:mt-2">Contato Direto</h4>
          <address className="not-italic">
            <p className="mb-3 flex items-start"><i className="fas fa-map-marker-alt text-blue-600 mr-3 mt-1 w-5 text-center"></i> Hub de Inovação, Av. Digital, 789<br />Tecnopolis, Brasil</p>
            <p className="mb-3 flex items-center"><i className="fas fa-phone text-blue-600 mr-3 w-5 text-center"></i> <a href="tel:+5511912345678" className="text-[#adb5bd] hover:text-blue-600">(11) 91234-5678</a></p>
            <p className="mb-3 flex items-center"><i className="fas fa-envelope text-blue-600 mr-3 w-5 text-center"></i> <a href="mailto:contato@suaempresa.com" className="text-[#adb5bd] hover:text-blue-600">contato@suaempresa.com</a>
            </p>
            <p className="flex items-center"><i className="fas fa-headset text-blue-600 mr-3 w-5 text-center"></i> <a href="/suporte" className="text-[#adb5bd] hover:text-blue-600">Suporte Técnico</a></p>
          </address>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 mb-8">
          <h4 className="text-white text-xl font-semibold mb-4 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-blue-600 after:mt-2">Conecte-se</h4>
          <div className="flex gap-4 mb-6">
            {/* Font Awesome icons - consider using react-icons */}
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" className="text-[#adb5bd] text-2xl hover:text-blue-600 transition-colors duration-300 ease-in-out hover:scale-110"><i
              className="fab fa-linkedin-in"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub" className="text-[#adb5bd] text-2xl hover:text-blue-600 transition-colors duration-300 ease-in-out hover:scale-110"><i
              className="fab fa-github"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" title="Twitter" className="text-[#adb5bd] text-2xl hover:text-blue-600 transition-colors duration-300 ease-in-out hover:scale-110"><i
              className="fab fa-twitter"></i></a>
          </div>
          <div className="mt-4">
            <h4 className="text-white text-xl font-semibold mb-4 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-blue-600 after:mt-2">Mantenha-se Atualizado</h4>
            <form className="flex">
              <input type="email" name="email" placeholder="Digite seu e-mail" required className="w-full py-3 px-4 border border-gray-600 bg-[#2a2a2e] text-white rounded-l-md focus:outline-none focus:border-blue-600" />
              <button type="submit" aria-label="Inscrever na Newsletter" className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700 transition-colors duration-300 ease-in-out">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-gray-700 mt-8 pt-8 px-4">
        {/* Year will need dynamic update or a client component */} 
        <p className="mb-4 text-sm">&copy; <span id="current-year-modern">2023</span> [Nome da Sua Empresa de TI]. Todos os direitos reservados.</p>
        <ul className="flex justify-center gap-4 text-sm">
          <li><a href="/politica-de-privacidade" className="text-[#adb5bd] hover:text-blue-600 transition-colors duration-300 ease-in-out">Privacy Policy</a></li>
          <li><a href="/termos-de-uso" className="text-[#adb5bd] hover:text-blue-600 transition-colors duration-300 ease-in-out">Terms of Service</a></li>
          <li><a href="/cookies" className="text-[#adb5bd] hover:text-blue-600 transition-colors duration-300 ease-in-out">Cookies Settings</a></li>
        </ul>
      </div>
    </footer>
  );
} 