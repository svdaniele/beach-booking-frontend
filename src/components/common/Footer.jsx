const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏖️</span>
              <span className="text-xl font-bold">Beach Booking</span>
            </div>
            <p className="text-gray-400 text-sm">
              Il sistema più semplice per gestire le prenotazioni del tuo stabilimento balneare
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4">Servizi</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/prenota" className="hover:text-white">Prenota Ombrellone</a></li>
              <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
              <li><a href="/register" className="hover:text-white">Registra Stabilimento</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Azienda</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/about" className="hover:text-white">Chi Siamo</a></li>
              <li><a href="/contact" className="hover:text-white">Contatti</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white">Termini</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Seguici</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                📷
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                🐦
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Beach Booking. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;