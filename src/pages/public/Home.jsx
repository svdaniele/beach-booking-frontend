import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Prenota il Tuo Ombrellone Online
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Sistema semplice e veloce per gestire le prenotazioni del tuo stabilimento balneare
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/prenota"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-bold text-lg"
            >
              Prenota Ora
            </a>
            <a
              href="/register"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 font-bold text-lg"
            >
              Registra Stabilimento
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Perché Beach Booking?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🏖️</div>
              <h3 className="text-xl font-bold mb-3">Prenotazioni Facili</h3>
              <p className="text-gray-600">
                Sistema intuitivo per clienti e gestori. Prenota in pochi click.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-3">Dashboard Completa</h3>
              <p className="text-gray-600">
                Gestisci ombrelloni, prenotazioni e pagamenti da un'unica interfaccia.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-3">Pagamenti Integrati</h3>
              <p className="text-gray-600">
                Accetta pagamenti online in modo sicuro e veloce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Come Funziona</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Scegli le Date</h3>
              <p className="text-gray-600">
                Seleziona il periodo della tua vacanza e visualizza gli ombrelloni disponibili.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Seleziona l'Ombrellone</h3>
              <p className="text-gray-600">
                Scegli la posizione e il tipo di ombrellone che preferisci sulla mappa interattiva.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Conferma e Paga</h3>
              <p className="text-gray-600">
                Completa la prenotazione e ricevi la conferma via email immediatamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto per Iniziare?</h2>
          <p className="text-xl mb-8 opacity-90">
            Unisciti a centinaia di stabilimenti che hanno scelto Beach Booking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 font-bold text-lg"
            >
              Registra il Tuo Stabilimento
            </a>
            <a
              href="/prenota"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 font-bold text-lg"
            >
              Prenota come Cliente
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;