import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Chi Siamo</h1>
          <p className="text-xl opacity-90">
            La soluzione completa per la gestione del tuo stabilimento balneare
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">La Nostra Missione</h2>
            <p className="text-gray-600 mb-6">
              Beach Booking nasce dall'esigenza di semplificare la gestione delle prenotazioni 
              per stabilimenti balneari e offrire ai clienti un'esperienza di prenotazione 
              fluida e intuitiva.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Cosa Offriamo</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-4xl mb-4">🏖️</div>
                <h3 className="text-xl font-bold mb-3">Per gli Stabilimenti</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Gestione completa ombrelloni</li>
                  <li>✓ Sistema prenotazioni avanzato</li>
                  <li>✓ Pagamenti integrati</li>
                  <li>✓ Dashboard analytics</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold mb-3">Per i Clienti</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Prenotazione online facile</li>
                  <li>✓ Scelta ombrellone su mappa</li>
                  <li>✓ Pagamento sicuro</li>
                  <li>✓ Conferma immediata</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">I Nostri Valori</h2>
            <div className="space-y-4 mb-12">
              <div className="flex gap-4">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-bold mb-1">Innovazione</h4>
                  <p className="text-gray-600">
                    Utilizziamo le tecnologie più moderne per offrire la migliore esperienza
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">🤝</span>
                <div>
                  <h4 className="font-bold mb-1">Affidabilità</h4>
                  <p className="text-gray-600">
                    Un sistema sicuro e sempre disponibile per te e i tuoi clienti
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-bold mb-1">Semplicità</h4>
                  <p className="text-gray-600">
                    Interfacce intuitive che rendono la gestione facile e veloce
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Inizia Oggi</h2>
          <p className="text-xl mb-8 opacity-90">
            Unisciti a centinaia di stabilimenti che hanno scelto Beach Booking
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 font-bold text-lg"
          >
            Registrati Gratuitamente
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;